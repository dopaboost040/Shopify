# Project Notes

Working notes for this repo/session so links and IDs don't need to be re-discovered each time.

## Pages & Links

### Labor Day Sale
- **Preview link (working-copy theme, not yet live):**
  https://www.dopaboostsupplements.com/collections/labor-day-2026?preview_theme_id=193550057847
- **Theme editor link:**
  https://admin.shopify.com/store/kg0gfc-ex/themes/193550057847/editor?previewPath=%2Fcollections%2Flabor-day-2026
- **Live/production link (use this for Meta ads — only works correctly once the theme below is published):**
  https://www.dopaboostsupplements.com/collections/labor-day-2026
- **Theme:** "Labor Day Sale — working copy" — `gid://shopify/OnlineStoreTheme/193550057847` (UNPUBLISHED duplicate of the live theme)
- **Collection:** "Labor Day Sale" — handle `labor-day-2026` — `gid://shopify/Collection/698458177911` (27 products, manual sort order)
- **Sections:** `sections/dopaboost-labor-day-hero.liquid` (banner), `sections/dopaboost-labor-day-grid.liquid` (product grid + promo tile)
- **Template:** `templates/collection.labor-day.json`
- **Discount:** "Labor Day Sale: Buy 3, Cheapest Free" — automatic BXGY discount (`gid://shopify/DiscountAutomaticNode/2382809563511`), scoped to the labor-day-2026 collection, repeats per set of 3, does not combine with other discounts, no end date set yet.

## Dopamine Patches — upsell carousel copy (DRAFT, not published)

Context: Dopamine Patches' actual on-page positioning (pulled from the live template, not assumed) is the anchor for all upsell copy below:
- Headline: "Steady focus, No crash." / short desc: supports **mood, motivation, emotional wellbeing**
- Problem Section ("The Hidden Cost Of Low Dopamine"): **Constant Fatigue, Brain Fog, Low Drive**
- Features heading: "This patch restores your balance"

So the core buying reason is fatigue / brain fog / low motivation — not sleep-onset or digestion. Copy below is written to connect to that reason without contradicting Dopamine's own claim that fatigue persists "even after a full night's sleep."

Recommended carousel pick (2 slots): **MB Patches** + **Dream Patches** (day/night pairing; Dream copy reframed as post-focus wind-down, not "you just needed sleep").

One-line sub-copy per product (goes under the product title on the carousel card):

| Product | Sub-copy | Alignment w/ Dopamine's buying reason |
|---|---|---|
| MB Patches | "Fuel the energy focus runs on." | Strongest — directly hits fatigue/low drive from a metabolism angle. |
| Dream Patches | "Support your wind-down, after the focus holds." | Good, but reframed on purpose — avoid implying sleep is "the real fix" since Dopamine's own copy says fatigue persists despite full sleep. |
| Recover Patches | "A boost for the mornings that hit harder." | Moderate — same "rough morning/fatigue" territory, narrower audience (night-out context). |
| Moringa Patches | "Because focus needs a body that keeps up." | Moderate — general metabolism/rhythm support, indirect link. |
| Unpuff Patches | "For the days your body needs a reset too." | Weak — bloating/digestion is a different pain point than fatigue/mood. |
| Mood+ Patches | "Extra support, for an extra off day." | Weakest as upsell — overlaps too much with Dopamine's own mood/dopamine claim, risk of cannibalization/confusion. |

Status: concept copy only — nothing pushed to any theme file. Revisit once the upsell carousel section/app is actually built.

## Standing constraints
- Never publish/activate the working-copy theme live without being explicitly asked.
- Never fabricate stats/badges/reviews — all review counts/ratings must be real, merchant-entered data.
- Never alter the Dopamine Patches cart/free-gift mechanic.
- Do not push/publish drafted copy (ad copy, bundle bullet points, etc.) to live product data or theme files unless explicitly asked — "write/draft copy for me" does not imply "publish it."
