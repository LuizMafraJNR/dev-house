import Reserva from "../../domain/models/Reserva";
import User from "../../domain/models/User";
import House from "../../domain/models/House";

class ReservaController {

    async store(req, res) {
        const { user_id } = req.headers;
        const { house_id } = req.params;
        const { date } = req.body;

        const house = await House.findById(house_id);
        if(!house){
            return res.status(400).json({error: 'Essa casa não existe.'});
        }
        
        if(house.status !== true){
            return res.status(400).json({error: 'Solicitação Indisponivel.'});
        }

        const user = await User.findById(user_id);
        if(String(user._id) === String(house.user)){
            return res.status(401).json({error: 'Reserva não permitida para você mesmo.'})
        }

        const reserva = await Reserva.create({
            user: user_id,
            house: house_id,
            date,
        })

       await reserva.populate(['house', 'user']);

       return res.json(reserva);
    }

    async index(req, res) {
        const { user_id } = req.headers;

        const reservas = await Reserva.find({user: user_id}).populate('house');

        return res.json(reservas);
    }

    async destroy(req, res) {
        const { reserva_id } = req.body;
        await Reserva.findByIdAndDelete({ _id: reserva_id });

        return res.send();
    }
}

export default new ReservaController