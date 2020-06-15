const connection = require('../database/connection')
const generateUniqueId = require('../utils/generateUniqueId')
const bcrypt = require('bcrypt')
const gerenateToken = require('../utils/gerenateToken')
const { show } = require('./PhotoController')
const saltRounds = 10

module.exports = {
    async create(req, res) {
        const { user_name, user_email, user_password, user_whatsapp } = req.body
        const user_image = req.file.filename
        const hash = bcrypt.hashSync(user_password, saltRounds)
        const data = {
            user_name,
            user_email,
            user_password: hash,
            user_image,
            user_whatsapp
        }

        const findOne = await connection('user').where('user_email', user_email).select('*')

        if(findOne[0]) {
            res.json({ error: 'User already exists.' })
        }

        const response = await connection('user').insert(data)
        res.json(response)
    },

    async login(req, res) {
        const { user_password, user_email } = req.body
        
            const findOne = await connection('user')
                .where('user_email', user_email)
                .select('user_name', 'user_email', 'user_image', 'user_password', 'user_id', 'user_whatsapp')

            if(!JSON.stringify(findOne[0])) {
                return res.json({ error: 'User not found.' })
            }
            
            const hash = JSON.parse(JSON.stringify(findOne[0].user_password))
            
            if(!(bcrypt.compare(user_password, hash))) {
                return res.json({ error: 'Invalid password' })
            }

            const token = gerenateToken()
            const name = findOne[0].user_name
            const phone = findOne[0].user_whatsapp
            const id = findOne[0].user_id
            const URL_user_image = `http://seu_ip_local:3333/uploads/${findOne[0].user_image}`

            return res.json({
                id: id,
                user_email,
                phone,
                name,
                URL_user_image,
                token
            })      
       
    },

    async index(req, res) {
        const response = await connection('user').select('*')
        if(!response) return 'error'
        return res.json(response)
    },

    async show(req, res) {
        const user_id = req.params.user_id
        const response = await connection('user')
            .where('user_id', user_id)
            .select('user_name', 'user_image', 'user_email', 'user_whatsapp', 'user_id')
        if(!response) { res.json('Error') }

        const user_name = response[0].user_name
        const user_email = response[0].user_email
        const user_whatsapp = response[0].user_whatsapp
        const user_image = `http://seu_ip_local:3333/uploads/${response[0].user_image}`

        res.json({
            user_name,
            user_email,
            user_whatsapp,
            avatar: user_image
        })
    }
}