import express from 'express'
import { generateUserToken } from '../middleware/auth'
import UserSrvc, { User } from './service'
import jwt from 'jsonwebtoken'

export default class UserCtrl {
    static async create(req: express.Request, res: express.Response): Promise<express.Response> {
        const user = {
            username: req.body.username,
            password: req.body.password,
        }
        const data = await UserSrvc.createUser(user)
        const token = await generateUserToken(user)
        res.header('authorization', token)
        console.log(token)
        console.log('data', data)
        return res.send(data)
    }
    // static async getUserId(req: express.Request, res: express.Response):Promise <express.Response>{

    // }
    static async userLogin(req: express.Request, res: express.Response): Promise<express.Response> {
        const user: User = {
            username: req.body.username,
            password: req.body.password,
        }
        const dd = null
        console.log("KAMIL " ,await UserSrvc.getPassword(user))
        if ((await UserSrvc.getPassword(user)) === null) {
            return res.status(401).json({message:"Wrong Username or Password", token: null})
        }
        const publicToken = await generateUserToken(user)
        const token = jwt.decode(publicToken)
        let user_id;
if (token) {
  user_id = typeof token === 'string' ? token : token.id;
}

        res.header('authorization', publicToken)
        console.log('Successfull Login')
        return res.status(200).json({message: 1, user_id: user_id})
    }
}
