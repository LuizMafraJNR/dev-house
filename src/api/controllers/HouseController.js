import { restart } from "nodemon";
import House from "../../domain/models/House";
import User from "../../domain/models/User";
import * as yup from 'yup';

class HouseController {

    async index(req,res){
        const { status } = req.query;
        const houses = await House.find({status});
        return res.json(houses);
    }

    async store(req,res) {
        const schema = yup.object().shape({
            description: yup.string().required(),
            price: yup.number().required(),
            location: yup.string().required(),
            status: yup.boolean().required(),
        });

        const {filename} = req.file;
        const {description, price,location,status} = req.body;
        const {user_id} = req.headers;

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: 'Falha na validação'});
        }

        const house = await House.create({
            user: user_id,
            thumbnail: filename,
            description,
            price,
            location,
            status
        })
        //console.log(req.body);
        //console.log(req.file);

        return res.json(house);
    };

    async update(req,res) {
        const schema = yup.object().shape({
            description: yup.string().required(),
            price: yup.number().required(),
            location: yup.string().required(),
            status: yup.boolean().required(),
        });

        const { id }= req.params;
        const { filename } = req.file;
        const { description, price, location, status } = req.body;
        const { user_id } = req.headers;

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error: 'Falha na validação'});
        }
        
        const user = await User.findById(user_id);
        const findHouse = await House.findById(id);

        if(String(user._id) !== String(findHouse.user)){
            return res.status(401).json({error: 'Não autorizado'});
        }

        await House.updateOne({_id: id}, {
            user: user_id,
            thumbnail: filename,
            description,
            price,
            location,
            status,
        });

        return res.send();
    }

    async destroy(req, res){
        const { id } = req.body;
        const { user_id } = req.headers;

        const user = await User.findById(user_id);
        const findHouse = await House.findById(id);

        if(String(user._id) !== String(findHouse.user)){
            return res.status(401).json({error: 'Não autorizado'});
        }

        await House.findByIdAndDelete({_id: id});
        
        return res.json({message: 'Deletado com sucesso'});
    }
}

export default new HouseController();