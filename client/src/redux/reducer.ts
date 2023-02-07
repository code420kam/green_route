import { updateVehicle_id } from "./actions";

export interface State {
  vehicle_id: number;
}

const initialState: State = {
  vehicle_id: 0,
};

export const rootReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "UPDATE_VEHICLEID":
      return { ...state, vehicle_id: action.vehicle_id };
    default:
      return state;
  }
};
