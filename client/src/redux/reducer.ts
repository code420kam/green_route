export interface State {
  vehicle_id: number;
}

const initialState: State = {
  vehicle_id: 0,
};

// trying to get actual_vehicle from localstorage if its exists
const storedState = localStorage.getItem('actual_vehicle');
const persistedState = storedState ? JSON.parse(storedState) : {};

export const rootReducer = (state = { ...initialState, ...persistedState }, action: any) => {
  switch (action.type) {
    case "UPDATE_VEHICLEID":
      localStorage.setItem('actual_vehicle', JSON.stringify({ vehicle_id: action.vehicle_id }));
      return { ...state, vehicle_id: action.vehicle_id };
    default:
      return state;
  }
};
