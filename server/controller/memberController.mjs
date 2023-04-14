import MemberHelper from "../helper/memberHelper.mjs";


const handleGetAllMembers = async (req, res) => {
    const memberHelper = new MemberHelper();
    try {
        const members = await memberHelper.getAllMembers();
        res.status(200).json(members);
    } catch (error) {
        console.log(error);
        res.status(500).json("Es ist ein interner Serverfehler aufgetreten. Bitte versuchen Sie es später erneut.");
    }
}

export default {
    handleGetAllMembers,
}