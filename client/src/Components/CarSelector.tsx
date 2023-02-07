import React from "react";
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Button,
} from "@mui/material";
import {
  fetchCars,
  fetchMakes,
  fetchModels,
  fetchYears,
} from "../Actions/getCarsApi";
import { fetchVehicle } from "../Actions/fetchDB";
import { useNavigate } from "react-router-dom";
import { connect, MapStateToProps, useDispatch } from "react-redux";
import { updateVehicle_id } from "../redux/actions";
import { State } from "../redux/reducer";

interface CarInterface {
  text: string;
  value: number;
}
interface PropsFromState {
  vehicle_id: number;
}
interface PropsFromDispatch {
  updateVehicle_id: typeof updateVehicle_id;
}
type AllProps = PropsFromState & PropsFromDispatch;

const mapStateToProps: MapStateToProps<PropsFromState, {}, State> = (
  state
) => ({
  vehicle_id: state.vehicle_id,
});

const CarSelector: React.FC<AllProps> = ({ vehicle_id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [years, setYears] = React.useState<number[]>([]);
  const [makes, setMakes] = React.useState([]);
  const [models, setModels] = React.useState([]);
  const [cars, setCars] = React.useState<CarInterface | CarInterface[]>([]);
  const [selectedYear, setSelectedYear] = React.useState("");
  const [selectedMake, setSelectedMake] = React.useState("");
  const [selectedModel, setSelectedModel] = React.useState("");
  const [selectedCar, setSelectedCar] = React.useState("");
  const [activateButton, setActivateButton] = React.useState(true);
  const correctUserdata = localStorage.getItem("user_data_complete");
  // clickhandler to send userdata & vehicle id to the server
  const clickHandler = () => {
    const user_id = localStorage.getItem("user_id");
    dispatch(updateVehicle_id(parseInt(selectedCar)));
    fetchVehicle(selectedCar, user_id);

    if (correctUserdata !== null) {
      return navigate("/home");
    }
  };
  React.useEffect(() => {
    // fetching data to get the vehicle id at the end
    const fetchData = async () => {
      const years = await fetchYears();
      setYears(years);
      if (selectedYear) {
        const makes = await fetchMakes(selectedYear);
        setMakes(makes);
      }
      if (selectedMake) {
        const models = await fetchModels(selectedYear, selectedMake);
        setModels(models);
      }
      if (selectedModel) {
        setActivateButton(false);
        console.log(selectedModel);
        const cars = await fetchCars(selectedYear, selectedMake, selectedModel);
        console.log(cars);
        setCars(cars);
      }
    };

    fetchData();
  }, [selectedYear, selectedMake, selectedModel, selectedCar]);
  return (
    <div>
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>Construction Year</InputLabel>
        <Select
          value={selectedYear}
          onChange={(e: any) => setSelectedYear(e.target.value)}
        >
          {years.map((year, index) => (
            <MenuItem key={index} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>Make</InputLabel>
        <Select
          value={selectedMake}
          onChange={(e: any) => setSelectedMake(e.target.value)}
        >
          {makes.map((make, index) => (
            <MenuItem key={index} value={make}>
              {make}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>Model</InputLabel>
        <Select
          value={selectedModel}
          onChange={(e: any) => setSelectedModel(e.target.value)}
        >
          {models.map((model, index) => (
            <MenuItem key={index} value={model}>
              {model}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>Car</InputLabel>
        <Select
          value={selectedCar}
          onChange={(e: any) => setSelectedCar(e.target.value)}
        >
          {Array.isArray(cars) ? (
            cars.map((car: CarInterface, index: number) => (
              <MenuItem key={index} value={car.value}>
                {car.text}
              </MenuItem>
            ))
          ) : (
            <MenuItem key={cars.value} value={cars.value}>
              {cars.text}
            </MenuItem>
          )}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={activateButton}
        onClick={() => clickHandler()}
      >
        Submit
      </Button>
    </div>
  );
};

export default connect(mapStateToProps, { updateVehicle_id })(CarSelector);