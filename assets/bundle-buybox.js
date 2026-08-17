(function () {
  function initBuybox(root) {
    if (root.dataset.sbxInit === '1') return;
    root.dataset.sbxInit = '1';

    var state = { mode: root.dataset.sbxMode || 'sub' };
    var idInput = root.querySelector('[data-sbx-id-input]');
    var planInput = root.querySelector('[data-sbx-plan-input]');

    function selectedTile() {
      return root.querySelector('[data-sbx-tile].sbx__tile--selected');
    }

    function formatMoney(amount) {
      return Shopify.formatMoney(Math.round(amount * 100), window.theme && window.theme.moneyFormat);
    }

    function updateStickyBar(tile, price) {
      var stickyRoot = document.querySelector('[data-dopa-sticky-atc]');
      if (!stickyRoot || !tile || !window.Shopify || !Shopify.formatMoney) return;

      var packs = parseInt(tile.getAttribute('data-packs'), 10) || 1;
      var compare = parseFloat(tile.getAttribute('data-compare')) || 0;
      var priceNum = parseFloat(price);
      if (isNaN(priceNum)) return;

      var titleEl = stickyRoot.querySelector('[data-dopa-sticky-title]');
      var priceEl = stickyRoot.querySelector('[data-dopa-sticky-price]');
      var permoEl = stickyRoot.querySelector('[data-dopa-sticky-permo]');
      var saveEl = stickyRoot.querySelector('[data-dopa-sticky-save]');

      if (titleEl) {
        var supplyLabel = packs === 1 ? '1 Month Supply' : packs + ' Months Supply';
        titleEl.textContent = packs + '-Pack — ' + supplyLabel;
      }

      if (priceEl) priceEl.textContent = formatMoney(priceNum);

      if (permoEl) {
        if (packs > 1) {
          permoEl.textContent = ' · ' + formatMoney(priceNum / packs) + '/mo';
          permoEl.hidden = false;
        } else {
          permoEl.hidden = true;
        }
      }

      if (saveEl) {
        if (compare > priceNum) {
          var pct = Math.round((compare - priceNum) / compare * 100);
          saveEl.textContent = 'SAVE ' + pct + '%';
          saveEl.hidden = false;
        } else {
          saveEl.hidden = true;
        }
      }
    }

    function render() {
      root.dataset.sbxMode = state.mode;
      root.querySelectorAll('[data-sbx-mode]').forEach(function (btn) {
        if (btn.tagName !== 'BUTTON') return;
        var active = btn.getAttribute('data-sbx-mode') === state.mode;
        btn.setAttribute('aria-checked', active ? 'true' : 'false');
      });

      root.querySelectorAll('[data-sbx-tile]').forEach(function (tile) {
        var price = state.mode === 'sub'
          ? tile.getAttribute('data-price-sub')
          : tile.getAttribute('data-price-onetime');
        var priceEl = tile.querySelector('[data-sbx-price]');
        if (priceEl && window.Shopify && Shopify.formatMoney && !isNaN(parseFloat(price))) {
          priceEl.textContent = Shopify.formatMoney(Math.round(parseFloat(price) * 100), window.theme && window.theme.moneyFormat);
        }
      });

      var tile = selectedTile();
      if (tile) {
        idInput.value = tile.getAttribute('data-variant-id');
        if (state.mode === 'sub' && tile.getAttribute('data-plan-id')) {
          planInput.value = tile.getAttribute('data-plan-id');
          planInput.disabled = false;
        } else {
          planInput.value = '';
          planInput.disabled = true;
        }

        var stickyPrice = state.mode === 'sub'
          ? tile.getAttribute('data-price-sub')
          : tile.getAttribute('data-price-onetime');
        updateStickyBar(tile, stickyPrice);
      }
    }

    root.addEventListener('click', function (e) {
      var modeBtn = e.target.closest('[data-sbx-mode]');
      if (modeBtn && modeBtn.tagName === 'BUTTON') {
        state.mode = modeBtn.getAttribute('data-sbx-mode');
        render();
        return;
      }
      var tile = e.target.closest('[data-sbx-tile]');
      if (tile) {
        root.querySelectorAll('[data-sbx-tile]').forEach(function (t) {
          t.classList.remove('sbx__tile--selected');
          t.setAttribute('aria-checked', 'false');
          t.setAttribute('tabindex', '-1');
        });
        tile.classList.add('sbx__tile--selected');
        tile.setAttribute('aria-checked', 'true');
        tile.setAttribute('tabindex', '0');
        render();
      }
    });

    root.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      var target = e.target.closest('[data-sbx-tile], [data-sbx-mode]');
      if (!target) return;
      e.preventDefault();
      target.click();
    });

    render();

    var scope = root.closest('product-rerender') || document;
    var mo = new MutationObserver(function () {
      if (!document.body.contains(root)) return;
      if (root.dataset.sbxMode !== state.mode) render();
    });
    mo.observe(scope, { childList: true, subtree: true });

    // The theme's <product-rerender> wrapping the sticky bar has no
    // allow-partial-rerender attribute, so any "product:rerender" event
    // (dispatched by the native variant-picker, if one is ever enabled
    // again) fully replaces it with a fresh server-rendered fragment
    // that only knows about product.selected_or_first_available_variant
    // -- wiping out whatever pack the customer picked in the buy-box.
    // Our own root survives untouched (its block type isn't one of the
    // ones that mechanism swaps), so just re-push its current selection
    // into the sticky bar right after the replacement finishes.
    var formEl = document.getElementById(idInput.getAttribute('form'));
    if (formEl) {
      formEl.addEventListener('product:rerender', function () {
        setTimeout(function () {
          var tile = selectedTile();
          if (!tile) return;
          var price = state.mode === 'sub'
            ? tile.getAttribute('data-price-sub')
            : tile.getAttribute('data-price-onetime');
          updateStickyBar(tile, price);
        }, 0);
      });
    }
  }

  function initAll() {
    document.querySelectorAll('[data-sbx]').forEach(initBuybox);
  }

  document.addEventListener('DOMContentLoaded', initAll);
  if (document.readyState !== 'loading') initAll();
  document.addEventListener('shopify:section:load', initAll);

  function findBuyboxForForm(form) {
    var scope = form.closest('product-rerender');
    if (scope) {
      var inScope = scope.querySelector('[data-sbx]');
      if (inScope) return inScope;
    }
    var candidates = document.querySelectorAll('[data-sbx]');
    for (var i = 0; i < candidates.length; i++) {
      var idInput = candidates[i].querySelector('[data-sbx-id-input]');
      if (idInput && idInput.getAttribute('form') === form.id) return candidates[i];
    }
    return candidates[0] || null;
  }

  // Free gifts are handled by the Bogos app (triggers off the cart
  // contents once the main item is added), not by this component —
  // so submission is a single normal add-to-cart. This guard only
  // makes sure a stray selling_plan from a previous tile/mode isn't
  // left enabled when the customer is in one-time mode.
  document.addEventListener('submit', function (e) {
    var form = e.target;
    if (!form.matches || !form.matches('form[action*="/cart/add"]')) return;

    var root = findBuyboxForForm(form);
    if (!root) return;

    // form.elements includes every control associated with this form,
    // whether it's a real descendant (e.g. buy-buttons.liquid's own
    // hidden "id" input, which stays enabled whenever no variant-picker
    // block happens to be present) or linked in via a form="..."
    // attribute like ours. Disable every other "id" field so a stray
    // one can never win the submission over the buy-box's own choice.
    var ourIdInput = root.querySelector('[data-sbx-id-input]');
    Array.prototype.forEach.call(form.elements, function (el) {
      if (el.name === 'id' && el !== ourIdInput) {
        el.disabled = true;
      }
    });

    var planInputs = form.querySelectorAll('input[name="selling_plan"]');
    planInputs.forEach(function (input) {
      if (root.dataset.sbxMode !== 'sub') input.disabled = true;
    });
  }, true);
})();
