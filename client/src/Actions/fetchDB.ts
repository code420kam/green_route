interface UserID {
  count: string;
}
export const fetchNewUser = async (data: any): Promise<UserID | undefined> => {
  let returnData;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  await fetch("http://localhost:8000/register/create", options)
    .then((res) => res.json())
    .then((res) => {
      console.log(res.headers);
      returnData = res;
    })
    .catch((error: any) => console.log("err", error));
  if (returnData !== undefined) {
    return returnData;
  } else return returnData;
};

export const getUserData = async (data: any) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  await fetch("http://localhost:8000/");
};

export const fetchVehicle = async (vehicle_id: any, user_id: string | null) => {
  if (user_id !== null) {
    parseInt(user_id);
  }
  const reqObj = {
    vehicle_id: vehicle_id,
    user_id: user_id,
  };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqObj),
  };
  await fetch("http://localhost:8000/vehicle/create", options)
    .then((res) => {
      if (res.ok) {
        res.json();
      } else console.log(res);
    })
    .then((res) => {
      // VehicleSrvc.registerVehicle
      console.log("Successfull data uploaded " + res);
    });
};

export const getVehicleId = async (user_id: string | null): Promise<[]> => {
  let data: any = [];
  const options = {
    method: "GET",
    headeres: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user_id),
  };
  await fetch(`http://localhost:8000/vehicle/${user_id}`)
    .then((res) => res.json())
    .then((res) => (data = res));
  return data;
};
