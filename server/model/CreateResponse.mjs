const messageCodes = {
    "me-201": "Mitglied erfolgreich hinzugefügt",
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
