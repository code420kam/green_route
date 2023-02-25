import Client from "../db";

export default class VehicleSrvc{
    static async registerVehicle(vehicle_id: number, user_id: number):Promise<string| string[]>{
        try {
            const timestamp = Date.now()
            const date = new Date(timestamp)
            const sql = `INSERT INTO vehicle(vehicle_id, driven_km, created_on, user_id) VALUES ('${vehicle_id}', '0', '${date.toDateString()}', '${user_id}');`
            const result = await Client.query(sql)
            console.log("INSERT")
            console.log(result.rows)
            return result.rows
        } catch (error) {
            return "Vehicle already exists."
        }
    }
    static async getVehicleId(user_id:string):Promise<string |string[]>{
        try {
            console.log(user_id)
            const sql = `SELECT * FROM vehicle WHERE(user_id=${user_id})`
            const result = await Client.query(sql)
            console.log(result.rows)
            return result.rows
        } catch (error) {
            return "There are no Vehicles"
        }
    }
}