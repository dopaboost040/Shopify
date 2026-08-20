// UpCart renders cart line items with its own JS/template, bypassing this
// theme's snippets/line-item.liquid entirely (confirmed via DevTools: the
// item rows live under upcart-internal-/upcart-public- classed elements
// that the theme never outputs). That means the "Packs: 3 Pack" and
// "3 Packs - Subscribe & Save" lines for this one test product can't be
// removed via Liquid -- this observer hides them directly in the DOM once
// UpCart renders them, scoped to this product's own cart tile only so
// every other product's UpCart line items are left untouched.
(function () {
  var PRODUCT_TITLE = 'Dopamine Patches - Bundle Widget Test';
  var TARGET_SELECTOR = '.upcart-public-product-properties__subscription, .upcart-internal-cart-items__key-value-pair';
  var TILE_ROOT_RE = /(?:^|\s)upcart-(?:public|internal)-component-product-tile(?:\s|$)/;

  function findTileRoot(el) {
    var node = el;
    while (node && node !== document.body) {
      if (typeof node.className === 'string' && TILE_ROOT_RE.test(node.className)) {
        return node;
      }
      node = node.parentElement;
    }
    return null;
  }

  function applyFix() {
    document.querySelectorAll(TARGET_SELECTOR).forEach(function (el) {
      if (el.dataset.dopaGiftHidden === '1') return;

      var tile = findTileRoot(el);
      if (!tile || tile.textContent.indexOf(PRODUCT_TITLE) === -1) return;

      el.style.display = 'none';
      el.dataset.dopaGiftHidden = '1';
    });
  }

  var observer = new MutationObserver(applyFix);
  observer.observe(document.body, { childList: true, subtree: true });
  applyFix();
})();
