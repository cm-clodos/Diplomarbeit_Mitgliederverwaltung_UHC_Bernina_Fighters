import MemberHelper from "../helper/memberHelper.mjs";
import Member from "../model/member.mjs";
import CreateResponse from "../model/CreateResponse.mjs";
import ApiError from "../model/ApiError.mjs";


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

const handleNewMember = async (req, res) => {
    const memberHelper = new MemberHelper();
    let member = new Member(
        req.body.firstname,
        req.body.lastname,
        req.body.email,
        req.body.telephone,
        req.body.active,
        req.body.role_id,
        req.body.entry_date
    );

    console.log(member)
    try {
        const result = await memberHelper.addMember(member);
        console.log(result)
        return res.status(201).json(new CreateResponse("me-201"));

    } catch (error) {
        console.log(error);
        if (error.code === "ER_DUP_ENTRY") return res.status(400).json(new ApiError("me-322"))
        return res.status(500).json(new ApiError("ee-999"));
    }
}

export default {
    handleGetAllMembers,
    handleNewMember
}