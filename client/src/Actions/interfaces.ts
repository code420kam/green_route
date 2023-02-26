export interface incomingData {
  comb08: number;
  cylinders: number;
  model: string;
  make: string;
  year: number;
  co2: number;
  fuelType1: string;
}

export interface MyVehiclesListObj {
  driven_km: number;
  vehicle_id: number;
  make: string;
  comb08: number;
  co2: number;
  model: string;
  created_on: Date;
  fuelType1: string;
}

export interface Data {
  vehicle_id_db:number,
  vehicle_id: number,
  driven_km: number,
  created_on: Date,
  user_id:number,
}
 export interface PropsFromState {
  vehicle_id: number;
}