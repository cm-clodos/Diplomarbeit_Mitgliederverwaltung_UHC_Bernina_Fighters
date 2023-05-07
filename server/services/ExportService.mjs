
import JSONToCSVConverter from "./jsonToCsvConverter.mjs";
import MemberHelper from "../helper/MemberHelper.mjs";
import EncryptionService from "./EncryptionService.mjs";
import TrikotHelper from "../helper/TrikotHelper.mjs";
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

async function exportAllTrikotList(query){
   let trikotHelper = new TrikotHelper();
    const encryptionService = new EncryptionService();
    let data = await trikotHelper.getAllTrikots();
    let decryptedTrikotData = encryptionService.decryptTrikotData(data);

    let options = {
        fields: ['number', 'name','available', 'firstname', 'lastname']
    }

    const converter = new JSONToCSVConverter(options);

    return converter.convert(decryptedTrikotData, `temp/${query}TrikotList.csv`);
}
async function exportAvailableTrikotList(query){
  let trikotHelper = new TrikotHelper();
  const encryptionService = new EncryptionService();
  let data = await trikotHelper.getAllTrikots();
  let decryptedTrikotData = encryptionService.decryptTrikotData(data);

  let availableTrikots = decryptedTrikotData.filter((trikot) => trikot.available === 1);

  let options = {
    fields: ['number', 'name','available', 'firstname', 'lastname']
  }

  const converter = new JSONToCSVConverter(options);

  return converter.convert(availableTrikots, `temp/${query}TrikotList.csv`);
}

async function exportMailList(){

}

export {exportAllMemberList,exportActiveMemberList, exportPaymentList, exportAllTrikotList,exportAvailableTrikotList, exportMailList}