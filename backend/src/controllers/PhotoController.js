const connection = require('../database/connection')
const { where } = require('../database/connection')

module.exports = {
    async create(req, res) {
        const { photo_description, photo_topic, photo_user_id } = req.body
        const photo_image = req.file.filename
        const data = {
            photo_image,
            photo_description,
            photo_topic,
            photo_user_id
        }

        const response = await connection('photo').insert(data)
        return res.json(response)
    },
    async show(req, res) {
        const { photo_user_id, photo_description, photo_topic } = req.query

        var photos = ''

        if(photo_user_id) {
            photos = await connection('photo')
                .join('user', 'user.user_id', '=', 'photo.photo_user_id')
                .where('user_id', photo_user_id)
                .andWhere('photo_description', 'like', `%${photo_description}%`)
                .andWhere('photo_topic', 'like', `%${photo_topic}%`)
                .select('photo_id', 
                   'photo_image', 
                   'photo_description', 
                   'photo_topic',
                   'user_id',
                   'user_name',
                   'user_email',
                   'user_image'
                ).orderBy('photo_id', 'desc')
        }
        else {
            photos = await connection('photo')
               .join('user', 'user.user_id', '=', 'photo.photo_user_id')
               .where('photo_id', '>', 1)
               .andWhere('photo_description', 'like', `%${photo_description}%`)
               .orWhere('photo_topic', 'like', `%${photo_topic}%`)
               .select('photo_id', 
                   'photo_image', 
                   'photo_description', 
                   'photo_topic',
                   'user_id',
                   'user_name',
                   'user_email',
                   'user_image'
               ).orderBy('photo_id', 'desc')
        }

        if(!photos) {
            return res.json({ message: 'Not Photos.' })
        }

        const serialiedPhotos = photos.map(photo => {
            return {
                photo_id: photo.photo_id,
                photo_image: `http://seu_ip_local:3333/uploads_photo/${photo.photo_image}`,
                photo_description: photo.photo_description,
                photo_topic: photo.photo_topic,
                user_id: photo.user_id,
                user_name: photo.user_name,
                user_email: photo.user_email,
                user_image: `http://seu_ip_local:3333/uploads/${photo.user_image}`
            }
        })
        
        return res.json(serialiedPhotos)
    },

    async index(req, res) {
        const photos = await connection('photo')
        .join('user', 'user.user_id', '=', 'photo.photo_user_id')
        .select(
            'photo_id', 
            'photo_image', 
            'photo_description', 
            'photo_topic',
            'user_id',
            'user_name',
            'user_email',
            'user_image'
        ).orderBy('photo_id', 'desc')
        if(!photos) {
            return res.json({ message: 'Not Photos.' })
        }

        const serialiedPhotos = photos.map(photo => {
            return {
                photo_id: photo.photo_id,
                photo_image: `http://seu_ip_local:3333/uploads_photo/${photo.photo_image}`,
                photo_description: photo.photo_description,
                photo_topic: photo.photo_topic,
                user_id: photo.user_id,
                user_name: photo.user_name,
                user_email: photo.user_email,
                user_image: `http://seu_ip_local:3333/uploads/${photo.user_image}`
            }
        })
        
        return res.json(serialiedPhotos)
    }
}