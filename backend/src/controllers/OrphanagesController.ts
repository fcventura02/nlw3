import { Request, Response } from 'express';
import orphanageView from '../View/orphanages_view'

import { getRepository } from 'typeorm';
import Orphanage from '../model/Orphanage';

export default {
    async show(req: Request, res: Response) {
        const { id } = req.params
        const orphanagesRepository = getRepository(Orphanage);
        try {
            const orphanage = await orphanagesRepository.findOneOrFail(id,{
                relations: ['images']
            });
            return res.json(orphanageView.render(orphanage))
        } catch (error) {
            return res.status(400).json({ message: 'não foi possivel encontrar o orfanato.' })
        }
    },

    async indexedDB(req: Request, res: Response) {
        const orphanagesRepository = getRepository(Orphanage);
        const orphanages = await orphanagesRepository.find({
            relations: ['images']
        });
        return res.json(orphanageView.renderMany(orphanages))
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

        const reqImages = req.files as Express.Multer.File[];
        const images = reqImages.map(image=>{
            return{path: image.filename}
        })
        const orphanagesRepository = getRepository(Orphanage);
        const orphanage = orphanagesRepository.create({
            name,
            latitude,
            longetude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            images
        })

        await orphanagesRepository.save(orphanage)

        return res.status(201).json(orphanage)
    }
}