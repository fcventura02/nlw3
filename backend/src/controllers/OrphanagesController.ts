import { Request, Response } from 'express';

import { getRepository } from 'typeorm';
import Orphanage from '../model/Orphanage';

export default {
    async show(req: Request, res: Response) {
        const { id } = req.params
        const orphanagesRepository = getRepository(Orphanage);
        try {
            const orphanage = await orphanagesRepository.findOneOrFail(id);
            return res.json(orphanage)
        } catch (error) {
            return res.status(400).json({ message: 'não foi possivel encontrar o orfanato.' })
        }
    },

    async indexedDB(req: Request, res: Response) {
        const orphanagesRepository = getRepository(Orphanage);
        const orphanages = await orphanagesRepository.find();
        return res.json(orphanages)
    },

    async create(req: Request, res: Response) {
        const {
            name,
            latitude,
            longetude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        } = req.body

        const orphanagesRepository = getRepository(Orphanage);
        const orphanage = orphanagesRepository.create({
            name,
            latitude,
            longetude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        })

        await orphanagesRepository.save(orphanage)

        return res.status(201).json({ ok: "true" })
    }
}