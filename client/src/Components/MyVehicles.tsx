import { Add, Home } from "@mui/icons-material";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { getVehicleId } from "../Actions/fetchDB";
import React from "react";
import { fetchVehicleId } from "../Actions/getCarsApi";
import { MyVehiclesListObj, Data } from "../Actions/interfaces";
import { useNavigate } from "react-router-dom";
import { calculateFuelConsumption } from "../Actions/helpers";

const MyVehicles = () => {
  const navigate = useNavigate();
  const user_id = localStorage.getItem("user_id");
  const [myVehiclesListObj, setMyVehiclesListObj] = React.useState<
    MyVehiclesListObj[]
  >([]);
  const [status, setStatus] = React.useState<Promise<[]>>(async () => {
    const data = await getVehicleId(user_id);
    return data;
  });

  React.useEffect(() => {
    async function fetchData() {
      const data = await status;
      const newObj = await Promise.all(
        data.map(async (datei: Data) => {
          console.log(datei.vehicle_id, datei.vehicle_id_db);
          const res = await fetchVehicleId(datei.vehicle_id);
          const finalData: {
            driven_km: number;
            vehicle_id: number;
            make: string;
            comb08: number;
            co2: number;
            model: string;
            created_on: Date;
            fuelType1: string;
          } = {
            driven_km: datei.driven_km,
            vehicle_id: datei.vehicle_id,
            make: res.make,
            comb08: res.comb08,
            co2: res.co2,
            model: res.model,
            created_on: datei.created_on,
            fuelType1: res.fuelType1,
          };
          return finalData;
        })
      );
      console.log(newObj);
      setMyVehiclesListObj(newObj);
    }
    fetchData();
  }, []);

  const addVehicle = () => {
    const params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
      width=620,height=320,left=100,top=100`;
    window.open("http://localhost:3000/home/addvehicle", "window", params);
  };

  return (
    <div>
      <h1>My Vehicles</h1>
      <Button startIcon={<Add />} onClick={() => addVehicle()}>
        Add Vehicle
      </Button>
      <Button startIcon={<Home />} onClick={() => navigate("/home")}>
        Home
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Make</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Fuel Type</TableCell>
              <TableCell>Fuel Consumption</TableCell>
              <TableCell>CO2 Emissions</TableCell>
              <TableCell>Driven KM</TableCell>
              <TableCell>Created On</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {myVehiclesListObj.map((data) => {
              const fuelConsumption = calculateFuelConsumption(data.comb08);
              return (
                <TableRow key={data.vehicle_id}>
                  <TableCell>{data.make}</TableCell>
                  <TableCell>{data.model}</TableCell>
                  <TableCell>{data.fuelType1}</TableCell>
                  <TableCell>{fuelConsumption} l/100 km</TableCell>
                  <TableCell>{data.co2}</TableCell>
                  <TableCell>{data.driven_km}</TableCell>
                  <TableCell>
                    {new Date(data.created_on).toLocaleDateString("de-DE")}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MyVehicles;
