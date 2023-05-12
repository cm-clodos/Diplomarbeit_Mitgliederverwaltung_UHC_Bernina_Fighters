


export function checkFirstname(firstname){
    const error = {}
    if (!firstname || typeof firstname !== 'string' || firstname.trim().length === 0) {
        console.log("firstname: " + firstname)
        error.firstname = 'Vorname ist erforderlich.';
    } else if (firstname.trim().length > 50) {
        error.firstname = 'Vorname darf maximal 50 Zeichen lang sein.';
    }
    return error;
}
export function checkLastname(lastname){
    const error = {}
    if (!lastname || typeof lastname !== 'string' || lastname.trim().length === 0) {
        error.lastname = 'Nachname ist erforderlich.';
        console.log("lastname: " + lastname)
    } else if (lastname.trim().length > 50) {
        error.lastname = 'Nachname darf maximal 50 Zeichen lang sein.';
    }
    return error;
}

export function checkEmail(email){
    const error = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
        console.log("email: " + email)
        error.email = 'E-Mail-Adresse ist ungültig.';
    }
    return error;
}

export function checkTelephone(telephone){
    const error = {}
    const phoneRegex = /^\d{10,13}$/;
    if (telephone === '' || !phoneRegex.test(telephone)) {
        console.log("telephone: " + telephone)
        error.telephone = 'Telefonnummer ist ungültig.';
    }
    return error;
}

export function checkActive(active){
    const error = {}

    if (active !== true && active !== false && active !== 0 && active !== 1) {
        console.log("active: " + active)
        error.active = 'Aktives Flag muss true, false, 0 oder 1 sein.';
    }
    return error;
}

export function checkRoleId(roleId){
    const error = {}
    if (!roleId || typeof roleId !== 'number' || roleId < 1 || roleId > 5) {
        console.log("roleId: " + roleId)
        error.role_id = 'Rolle ist ungültig.';
    }
    return error;
}

export function checkEntryDate(entryDate){
    const error = {}
    if (!entryDate || typeof entryDate !== 'string' || entryDate.trim().length === 0) {
        error.entry_date = 'Eintrittsdatum ist erforderlich.';
        console.log("entryDate: " + entryDate)
    } else if (entryDate.trim().length > 10) {
        error.entry_date = 'Eintrittsdatum darf maximal 10 Zeichen lang sein.';
    }
    return error;
}

export function checkTrikotNumber(trikotNumber){
    const error = {}
    if (trikotNumber === '' || isNaN(parseInt(trikotNumber))) {
        console.log("trikotNumber: " + trikotNumber)
        error.number = 'Trikotnummer ist ungültig.';
    }else if (parseInt(trikotNumber) < 0 || parseInt(trikotNumber)  > 99){
        error.number = 'Trikotnummer muss zwischen 0 und 99 liegen.';
    }
    return error;
}

export function checkTrikotName(trikotName){
    const error = {}
     if (trikotName.trim().length >= 20) {
        error.name = 'Trikotname darf maximal 20 Zeichen lang sein.';
    }
    return error;
}

export function checkAvailable(available){
    const error = {}
    if (available !== true && available !== false && available !== 0 && available !== 1) {
        console.log("available: " + available)
        error.available = 'Verfügbarkeit muss true, false, 0 oder 1 sein.';
    }
    return error;
}

export function checkMemberId(memberId){
    const error = {};
    if (memberId !== null && memberId !== 'null' && (isNaN(parseInt(memberId)) || parseInt(memberId) < 1)) {
        error.member_id = 'Mitglieds ID ist ungültig.';
    }
    return error;
}

export function trimData(data){
    const trimmedData = {};

    Object.keys(data).forEach((key) => {
        if (typeof data[key] === 'string') {
            trimmedData[key] = data[key].trim();
        } else {
            trimmedData[key] = data[key];
        }
    });
    return trimmedData;
}

export function formatFirstLetterOfNames(name){
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}



