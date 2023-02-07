import express from "express"
import VehicleSrvc from "./service"

export default class VehicleCtrl{
    static async create(req: express.Request, res: express.Response) :Promise<express.Response>{
        console.log(req.body)
        await VehicleSrvc.registerVehicle(req.body.vehicle_id, req.body.user_id)
        // console.log(res)
        return res.status(200)
    }
    static async getId(req:express.Request, res:express.Response):Promise<express.Response>{
        console.log(req.params)
        const data = await VehicleSrvc.getVehicleId(req.params.user_id)
        // console.log("data",data)
        return res.status(200).send(data)
    }
}