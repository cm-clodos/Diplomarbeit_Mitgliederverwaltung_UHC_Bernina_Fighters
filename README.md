# Mitgliederverwaltung UHC Bernina Fighters
## Diplomarbeit von Claudia Martinez
### NDS HF Applikationsentwicklerin 2023

Dieses Git Repository wurde erstellt für die Diplomarbeit von Claudia Martinez. Die Applikation ist eine Mitgliederverwaltung für den Verein UHC Bernina Fighters. 



## Inhaltsverzeichnis
- [Einleitung](#einleitung)
- [Vorbereitung](#vorbereitung)
- [Installation](#installation)
- [Konfiguration](#konfiguration)
- [Benutzung](#benutzung)
- [Entwickler](#entwickler)
- [Lizenz](#lizenz)
- [Quellen](#quellen)



## Einleitung

## Vorbereitung

### Voraussetzungen

Die Applikation wurde mit folgenden Versionen getestet:

- [MariaDB 10.10.2](https://mariadb.org/)
- [NodeJS 18.13.0](https://nodejs.org/en/)
- [NPM 8.19.3](https://www.npmjs.com/)

## Installation 

### NodeJS und NPM
#### Installation von NodeJS und NPM für MacOS und Windows
- Installieren Sie NodeJS und NPM von der offiziellen Website
https://nodejs.org/en/download

- Eine detaillierte Anleitung zum Installieren von NodeJS und NPM finden Sie hier:
https://kinsta.com/de/blog/so-installierst-du-node-js/

### Datenbank
#### Installation MariaDB für MacOS
- Installieren Sie MariaDB mit Homebrew
https://mariadb.com/kb/en/installing-mariadb-on-macos-using-homebrew/

#### Installation MariaDB für Windows
- Installieren Sie MariaDB für Windows
https://mariadb.com/kb/en/installing-mariadb-msi-packages-on-windows/

#### Auto Start der Datenbank für MacOS mit Homebrew
- Starten Sie den Datenbank Service mit folgendem Befehl:
```
brew services start mariadb
```
- Stoppen Sie den Datenbank Service mit folgendem Befehl:
```
brew services stop mariadb
```

### Installation der Abhängigkeiten
Um alle Abhängigkeiten zu installieren, führen Sie folgende Befehle aus:
```bash
npm install
```
```bash
cd client && npm install
```
```bash
cd server && npm install
```



## Konfiguration
### Environment Variablen
Die Applikation hat bereits eine Beispiel example.env Datei. Diese muss kopiert, umbenannt und angepasst werden. 

1. Kopieren Sie die Datei example.env und benennen Sie diese in .env um.
2. Öffnen Sie die Datei .env und passen Sie die Variablen an, die mit Platzhaltern versehen sind.
3. Speichern Sie die Datei .env
4. Stellen Sie sicher, dass die Datei .env nicht in das Git Repository geladen wird. Fügen Sie die Datei .env in die .gitignore Datei ein.

### Erstellung Secret Key für Verschlüsselung
Für den Verschlüsselungs-Service wird ein Secret Key benötigt. Dieser kann mit folgendem Befehl erstellt werden:
> **WICHTIG!**
>
> Bevor der Secret Key erstellt werden kann, muss die .env Datei bereits erstellt worden sein! Siehe Abschnitt [Environment Variablen](#environment-variablen).

1. Führen Sie folgenden Befehl aus:
```bash
cd server && npm run config-keys
```
In der .env Datei wurden nun die Variablen SECRET_KEY und ALGORITHM mit den entsprechenden Werten gefüllt.

### Ausführung der SQL Skripte
Im Ordner sql befinden sich die SQL Skripte für die Erstellung der Datenbank und der Testdatenbank. Die Skripte müssen in der Reihenfolge ausgeführt werden, wie sie im Ordner sql aufgelistet sind.
1. Ausführen des Datenbank Installations Skripts im Verzeichnis sql/installation (Der Datenbank Name muss der gleiche sein, wie in der .env Datei!)
2. Ausführen der Tabellen Skripte im Verzeichnis sql/tables (Reihenfolge beachten!)

Wurde die Datenbank erstellt kann der Vorgang wiederholt werden und eine Testdatenbank erstellt werden. Die Testdatenbank muss einen anderen Namen haben, als die Produktive Datenbank.(Der Testdatenbank Name muss der gleiche sein, wie in der .env Datei!)
## Benutzung
### Applikation starten (Server und Client in Production Mode)
Mit folgendem Befehl wird die Applikation gestartet:
```bash
npm run prodStart
```
### Applikation starten (Server und Client in Development Mode)
Mit folgendem Befehl wird die Applikation gestartet:
```bash
npm run devStart
```

### Server starten
Mit folgendem Befehl wird der Server gestartet:
```bash
cd server && npm run start
```
### Server starten mit Verbindung zur Testdatenbank
Mit folgendem Befehl wird der Server gestartet und verbindet sich mit der Testdatenbank:
```bash
cd server && npm run dev
```

### Client starten
Mit folgendem Befehl wird der Client gestartet:
```bash
cd client && npm run serve
```
## Test Ausführung
### Server Tests
Mit folgendem Befehl werden die Server Tests ausgeführt:
```bash
cd server && npm run test
```
### Client Tests
Mit folgendem Befehl werden die Client Tests ausgeführt:
```bash
cd client && npm run test
```

### E2E Tests
Um die E2E Tests auszuführen, muss die Applikation im Development Mode gestartet sein. Führen Sie folgenden Befehl aus:
```bash
npm run devStart
```
Die E2E Tests werden mit folgendem Befehl gestartet:
```bash
cd client && npm run test:e2e
```


## Entwickler

## Lizenz

## Quellen
