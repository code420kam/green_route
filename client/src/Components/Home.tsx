import React from "react"
import bigLogo from "../img/logolittle.png";
import Map from "./Map";
import "../home.css"
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getVehicleId } from "../Actions/fetchDB";
import { connect, MapStateToProps, useSelector } from "react-redux";
import { State } from "../redux/reducer";
interface PropsFromState {
    vehicle_id: number;
  }
const mapStateToProps: MapStateToProps<PropsFromState, {}, State> = (
    state
  ) => ({
    vehicle_id: state.vehicle_id,
  });

  
  const Home = (props: any) => {
      const store= useSelector((state) => state) as unknown as PropsFromState 
      console.log(store.vehicle_id)
      const navigate = useNavigate();
      const [currentVehicle, setCurrentVehicle] = React.useState([])
  
    const user_id = localStorage.getItem("user_id")
    interface VehicleData{
        vehicle_id_db: number,
        vehicle_id: number,
        driven_km: number,
        user_id: number,
        make: string,
        modell: string
    }
    const logoutHandle = () => {
        localStorage.clear()
        navigate("/")
        console.log("WAS GEHT")
    }
    console.log(localStorage.getItem("user_id"))
    React.useEffect(() => {
        const vehicle = async () => {
         const veh = await getVehicleId(user_id)
         setCurrentVehicle(veh)
         console.log("CURRENT", currentVehicle)
        }

        vehicle()
    }, [])
    return (
        <div className="container">
            <div className="heading"><img src={bigLogo} alt="logo"/></div>
            <div className="vehDetails">
                Vehicle Details
                {props.vehicle_id}
                <Button onClick={() => navigate("myvehicles")}>Show all Vehicles</Button>
            </div>
            <div className="userProfile"> user profile</div>
            <div className="mapContainer">
            <Map />
            </div>
            <div>
                <Button variant="outlined" type="submit" onClick={() => logoutHandle()}>Logout</Button>
            </div>
        </div>
    )
}

export default connect(mapStateToProps)(Home)