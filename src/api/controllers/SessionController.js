// Metódos: index, show, update, store, destroy

/*
index: Listagem de sessões
show: Listagem de uma única sessão
store: Criação de uma sessão
update: Atualização de uma sessão
destroy: Remoção de uma sessão
*/

import User from "../../domain/models/User";
import *  as yup from 'yup';

class SessionController {
    async store(req, res)
    {
        const schema = yup.object().shape({
            email: yup.string().email().required(),
        });

        const { email } = req.body;

        if(!(await schema.isValid(req.body)))
        {
            return res.status(400).json({error: 'Falha na validação'});
        }
        // Validando se o usuário já existe
        let user = await User.findOne({email});

        // Se não existir, cria um novo usuário
        if (!user)
        {
            user = await User.create({email});
        }

        // Retornando o usuário
        return res.json(user);
    }
}

export default new SessionController();