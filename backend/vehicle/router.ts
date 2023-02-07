import express from "express"
import VehicleCtrl from "./controller"

export default express.Router().post("/create", VehicleCtrl.create).get("/:user_id", VehicleCtrl.getId)