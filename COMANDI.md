# QuickNotes — Comandi utili

Promemoria dei comandi PowerShell più frequenti per lavorare sul progetto.
Tutti i comandi vanno eseguiti dalla cartella del progetto:
`C:\Users\ATanesini\Documents\python-advanced`

---

## 1. Virtual environment

### Attivare il venv (da fare a ogni nuova sessione del terminale)
```powershell
.\.venv\Scripts\Activate.ps1
```
Quando è attivo vedi `(.venv)` all'inizio del prompt.

### Se PowerShell blocca lo script
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\.venv\Scripts\Activate.ps1
```

### Disattivare il venv
```powershell
deactivate
```

### Alternativa: usare il Python del venv senza attivarlo
```powershell
.\.venv\Scripts\python.exe manage.py <comando>
```

---

## 2. Avviare / fermare il server

### Avviare il server di sviluppo
```powershell
python manage.py runserver
```
Apri poi `http://127.0.0.1:8000/` nel browser.

### Avviare su una porta diversa (es. 8080)
```powershell
python manage.py runserver 8080
```

### Fermare il server
Nel terminale dove sta girando, premi `Ctrl + C`.

---

## 3. Database e migrazioni

### Applicare tutte le migrazioni (risolve il messaggio rosso "unapplied migration(s)")
```powershell
python manage.py migrate
```

### Generare nuove migrazioni dopo aver modificato i modelli
```powershell
python manage.py makemigrations
```

### Vedere lo stato delle migrazioni
```powershell
python manage.py showmigrations
```

### Aprire la shell del database
```powershell
python manage.py dbshell
```

---

## 4. App e amministrazione

### Creare una nuova app dentro il progetto
```powershell
python manage.py startapp nome_app
```
Poi aggiungi `'nome_app'` a `INSTALLED_APPS` in `quicknotes/settings.py`.

### Creare un superuser per accedere a `/admin`
```powershell
python manage.py createsuperuser
```
Pannello admin: `http://127.0.0.1:8000/admin/`

### Aprire la shell Python con Django caricato
```powershell
python manage.py shell
```

---

## 5. Pacchetti / dipendenze

### Installare un pacchetto
```powershell
pip install nome_pacchetto
```

### Aggiornare `requirements.txt` (da fare DOPO ogni nuova install)
```powershell
pip freeze > requirements.txt
```

### Installare tutte le dipendenze da `requirements.txt` (es. su un altro PC)
```powershell
pip install -r requirements.txt
```

---

## 6. Diagnostica rapida

### Verificare la configurazione del progetto
```powershell
python manage.py check
```

### Raccogliere i file statici (utile in produzione)
```powershell
python manage.py collectstatic
```

### Vedere tutti i comandi disponibili
```powershell
python manage.py help
```

---

## Flusso tipico di una sessione

```powershell
# 1. Apri il terminale nella cartella del progetto
# 2. Attiva il venv
.\.venv\Scripts\Activate.ps1

# 3. Avvia il server
python manage.py runserver

# 4. Lavora sul codice nell'editor; il server si ricarica da solo a ogni salvataggio
# 5. Ctrl+C per fermare il server quando hai finito
```
