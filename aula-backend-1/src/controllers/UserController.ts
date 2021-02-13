import { Request, Response } from 'express';
import { FindOperator, getRepository } from 'typeorm';
import User from '../models/User';
        
export default {
    async index(req: Request, res: Response) {
        const userRepository = getRepository(User);

        const user = await userRepository.find();

        return res.json(user);        
    },
    async show(req: Request, res: Response) {
        const { id } = req.params;

        try{ 
            const user = await getRepository(User).findOneOrFail(id);

            return res.json(user);
        } catch (err) {
            return res.status(404).send();
        }

    },
    async create(req: Request, res: Response) {
        const { nome, salario } = req.body;

        const userRepository = getRepository(User);

        const user = userRepository.create({
            nome, salario
        });

        await userRepository.save(user);

        return res.status(201).json(user);

    },
}