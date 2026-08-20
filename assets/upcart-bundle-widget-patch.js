// UpCart renders cart line items with its own JS/template, bypassing this
// theme's snippets/line-item.liquid entirely (confirmed via DevTools: the
// item rows live under upcart-internal-/upcart-public- classed elements
// that the theme never outputs). That means the "Packs: N Pack" and
// "N Packs - Subscribe & Save" lines for this one test product can't be
// touched via Liquid -- this observer rewrites/hides them directly in the
// DOM once UpCart renders them.
//
// Scoping: rather than guess at UpCart's exact tile-wrapper class (which
// turned out not to exist -- an earlier version of this script keyed off
// one and silently matched nothing), each target element is scoped by
// walking up its own ancestors until one is found whose text contains
// this product's title. Since a cart item's title is always rendered
// directly above these lines within that same item's own DOM subtree,
// this reliably lands on just that one line item and never a sibling
// item or the whole cart list -- with no dependency on UpCart's markup.
(function () {
  var PRODUCT_TITLE = 'Dopamine Patches - Bundle Widget Test';
  var PROPS_SELECTOR = '.upcart-internal-cart-items__key-value-pair';
  var PLAN_SELECTOR = '.upcart-public-product-properties__subscription';

  function isScopedToProduct(el) {
    var node = el;
    while (node && node !== document.body) {
      if (node.textContent && node.textContent.indexOf(PRODUCT_TITLE) !== -1) return true;
      node = node.parentElement;
    }
    return false;
  }

  function applyFix() {
    document.querySelectorAll(PROPS_SELECTOR).forEach(function (el) {
      if (el.dataset.dopaPatched === '1') return;
      if (!/^\s*Packs:/i.test(el.textContent)) return;
      if (!isScopedToProduct(el)) return;

      el.style.display = 'none';
      el.dataset.dopaPatched = '1';
    });

    document.querySelectorAll(PLAN_SELECTOR).forEach(function (el) {
      if (el.dataset.dopaPatched === '1') return;

      var packMatch = el.textContent.match(/(\d+)\s*Packs?/i);
      if (!packMatch) return;
      if (!isScopedToProduct(el)) return;

      el.textContent = packMatch[1] + ' Pack • Flexible Plan';
      el.dataset.dopaPatched = '1';
    });
  }

  var observer = new MutationObserver(applyFix);
  observer.observe(document.body, { childList: true, subtree: true });
  applyFix();
})();
