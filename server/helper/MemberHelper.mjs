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
    async getMemberById(id) {
        const sql = "SELECT * FROM members WHERE id = ?";
        try {
            return await this.databaseConnector.query(sql, [id]);
        } catch (error){
            throw error;
        }
    }
    async deleteMemberById(id) {
        const sql = "DELETE FROM members WHERE id = ?";
        try {
            return await this.databaseConnector.query(sql, [id]);
        } catch (error){
            throw error;
        }
    }
    async deleteMemberByLastname(lastname) {
        const sql = "DELETE FROM members WHERE lastname = ?";
        try {
            return await this.databaseConnector.query(sql, [lastname]);
        } catch (error){
            throw error;
        }
    }
    async updateMember(id, member) {
        const data = [member.firstname, member.lastname, member.email, member.telephone, member.active, member.role, member.entryDate, id];
        const sql = "UPDATE members SET firstname=?, lastname=?, email=?, telephone=?, active=?, role_id=?, entry_date=? WHERE id=?";
        try {
            return await this.databaseConnector.query(sql, data);
        } catch (error){
            throw error;
        }
    }

}

export default MemberHelper;