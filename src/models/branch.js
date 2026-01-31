import mongoose from "mongoose";

const branchSchema = new mongoose.Schema({
    name: {type : String, required: true},
    time: {type: Date, default: Date.now},
    address: {type: String, required: true}
});

export default mongoose.model("Branch", branchSchema)