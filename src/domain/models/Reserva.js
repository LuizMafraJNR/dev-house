import {Schema, model} from "mongoose";

const ReservaSchema = new Schema({
    date: String,
    users: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    house: {
        type: Schema.Types.ObjectId,
        ref: 'House'
    }
}, {
    strictPopulate: false
})

export default model('Reserva', ReservaSchema);