import Trikot from "../model/Trikot.mjs";
import TrikotHelper from "../helper/TrikotHelper.mjs";
import ApiError from "../model/ApiError.mjs";
import CreateResponse from "../model/CreateResponse.mjs";

const handleGetAllTrikots = async (req, res) => {
    const trikotHelper = new TrikotHelper();
    try {
        const trikots = await trikotHelper.getAllTrikots();
        return res.status(200).json(trikots);
    } catch (error) {
        res.status(500).json(new ApiError("ee-999"));
    }
}
const handleNewTrikot = async (req, res) => {
    let trikot = new Trikot(
        req.body.number,
        req.body.name,
        req.body.available,
        req.body.member_id);

    trikot.member_id = (trikot.member_id === "null") ? null : trikot.member_id;
    const trikotHelper = new TrikotHelper();
    try {
        const result = await trikotHelper.addTrikot(trikot);
        if (result.success && result.data.affectedRows === 1) return res.status(201).json(new CreateResponse("tere-201"));
    }
    catch (error) {
        console.log(error);
        if (error.code === "ER_DUP_ENTRY") return res.status(400).json(new ApiError("te-400"))
        return res.status(500).json(new ApiError("ee-999"));
    }
}
const handleUpdateTrikot = async (req, res) => {
    let trikot = new Trikot(
        req.params.id,
        req.body.name,
        req.body.available,
        req.body.member_id);

    trikot.member_id = (trikot.member_id === "null") ? null : trikot.member_id;
    const trikotHelper = new TrikotHelper();
    try {
        const result = await trikotHelper.updateTrikot(trikot);
        if (result.data.affectedRows === 0) return res.status(404).json(new ApiError("te-404"));
        return res.status(200).json(new CreateResponse("tere-200"));
    } catch (error) {
        console.log(error);
        if (error.code === "ER_DUP_ENTRY") return res.status(400).json(new ApiError("me-401"))
        return res.status(500).json(new ApiError("ee-999"));
    }
}
const handleDeleteTrikot = async (req, res) => {
    const trikotNumber = req.params.id;
    const trikotHelper = new TrikotHelper();
    try {
        const result = await trikotHelper.deleteTrikotByNumber(trikotNumber);
        if (result.success && result.data.affectedRows === 1) return res.status(200).json(new CreateResponse("tere-202"));
        return res.status(404).json(new ApiError("te-404"));
    } catch (error) {
        console.log(error);
        res.status(500).json(new ApiError("ee-999"));
    }
}

export default {
    handleGetAllTrikots,
    handleNewTrikot,
    handleUpdateTrikot,
    handleDeleteTrikot
}