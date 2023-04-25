
import JSONToCSVConverter from "./jsonToCsvConverter.mjs";
import MemberHelper from "../helper/MemberHelper.mjs";
import EncryptionService from "./EncryptionService.mjs";
async function exportMemberList(){
    let memberHelper = new MemberHelper();
    const encryptionService = new EncryptionService();
    let data = await memberHelper.getAllActiveMembers();
    const decryptedMembersList = encryptionService.decryptMembersListData(data);


    let options = {
        fields: ['firstname', 'lastname', 'email', 'telephone', 'active', 'role', 'entry_date']
    }

// Erstelle eine neue Instanz der Converter-Klasse
    const converter = new JSONToCSVConverter(options);

// Konvertiere JSON-Daten in ein CSV-File und speichere es auf dem Dateisystem
    return converter.convert(decryptedMembersList, 'temp/memberList.csv');

}

async function exportPaymentList(){

}

async function exportTrikotList(){

}

async function exportMailList(){

}

export {exportMemberList, exportPaymentList, exportTrikotList, exportMailList}