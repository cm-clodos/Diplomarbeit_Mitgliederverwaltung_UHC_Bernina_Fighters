const errorCodes = {
    "ee-999": "Unbekannter Fehler",
    "ee-404": "Route nicht gefunden, überprüfe die URL!",
    "me-322": "Email oder Telefonnummer existiert bereits",
    "me-323": "Mitglieds ID ist erforderlich",
    "me-324": "Mitgliedsdaten sind erforderlich",
    "me-404": "Mitglied nicht gefunden",
    "fe-404": "Datei nicht gefunden"
}


class ApiError {
    errorCode;
    message;
    relatedColumn
    data;

    constructor(errorCode, column=null) {
        this.success = false;
        this.errorCode = errorCode;
        this.message = errorCodes[errorCode] || "unbekannter Fehler";
        this.relatedColumn = column;
        return this;
    }
    setMessage(message){
        this.message = message;
        return this;
    }
    setRelatedColumn(column){
        this.relatedColumn = column;
        return this;
    }
    setData(data){
        this.data = data;
        return this;
    }
}

export default ApiError;