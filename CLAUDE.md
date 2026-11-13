# marcinwnuk.pl: strona ebooka „Mont Blanc”

Instrukcja dla Claude Code. Odpowiadaj po polsku. Właściciel: Marcin Wnuk (GitHub: peha68).

## Zanim zaczniesz
- To repozytorium na Macu: `~/Developer/marcinwnuk-site`. Kopia na Macu może być za GitHubem, więc najpierw `git pull`.
- Pliki pomocnicze (paczka subdomeny, źródła generatora): `~/Developer/marcinwnuk-mb/` (poza repozytorium, niepubliczne). Opis w `~/Developer/marcinwnuk-mb/HANDOFF.md`.

## Co to jest
- Statyczna strona (czysty HTML/CSS/JS, bez kroku budowania) na GitHub Pages, repozytorium `peha68/marcinwnuk-site`, gałąź `main`, katalog główny.
- `/mont-blanc/index.html`: strona ebooka. `/mb/index.html`: strona aktualizacji i plików (cel kodów QR). `/index.html` przekierowuje na `/mont-blanc/`. `404.html`, `CNAME` (marcinwnuk.pl), `.nojekyll`, `robots.txt`, `sitemap.xml`.
- `assets/css/site.css`, `assets/js/site.js` (nagłówek, profil wysokości rysowany przy przewijaniu, paralaksa motta), `assets/fonts/*.woff` (Inter Display, Inter, Source Serif 4, wycinki z polskimi znakami), `assets/img/*.webp`, `assets/spreads/*.webp` (podglądy stron ebooka), `assets/img/og.jpg` (obrazek do udostępniania).
- `pliki/gpx/*.gpx` (7 śladów z wyprawy, na razie publiczne, właściciel kazał zostawić) i `pliki/mapy/map_mb_zdjecia.jpg`.
- Po zmianie CSS/JS podbij `?v=` w odnośnikach w HTML (cache).

## Zasady, których pilnować
- NIGDY nie wrzucaj do tego repozytorium PDF-a ebooka ani plików dla kupujących. Repozytorium i Pages są publiczne, a usunięty plik zostaje w historii git.
- Teksty po polsku, bez długich myślników (—, –) jako pauzy w zdaniu, bez typowych zwrotów AI, polskie cudzysłowy „”. Motto zawsze łamie się po kropce: `<span class="snt">Szczyt jest celem.</span> <span class="snt">Ale bezpieczny powrót jest ważniejszy.</span>`.
- Nie wymyślaj faktów o wyprawie. Teksty brać z ebooka.
- Design: ciemny granit #0F1419, śnieg #F3F5F2, akcent #FF6B2C, lodowiec #9DB8C8, skała #66717C. Bez rozstrzelonych wersalików w etykietach, bez kropek środkowych jako separatorów, bez strzałek doklejanych do przycisków.
- Strona ma działać na telefonie (szerokość 390 px) i respektować `prefers-reduced-motion`.
- Commity: autor `peha68 <peha68@users.noreply.github.com>`.

## Stan na 13.11.2026
- DNS domeny jest w Simply.com (NIE zmieniać serwerów NS). Rekordy: 4× A i 4× AAAA GitHub Pages dla `marcinwnuk.pl`, CNAME `www` → `peha68.github.io`, A `mb` → `91.237.52.247` (serwer cyber_Folks).
- GitHub Pages włączone (main, root). „Enforce HTTPS” czeka na certyfikat GitHuba; gdy będzie dostępne, trzeba je zaznaczyć w Settings → Pages.
- Przycisk „Kup ebook” jest wyłączony (`#buyBtn`, klasa `is-off`, napis „Sprzedaż rusza wkrótce”). Czeka na decyzję o sklepie (Publigo / EasyCart / Gumroad) i link.

## Zadania do zrobienia
1. Subdomena `mb.marcinwnuk.pl` na cyber_Folks: szczegóły i dane serwera w `~/Developer/marcinwnuk-mb/HANDOFF.md`.
2. Linki na `/mont-blanc/` (stopka „Aktualizacje i pliki” i sekcja zakupu) już prowadzą na `https://mb.marcinwnuk.pl/`. Gdy subdomena działa po HTTPS: zamień `/mb/index.html` w tym repozytorium na przekierowanie (meta refresh + canonical) na `https://mb.marcinwnuk.pl/`, w stopce `/mb/` i `404.html` też ustaw linki na subdomenę, usuń `/mb/` z `sitemap.xml`.
3. Po wyborze sklepu: podpiąć link w `#buyBtn` (usunąć `is-off` i `aria-disabled`, zmienić teksty w `.buy-box`), ewentualnie cenę.
