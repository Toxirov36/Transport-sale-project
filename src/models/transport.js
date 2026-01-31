import mongoose from "mongoose";

const transportSchema = new mongoose.Schema({
    branch: {type : mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true},
    model: {type: String, reuired: true},
    color: {type: String, required: true},
    img: {type: String},
    price: {type: Number, required: true},
    time: {type: Date, default: Date.now}
});

export default mongoose.model("Transport", transportSchema)