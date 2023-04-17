const messageCodes = {
    "mere-200": "Mitglied erfolgreich aktualisiert",
    "mere-201": "Mitglied erfolgreich hinzugefügt",
    "mere-202": "Mitglied erfolgreich gelöscht",
    "mere-404": "Mitglied nicht gefunden",
    "pere-200": "Zahlung erfolgreich aktualisiert",
    "pere-201": "Neue Zahlungsperiode erfolgreich hinzugefügt",
}

class CreateResponse {
    success;
    message;
    payload;

    constructor(messageCode){
        this.success = true;
        this.message = messageCodes[messageCode] || "Unbekannte Nachricht" ;
    }
    setMessage(message){
        this.message = message;
        return this;
    }
    setSuccess(successState){
        this.success = successState;
        return this;
    }
    setPayload(payload){
        this.payload = payload;
        return this;
    }
}

export default CreateResponse;
