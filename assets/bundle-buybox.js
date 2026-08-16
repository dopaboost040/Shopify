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

    var planInputs = form.querySelectorAll('input[name="selling_plan"]');
    planInputs.forEach(function (input) {
      if (root.dataset.sbxMode !== 'sub') input.disabled = true;
    });
  }, true);
})();
