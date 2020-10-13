import { Request, Response } from 'express';
import orphanageView from '../View/orphanages_view';
import * as Yup from 'yup';

import { getRepository } from 'typeorm';
import Orphanage from '../model/Orphanage';

export default {
    async show(req: Request, res: Response) {
        const { id } = req.params
        const orphanagesRepository = getRepository(Orphanage);
        const orphanage = await orphanagesRepository.findOneOrFail(id, {
            relations: ['images']
        });
        return res.json(orphanageView.render(orphanage))
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
        const images = reqImages.map(image => {
            return { path: image.filename }
        })

        const data = {
            name,
            latitude,
            longetude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            images
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longetude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required()
                })
            )
        });
        await schema.validate(data, {
            abortEarly: false,
        })
        const orphanagesRepository = getRepository(Orphanage);
        const orphanage = orphanagesRepository.create(data)

        await orphanagesRepository.save(orphanage)

        return res.status(201).json(orphanage)
    }
}