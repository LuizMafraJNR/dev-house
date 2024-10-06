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

       /*
       const populatedReserva = await Reserva.findOne({_id: reserva._id})
       .populate('house')
       .populate('user')
       .exec();
       */

       await reserva.populate(['house', 'user']);
       
       return res.json(reserva);
    }
}

export default new ReservaController