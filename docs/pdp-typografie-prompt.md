# Prompt: PDP-typografie overnemen van de Dopamine Patches-pagina

Kopieer alles onder de streep en plak het in Claude Code bij je andere webshop.

---

Ik wil dat de productpagina (PDP) van mijn webshop **exact dezelfde lettertypes, lettergroottes, gewichten en regelafstanden** krijgt als de PDP van mijn andere merk (DopaBoost – Dopamine Patches). Kleuren en teksten mogen bij het nieuwe merk passen; het gaat om de **typografie en de verhoudingen**. Hieronder staat alles wat je nodig hebt.

## Werkwijze

1. Bekijk eerst hoe deze theme in elkaar zit: welk Shopify-theme het is, welke product-template de PDP gebruikt (`templates/product*.json`, check de `templateSuffix` van het product), en waar typografie wordt geregeld (`config/settings_data.json`, `snippets/css-variables.liquid` of vergelijkbaar, `assets/*.css`).
2. Zet eerst de **globale thema-instellingen** goed (sectie A). Als de theme ook **Impact** is, kun je dezelfde instellingen 1-op-1 overnemen. Bij een ander theme: zorg dat de berekende pixelwaarden overeenkomen.
3. Pas daarna de **buy-box rechts naast de foto's** aan (sectie B). Dit is het belangrijkste deel.
4. Pas daarna de **secties onder de buy-box** aan (sectie C), voor zover de theme vergelijkbare secties heeft. Voeg geen nieuwe secties toe zonder het eerst te vragen.
5. Zet custom CSS liefst in een eigen CSS-bestand in `assets/` of in de theme-CSS, niet in grote inline `<style>`-blokken in Custom Liquid (die rendeerden bij ons soms leeg op de live winkel).
6. Laat me aan het eind een overzicht zien van wat je hebt veranderd, en wat je niet kon overnemen.

Breakpoints die hieronder gebruikt worden: **mobiel < 700px**, **tablet/desktop ≥ 700px**, **groot desktop ≥ 1400px** (sommige custom onderdelen gebruiken 750px of 480px; dat staat er dan bij).

## A. Globale typografie (theme-instellingen)

| Instelling | Waarde |
|---|---|
| Kopfont (headings) | **Gilda Display**, gewicht 400 (Shopify font-id `gilda_display_n4`) |
| Tekstfont (body) | **Inter**, gewicht 400 (`inter_n4`); Inter 700 voor vet |
| Heading letter-spacing (theme-instelling) | **-0.5** |
| Heading-grootte (theme-instelling) | **large** |
| Bodytekst mobiel | **14px** |
| Bodytekst desktop | **15px** |
| Tekstkleur | `#1a1a1a` |
| Knop-hoekradius | 16px |

Berekende groottes die daaruit volgen (Impact-theme):

| Variabele | Mobiel (<700) | ≥700px | ≥1400px |
|---|---|---|---|
| H1 | 40px | 48px | 60px |
| H2 | 32px | 40px | 48px |
| H3 | 24px | 32px | 36px |
| H4 | 22px | 26px | 32px |
| H5 | 18px | 20px | 24px |
| H6 | 16px | 18px | 20px |
| text-xs | 11px | 11px | |
| text-sm | 12px | 13px | |
| text-base | 14px | 15px | |
| text-lg | 18px | 19px | |

## B. Buy-box (productinfo naast de foto's), van boven naar beneden

Productgalerij links ~55% breed (grid-layout), info rechts.

1. **Trust-balk bovenaan** (3 kolommen met icoon, dunne scheidingslijn `1px #e6ddc9` ertussen)
   - Font Inter, **11px**, line-height 1.35, vet gedeelte 700
   - Iconen 22×22px, gap 6px, padding 0 8px, margin-bottom 12px

2. **Hoofdkop / outcome-headline** (vervangt visueel de producttitel; de echte `<h1>/<h2>` titel blijft in de DOM maar visually-hidden voor SEO)
   - Gilda Display, gewicht 400, **32px op alle schermen**, line-height **1.12**, letter-spacing **-0.5px**, kleur `#1a1a1a`, margin 0
   - Voorbeeld bij ons: "Steady focus, No crash."

3. **Productnaam-label** direct onder de kop
   - Inter **10px**, gewicht **700**, letter-spacing **0.08em**, **UPPERCASE**
   - Achtergrond geel `#fcd900` (mag merkkleur worden), padding 3px 8px, border-radius 6px, margin 8px boven en onder

4. **Korte omschrijving** (rich text, bv. "Aims to support … **30 patches** in each pack")
   - Body-font Inter, theme-basisgrootte: **14px mobiel / 15px desktop**

5. **Prijs** (theme price-block, maat "lg")
   - Verkoopprijs: **text-lg = 18px mobiel / 19px desktop**, line-height 1.6
   - Van-prijs: basisgrootte, doorgestreept, gedempte kleur

6. **Bundel-keuze (pack-tiles)** — basis font-size 13px, font-family inherit
   | Element | Desktop | Mobiel (<750px) | Gewicht / extra |
   |---|---|---|---|
   | Toggle "One-Time / Flexible Plan" titel | 13px | 12px | 700, kopfont (Gilda), lh 1.2 |
   | Toggle subtekst ("Extra 20% OFF…") | 10px | 9.5px | kleur `#948979` |
   | Trust-pills (wit op terracotta) | 10.5px | 10px | 600 |
   | Tile-titel ("3 Packs") | 14px | 13px | 600, kopfont (Gilda) |
   | Badge ("BUY 2 GET 1 FREE") | 9px | 9px | 700, pill |
   | Chip "€x per pack" | 10px | 9.5px | 600 |
   | "x month(s) supply" | 10px | 9.5px | kleur `#948979` |
   | Prijs in tile | 14px | 13px | 700 |
   | Van-prijs in tile | 10px | 9.5px | doorgestreept |
   | Ribbon "Free Gift 🎁" | 12px | 12px | 700 |
   | Gift-regel label | 11px | 10px | 600 |
   | Gift-waarde | 10px | 9px | 600, doorgestreept |
   | Gift-voordeel | 9.5px | 9px | lh 1.3 |

7. **Review-pill boven de Add-to-Cart** (avatars + sterren + tekst)
   - Font Gilda Display *italic*, tekst **12px**, gewicht 600, zwart
   - Avatars 18px rond, sterren 12px, pill wit met zachte schaduw, padding 6px 14px

8. **Add-to-Cart knop**
   - Theme-knop maat "xl": font-size = **text-base (14px mobiel / 15px desktop)**
   - Achtergrond `#c1633f`, tekst wit, border-radius 16px
   - Achter de knoptekst staat het geselecteerde totaalbedrag (" • €xx")

9. **Verzendregel** ("Ships within 24h · Arrives in 2–4 days") en **trust-badges** ("Free Shipping", "Money Back Guarantee")
   - Inter **12px**, gewicht 500, kleur `#333`; **11px** onder 480px
   - Iconen 18px, achtergrond `#F7EDDC`, radius 4px, padding 8px 10px (6px 8px onder 480px)

10. **Beschrijving + accordions** ("Description", "Ingredients", "How to use")
    - Theme-standaard: body 14/15px, titels in theme-accordionstijl

11. **Sticky Add-to-Cart balk** (onderin bij scrollen)
    - Titel **14px** / 700 wit, prijsregel **12.5px**, knop **13px**, bespaar-badge **10px** / 700
    - Donkere achtergrond `#241209`, radius 14px, op mobiel 12px van de randen

## C. Secties onder de buy-box (font-groottes per sectie)

Achtergrond van alle secties: crème `#fef9f1` (mag merkkleur worden).

| Sectie | Element | Desktop | Tablet | Mobiel | Gewicht / font |
|---|---|---|---|---|---|
| Trust-iconen onder de buy-box | tekst | 12px | | 10px | Inter 400, iconen 40px |
| Reviews-kaarten ("Real People, Real Results") | titel | 48px | | 32px | 400, kopfont |
| | kaarttekst (naam) | 24px | | 20px | |
| "As seen in" logobalk | titel | 18px | | | sans-serif 400, logo's 50px hoog |
| Probleem-sectie | label | 12px | | 11px | 500, letter-spacing 1.5 |
| | kop | 48px | 40px | 32px | Gilda 500 (vet deel 700) |
| | intro | 17px | | 16px | Inter |
| | grote nummers (01/02/03) | 80px | | 64px | 800 |
| | item-titel | 24px | | 22px | 600 |
| | item-tekst | 16px | | 15px | |
| Features / hotspots | kop | 46px | | 28px | serif 400 |
| | subkop | 15px | | 13px | |
| | feature-titel | 20px | | 18px | 600 |
| | feature-tekst | 14px | | 13px | |
| | hotspot-nummer | 14px | | 12px | 600 |
| Ingrediënten (science) | kop | 46px | 38px | 28px | 600 (highlight 300) |
| | categorie-label | 9px | | | |
| | ingrediëntnaam | 24px | | 24px | 600 |
| | ingrediënttekst | 15px | | 15px | |
| | synergie-titel | 32px | 28px | 24px | 600 |
| | synergie-tekst | 17px | | 15px | |
| | mobiele tabs | 14px | | | |
| Resultaten (percentages) | label | 11px | | 10px | 400, letter-spacing 2 |
| | kop | 48px | 38px | 28px | 400 (highlight 600) |
| | percentage | 40px | | 36px | 500, %-teken 20px |
| | omschrijving | 15px | | 14px | max-breedte 240px |
| | voetnoot | 11px | | 10px | letter-spacing 1.5 |
| FAQ | titel | 48px | | 32px | kopfont |
| | vraag | 18px | | 16px | |

## Belangrijk

- Neem de **groottes, gewichten, line-heights en letter-spacing** exact over; kleuren mogen het nieuwe merk volgen.
- Laad Gilda Display en Inter via de theme-fontinstellingen (Shopify font library). Alleen als dat niet kan: Google Fonts.
- Controleer het resultaat op mobiel (±390px breed) én desktop, en vertel me waar iets afwijkt van deze specificatie.
