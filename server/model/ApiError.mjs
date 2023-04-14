const errorCodes = {
    "ee-999": "Unbekannter Fehler",
    "me-322": "Email oder Telefonnummer existiert bereits",
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