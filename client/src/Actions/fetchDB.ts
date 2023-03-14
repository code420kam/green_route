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
  console.log(reqObj);
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

export const getVehicleId = async (user_id: string | null) => {
  try {
    const res = await fetch(`http://localhost:8000/vehicle/${user_id}`);
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("Error ", error);
  }
};

export const getUserPassword = async (username: string, password: string) => {
  try {
    const reqObj = {
      username: username,
      password: password,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqObj),
    };
    const res = await fetch(`http://localhost:8000/login/login`, options);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getUsername = async  (userid: string) => {
  try {
    const res = await fetch(`http://localhost:8000/login/${userid}`);
    const data = await res.json()
    console.log("USERNAMEEE ", data);
    return data.username
  } catch (error) {
    
  }
}
