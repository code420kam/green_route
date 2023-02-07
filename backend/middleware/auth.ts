import jwt from 'jsonwebtoken'
import 'dotenv/config'
import express from 'express'
import bcrypt from 'bcrypt'
import Client from '../db'

export async function auth(req: express.Request, res: express.Response, next: express.NextFunction) {
    const token = req.header('Authorization')
    const secret = process.env.SECRET_PW
    if (!token) {
        return res.status(401).send('Access denied. No token provided!')
    }
    if (secret)
        try {
            const verify = jwt.verify(token, secret)
            res.header(verify)
            next()
        } catch (error) {
            res.status(401).send('Token is expired please login again.')
            next()
        }
}
export async function accessHeader(req: express.Request, res: express.Response, next: express.NextFunction) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    // Pass to next layer of middleware
    next()
}

export const generateUserToken = async (user: any): Promise<string> => {
    const secret = process.env.SECRET_PW
    if (secret) {
        const pwReq = `SELECT password FROM users WHERE (username='${user.username}')`
        const res = await Client.query(pwReq)
        const pw = user.password + secret
        if (bcrypt.compareSync(pw, res.rows[0].password)) {
            const sql = `SELECT * FROM users WHERE (username='${user.username}')`
            const query = await Client.query(sql)
            const id = query.rows[0].user_id
            return jwt.sign(
                {
                    id: id,
                    username: user.username,
                },
                secret,
                { expiresIn: '6000000' }
            )
        } else {
            return 'invalid password!'
        }
    } else {
        return 'invalid secret'
    }
}
