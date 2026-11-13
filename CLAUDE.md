# marcinwnuk.pl: strona ebooka „Mont Blanc”

Instrukcja dla Claude Code. Odpowiadaj po polsku. Właściciel: Marcin Wnuk (GitHub: peha68).

## Zanim zaczniesz
- To repozytorium na Macu: `~/Developer/marcinwnuk-site`. Kopia na Macu może być za GitHubem, więc najpierw `git pull`.
- Pliki pomocnicze (paczka subdomeny, źródła generatora): `~/Developer/marcinwnuk-mb/` (poza repozytorium, niepubliczne). Opis w `~/Developer/marcinwnuk-mb/HANDOFF.md`.

## Co to jest
- Statyczna strona (czysty HTML/CSS/JS, bez kroku budowania) na GitHub Pages, repozytorium `peha68/marcinwnuk-site`, gałąź `main`, katalog główny.
- `/mont-blanc/index.html`: strona ebooka (z sekcją „Poradnik”).
- `/poradnik/`: indeks i sześć artykułów (`rezerwacja-gouter-tete-rousse`, `ile-kosztuje-mont-blanc`, `mont-blanc-droga-normalna-dzien-po-dniu`, `aklimatyzacja-gran-paradiso`, `sprzet-na-mont-blanc`, `bledy-na-mont-blanc`). Treść to fragmenty ebooka; nowe artykuły też tylko z tekstu ebooka. Każdy nowy adres dopisz do `sitemap.xml`. `/mb/index.html`: przekierowanie na `https://mb.marcinwnuk.pl/` (strona aktualizacji i plików, cel kodów QR). `/index.html` przekierowuje na `/mont-blanc/`. `404.html`, `CNAME` (marcinwnuk.pl), `.nojekyll`, `robots.txt`, `sitemap.xml`.
- Wersja angielska: `/en/mont-blanc/` (strona ebooka) i `/en/guide/` + sześć artykułów (`booking-gouter-tete-rousse-huts`, `mont-blanc-cost`, `mont-blanc-normal-route-day-by-day`, `acclimatisation-gran-paradiso`, `mont-blanc-gear`, `mont-blanc-mistakes`), tłumaczenia fragmentów ebooka. Angielski ebook jest w przygotowaniu (tak też piszemy na stronie). Strony PL i EN są połączone `hreflang` i przełącznikiem `.lang` w nagłówku: zmieniając treść w jednej wersji, zmień też drugą. W tekstach angielskich też bez długich myślników; cudzysłowy “ ”.
- `assets/css/site.css`, `assets/js/site.js` (nagłówek, profil wysokości rysowany przy przewijaniu, paralaksa motta), `assets/fonts/*.woff` (Inter Display, Inter, Source Serif 4, wycinki z polskimi znakami), `assets/img/*.webp`, `assets/spreads/*.webp` (podglądy stron ebooka), `assets/img/og.jpg` (obrazek do udostępniania).
- `pliki/gpx/*.gpx` (7 śladów z wyprawy, na razie publiczne, właściciel kazał zostawić; od 13.11.2026 oczyszczone z postojów i drgań GPS, surowe zapisy z zegarka są w `~/Developer/marcinwnuk-mb/gpx-surowe/`, skrypty w `~/Developer/marcinwnuk-mb/zrodla/gpx-czyszczenie/`) i `pliki/mapy/map_mb_zdjecia.jpg`.
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
- GitHub Pages włączone (main, root), certyfikat wydany, „Enforce HTTPS” włączone (13.11.2026).
- Przycisk „Kup ebook” jest wyłączony (`#buyBtn`, klasa `is-off`, napis „Sprzedaż rusza wkrótce”). Czeka na decyzję o sklepie (Publigo / EasyCart / Gumroad) i link.

## Subdomena mb.marcinwnuk.pl (działa od 13.11.2026)
- Strona aktualizacji i plików jest na cyber_Folks (`s138.cyber-folks.pl`, port SSH 222), w `~/domains/mb.marcinwnuk.pl/public_html/`. HTTPS z Let's Encrypt i wymuszenie HTTPS są włączone w DirectAdmin.
- Na Macu jest wpis `mb-cyberfolks` w `~/.ssh/config` (logowanie kluczem). Wgrywanie: `rsync -rtvz -p <folder>/ mb-cyberfolks:domains/mb.marcinwnuk.pl/public_html/`.
- `.htaccess` na serwerze ma na końcu linię `AddHandler application/x-httpd-php84 php` dodaną przez panel. Nie usuwać jej przy wgrywaniu.
- `/mb/index.html` w tym repozytorium to już tylko przekierowanie na `https://mb.marcinwnuk.pl/`. Treść strony aktualizacji zmienia się na serwerze, nie tutaj.

- Google Search Console: domena zweryfikowana (13.11.2026).

## Dystanse i profil wysokości
- Profil na `/mont-blanc/` i `/en/mont-blanc/` oraz kilometry przy dniach są liczone z oczyszczonych śladów (postój: co najmniej 10 min w promieniu 30 m; poza postojami liczą się przesunięcia o co najmniej 12 m). Razem 41,3 km. Surowe ślady dawały 59,7 km, bo zegarek dopisywał dystans na postojach.
- Te same pliki GPX i te same kilometry muszą być na `mb.marcinwnuk.pl`. Przy zmianie śladów zaktualizować wszystkie trzy miejsca.
- Przewyższenia („W górę”, „W dół”) są liczone po oczyszczonym śladzie z modelu terenu SRTM 30 m (średnia krocząca z 5 punktów, próg 10 m, wynik zaokrąglony do 10 m), nie z barometru zegarka. Skrypty i pobrane wysokości: `~/Developer/marcinwnuk-mb/zrodla/gpx-czyszczenie/` (`dem.py`, `gain.py`, `dem_srtm.json`).

## Zadania do zrobienia
1. Po wyborze sklepu: podpiąć link w `#buyBtn` (usunąć `is-off` i `aria-disabled`, zmienić teksty w `.buy-box`), ewentualnie cenę.
