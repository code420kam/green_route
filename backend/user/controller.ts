import express from 'express'
import { generateUserToken } from '../middleware/auth'
import UserSrvc, { User } from './service'

export default class UserCtrl {
    static async create(req: express.Request, res: express.Response): Promise<express.Response> {
        const user = {
            username: req.body.username,
            password: req.body.password,
        }
        const data = await UserSrvc.createUser(user)
        const token = await generateUserToken(user)
        res.header("authorization", token)
        console.log(token)
        console.log("data" ,data)
        return res.send(data)
    }
    // static async getUserId(req: express.Request, res: express.Response):Promise <express.Response>{

    // }
    static async userLogin(req: express.Request, res: express.Response): Promise<express.Response> {
        const user: User = {
            username: req.body.username,
            password: req.body.password,
        }
        if ((await UserSrvc.getPassword(user)) === null) {
            return res.status(401).send('Wrong Username or Password. Please try again')
        }
        const publicToken = await generateUserToken(user)
        res.header('authorization', publicToken)
        console.log('Successfull Login')
        return res.send(publicToken)
    }
}
