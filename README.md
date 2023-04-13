# HamSpelling

link do aplikacji https://radomirmazon.github.io/quebec/

Aplikacja z pytaniami do egzaminu KF. Pytania dla nowej i starej bazy. 
Nauka polega na przekładaniu pytań, na które udzieliliśmy poprawnej odpowiedzi, do kolejnych pudeł. 
W pierwszym pudle będą znajdowały się pytania, które powinniśmy ćwiczyć codziennie.
Gdy nie uda nam się odpowiedzieć na któreś z pytań poprawnie, trafia ono do pierwszego pudła. 
Powodzenia.

## UWAGA: 

Odpowiedzi poprawne ze starego egzaminu, są skopiowanie z strony http://www.egzaminkf.pl/home.php
Natomiast dla nowego egzaminu nie było pytań w momencie ich kopiowania z bazy 
https://github.com/HackerspaceKRK/pytania-egzaminacyjne
i należy mieć na uwadze, iż mogą być w nich błędy. Data kopiowania bazy to początek marca 2023.

## Jak samemu skompilować aplikację 

* zainstaluj nodejs
* ściągnij projekt
* wykonaj npm install

Aplikację możesz uruchomić lokalnie poleceniem 

npm start

Kompilowania aplikacji produkcyjnie (wynik kompilacji będzie w katalogu /docs):

npm run build



### Sesja

Aplikacja trzyma Twoje wyniki w local storage przeglądarki. To oznacza, że jeśli zmienisz przeglądarkę, lub używasz trypu inkognito, Twoje wyniki przepadną. 
Używanie w tym samym czasie aplikacji na wielu zakładkach, nadpisze ostatnio kliknięty wynik. 
