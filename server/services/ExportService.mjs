
import JSONToCSVConverter from "./jsonToCsvConverter.mjs";
import MemberHelper from "../helper/MemberHelper.mjs";
import EncryptionService from "./EncryptionService.mjs";
async function exportAllMemberList(query){
    let memberHelper = new MemberHelper();
    const encryptionService = new EncryptionService();
    let data = await memberHelper.getAllMembers();
    const decryptedMembersList = encryptionService.decryptMembersListData(data);


    let options = {
        fields: ['firstname', 'lastname', 'email', 'telephone', 'active', 'role', 'entry_date']
    }

// Erstelle eine neue Instanz der Converter-Klasse
    const converter = new JSONToCSVConverter(options);

// Konvertiere JSON-Daten in ein CSV-File und speichere es auf dem Dateisystem
    return converter.convert(decryptedMembersList, `temp/${query}MemberList.csv`);

}
async function exportActiveMemberList(query){
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
    return converter.convert(decryptedMembersList, `temp/${query}MemberList.csv`);

}

async function exportPaymentList(){

}

async function exportTrikotList(){

}

async function exportMailList(){

}

export {exportAllMemberList,exportActiveMemberList, exportPaymentList, exportTrikotList, exportMailList}