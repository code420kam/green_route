import Client from '../db'
import bcrypt from 'bcrypt'

export type User = {
    username: string
    password: string
}

export default class UserSrvc {
    static async createUser(user: User): Promise<string | string[]> {
        try {
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hashSync(user.password + process.env.SECRET_PW, salt)
            const sql = `INSERT INTO users(username, password) VALUES ('${user.username}', '${hash}')`
            const result = await Client.query(sql)
            const sqlSec = `SELECT COUNT (username) FROM users`
            const newRes = await Client.query(sqlSec)
            console.log(hash)
            return newRes.rows[0]
        } catch (error) {
            return 'Username already exists. Please choose another.'
        }
    }
    
    static async getPassword(user: User): Promise<User | null> {
        const sql = `SELECT password FROM users WHERE(username='${user.username}')`
        const result = await Client.query(sql)
        const pw = user.password + process.env.SECRET_PW
        try {
            if (bcrypt.compareSync(pw, result.rows[0].password)) {
                return user
            }
        } catch (error) {
            return null
        }
        return null
    }

    // static async getUserId():Promise<number | null>{
    //     const sql = `SELECT user_id FROM users WHERE(username='${}')`
    // }

}

