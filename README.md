# DopaBoost Shopify Theme

Deze repository bevat de code van het live thema **Impact** (DOPABOOST — www.dopaboostsupplements.com).

## Branches

- `main` — spiegelt het huidige live/published thema. Verbind deze branch via Shopify Admin → Online Store → Themes → Add theme → Connect from GitHub om two-way sync met het live thema in te schakelen.
- `staging` — kopie van `main`, bedoeld om veilig nieuwe features/wijzigingen te testen voordat ze naar main/live gaan.

## Shopify thema's

Naast deze repo staan er in Shopify zelf ook twee losse duplicate-thema's klaar om direct in te werken zonder dat de live theme geraakt wordt:

- **Main** — referentie/backup kopie van het live thema
- **Staging** — werkkopie om wijzigingen te testen

## Live koppelen met GitHub

De laatste stap moet handmatig in de Shopify Admin gebeuren (vereist OAuth-autorisatie van het account):

1. Ga naar **Online Store → Themes**.
2. Klik **Add theme → Connect from GitHub** (installeer de Shopify GitHub App indien nog niet gedaan).
3. Kies de organisatie/account `dopaboost040`, repository `Shopify`.
4. Kies branch `main` om te koppelen aan het live thema, en/of branch `staging` voor een test-thema.
5. Publiceer het nieuw gekoppelde thema wanneer je klaar bent om het live te zetten.
