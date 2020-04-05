# kontakty
Aplikacja React Native na urządzenia z systemem android z wykorzystaniem aparatu.


(&#x1F49A;) Jeśli w instrukcji brakuje jakiegoś kroku lub rozwiązania błędu, dodaj je (&#x1F49A;)


## Przygotowanie środowiska pracy
Według instrukcji na stronie https://reactnative.dev/docs/getting-started

## Klonowanie repozytorium i pierwsze uruchomienie
1. Po sklonowaniu repozytorium trzeba użyć komendy `npm install` w głównym katalogu projektu.
2. W terminalu użyć polecenia `npm install -g expo-cli`. Podgląd zmian w peojekcie podczas implementacji będzie realizowany przy użyciu aplikacji [Expo](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=pl) (zarówno na urządzeniu fizycznym jak i emulatorze).
3. Polecenie do uruchomienia projektu to `npm start` lub `expo start`. Rezultatem powinno być otwarcie karty "Metro builder" w przeglądarce internetowej oraz pokazanie się menu wyboru w terminalu.
 
## Problemy ogólne
+ W razie problemów z połączeniem (komunikat błędu z lokalnym adresem ip) proszę na komputerze **wyłączyć zaporę ogniową** (dotyczy antywirusa oraz zapory systemowej).
+ **Can not connect to the metro server** -> wyłączyć aplikację expo -> ctrl + c w terminalu -> npm start -> a.

## Własne urządzenie
1. Należy pobrać aplikację [Expo](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=pl) dostępną w Sklep Play. 
2. Komputer oraz urządzenie muszą być w tej samej sieci lokalnej.
3. W razie problemów z połączeniem (komunikat błędu z lokalnym adresem ip) proszę na komputerze **wyłączyć zaporę ogniową** (dotyczy antywirusa oraz zapory systemowej).
4. Aplikacje uruchamia się poprzez zeskanowanie kodu QR dostępnego w wierszu poleceń lub oknie przeglądarki.

## Emulator
1. Emulator należu uruchomić samemu, ręcznie poprzez AVD Manager. Emulator rónież korzysta z aplikacji [Expo](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=pl), która instaluje się sama.
2. Jeżeli emulator działał, ale przestał należy w AVD Manager wybrać używane urządzenie z listy a następnie wybrać opcję **Wipe data**.
3. Jeśli emulator nie zadziała, proszę sprawdzić swoją konfigurację android studio, poniżej został opisany proces dodawania nowego emulatora z niezbędną konfuguracją. 

   1. Ustawienia Android SDK/ SDK Manager
      1. SDK Platforms
         1. Zainstalowane jedno z najnowszych SDK: 10.0 Q lub 9.0 Pie
      2. SDK Toold (trzeba zaznaczyć)
          1. Android Emulator
          2. Android SDK Platform-Tools
          3. Android SDK Tools
          4. Intel x86 Emulator Accelerator (HAXM installer)
          5. Google Play services
    2. AVD Manager -> Create Virtual Device.
    3. Wybierając urządzenie proszę się upewnić, że ma ono "Play store" (trójkątna ikonka w kolumnie, obok rozmiaru ekranu).
    4. Wybierając obraz systemu proszę wybrać wersję stabilną, czyli drugą pozycję licząc od góry lub niższą. 
