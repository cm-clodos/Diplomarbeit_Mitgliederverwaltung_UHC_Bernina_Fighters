import DatabaseConnection from "../model/DatabaseConnection.mjs";

class MemberHelper {
    databaseConnector = null;

    constructor(databaseType = 'production') {
        this.databaseConnector = new DatabaseConnection(databaseType);
    }

    async getAllMembers() {
        let sql = "SELECT members.id, members.firstname, members.lastname, members.email, members.telephone, members.active, memberrole.role, members.entry_date FROM members";
        sql += " JOIN memberrole ON members.role_id = memberrole.id";
        sql += " ORDER BY members.active DESC, members.entry_date ASC";
        try {
            const res = await this.databaseConnector.query(sql, null);
            return res.data;
        } catch (error){
            throw error;
        }
    }
    async addMember(member) {
        const sql = "INSERT INTO members (firstname, lastname, email, telephone, active, role_id, entry_date) VALUES (?,?,?,?,?,?,?)";
        try {
            return await this.databaseConnector.query(sql, [member.firstname, member.lastname, member.email, member.telephone, member.active, member.role, member.entryDate]);
        } catch (error){
            throw error;
        }
    }

}

export default MemberHelper;