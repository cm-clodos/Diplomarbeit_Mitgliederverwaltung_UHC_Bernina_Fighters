import JSONToCSVConverter from "./jsonToCsvConverter.mjs";
import MemberHelper from "../helper/MemberHelper.mjs";
import EncryptionService from "./EncryptionService.mjs";
import TrikotHelper from "../helper/TrikotHelper.mjs";

async function exportAllMemberList(filter){
    let memberHelper = new MemberHelper();
    const encryptionService = new EncryptionService();
    let data = await memberHelper.getAllMembers();
    const decryptedMembersList = encryptionService.decryptMembersListData(data);
    formatEntryDates(decryptedMembersList)


    let options = {
        fields: ['firstname', 'lastname', 'email', 'telephone', 'active', 'role', 'entry_date']
    }

// Erstelle eine neue Instanz der Converter-Klasse
    const converter = new JSONToCSVConverter(options);

// Konvertiere JSON-Daten in ein CSV-File und speichere es auf dem Dateisystem
    return converter.convert(decryptedMembersList, `temp/${filter}MemberList.csv`);

}
async function exportActiveMemberList(filter){
    let memberHelper = new MemberHelper();
    const encryptionService = new EncryptionService();
    let data = await memberHelper.getAllActiveMembers();
    const decryptedMembersList = encryptionService.decryptMembersListData(data);
    formatEntryDates(decryptedMembersList)

    let options = {
        fields: ['firstname', 'lastname', 'email', 'telephone', 'active', 'role', 'entry_date']
    }

// Erstelle eine neue Instanz der Converter-Klasse
    const converter = new JSONToCSVConverter(options);

// Konvertiere JSON-Daten in ein CSV-File und speichere es auf dem Dateisystem
    return converter.convert(decryptedMembersList, `temp/${filter}MemberList.csv`);

}

async function exportAllTrikotList(filter){
   let trikotHelper = new TrikotHelper();
    const encryptionService = new EncryptionService();
    let data = await trikotHelper.getAllTrikots();
    let decryptedTrikotData = encryptionService.decryptTrikotData(data);

    let options = {
        fields: ['number', 'name','available', 'firstname', 'lastname']
    }

    const converter = new JSONToCSVConverter(options);

    return converter.convert(decryptedTrikotData, `temp/${filter}TrikotList.csv`);

}
async function exportAvailableTrikotList(filter){
  let trikotHelper = new TrikotHelper();
  const encryptionService = new EncryptionService();
  let data = await trikotHelper.getAllTrikots();
  let decryptedTrikotData = encryptionService.decryptTrikotData(data);

  let availableTrikots = decryptedTrikotData.filter((trikot) => trikot.available === 1);

  let options = {
    fields: ['number', 'name','available', 'firstname', 'lastname']
  }

  const converter = new JSONToCSVConverter(options);

  return converter.convert(availableTrikots, `temp/${filter}TrikotList.csv`);
}

async function exportAllMailList(filter){
  let memberHelper = new MemberHelper();
  const encryptionService = new EncryptionService();
  let data = await memberHelper.getActiveMemberEmails();
  const decryptedMemberEmails = encryptionService.decryptMemberEmails(data);

  let options = {
    fields: ['email']
  }

  const converter = new JSONToCSVConverter(options);

  return converter.convert(decryptedMemberEmails, `temp/${filter}MailList.csv`);
}
async function exportPaidMemberMailList(filter, period){
  let memberHelper = new MemberHelper();
  const encryptionService = new EncryptionService();
  let data = await memberHelper.getMemberEmailsWithPaymentInfos();
  const decryptedMemberEmails = encryptionService.decryptMemberEmails(data.data);

  let filteredEmails = filterEmailByPaidAndYear(decryptedMemberEmails, period);

  let options = {
    fields: ['email']
  }

  const converter = new JSONToCSVConverter(options);

  return converter.convert(filteredEmails, `temp/${filter}${period}MailList.csv`);
}
async function exportUnpaidMemberMailList(filter, period){
  let memberHelper = new MemberHelper();
  const encryptionService = new EncryptionService();
  let data = await memberHelper.getMemberEmailsWithPaymentInfos();
  const decryptedMemberEmails = encryptionService.decryptMemberEmails(data.data);

  let filteredEmails = filterEmailByUnpaidAndYear(decryptedMemberEmails, period)

  let options = {
    fields: ['email']
  }

  const converter = new JSONToCSVConverter(options);

  return converter.convert(filteredEmails, `temp/${filter}${period}MailList.csv`);
}
function filterEmailByPaidAndYear(emails, year) {
  return emails.filter(item => {
      const periodeYear = new Date(item.created_at).getFullYear();
      return item.paid === 1 && periodeYear === parseInt(year);
    });
}
function filterEmailByUnpaidAndYear(emails, year) {
  return emails.filter(item => {
    const periodeYear = new Date(item.created_at).getFullYear();
    return item.paid === 0 && periodeYear === parseInt(year);
  });
}
function formatInSwissTime(unformattedDate){
  let date = new Date(unformattedDate);
  const options = {timeZone: 'Europe/Zurich', year: 'numeric', month: '2-digit', day: '2-digit'};
  return date.toLocaleDateString('de-CH', options);
}
function formatEntryDates(membersList) {
  membersList.forEach(member => {
    member.entry_date = formatInSwissTime(member.entry_date);
  });
}


export {exportAllMemberList,exportActiveMemberList, exportAllTrikotList,exportAvailableTrikotList, exportAllMailList, exportPaidMemberMailList, exportUnpaidMemberMailList, formatInSwissTime}