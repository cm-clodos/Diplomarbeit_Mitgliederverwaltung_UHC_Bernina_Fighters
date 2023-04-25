import EncryptionService from "../services/EncryptionService.mjs";
class Member {
    id;
    firstname;
    lastname;
    email;
    telephone;
    active;
    role;
    entryDate;
    encryptionService = new EncryptionService();

    constructor(firstname, lastname, email, telephone, active, role, entryDate){
        this.firstname = this.encryptionService.encrypt(firstname);
        this.lastname = this.encryptionService.encrypt(lastname);
        this.email = this.encryptionService.encrypt(email);
        this.telephone = this.encryptionService.encrypt(telephone);
        this.active = active;
        this.role = role;
        this.entryDate = new Date(entryDate);
    }

}

export default Member;