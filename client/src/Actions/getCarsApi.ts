export const fetchYears = async () => {
  const url = "https://www.fueleconomy.gov/ws/rest/vehicle/menu/year";
  const options = { headers: { Accept: "application/json" } };
  try {
    const res = await fetch(url, options);
    const data = await res.json();
    return data.menuItem.map((year: any) => year.value);
  } catch (error) {
    console.error(error);
  }
};

export const fetchMakes = async (selectedYear: string) => {
  const url = `https://www.fueleconomy.gov/ws/rest/vehicle/menu/make?year=${selectedYear}`;
  const options = { headers: { Accept: "application/json" } };
  try {
    const res = await fetch(url, options);
    const data = await res.json();
    return data.menuItem.map((make: any) => make.value);
  } catch (error) {
    console.error(error);
  }
};

export const fetchModels = async (
  selectedYear: string,
  selectedMake: string
) => {
  const url = `https://www.fueleconomy.gov/ws/rest/vehicle/menu/model?year=${selectedYear}&make=${selectedMake}`;
  const options = { headers: { Accept: "application/json" } };
  try {
    const res = await fetch(url, options);
    const data = await res.json();
    console.log(data);
    return data.menuItem.map((model: any) => model.value);
  } catch (error) {
    console.error(error);
  }
};

export const fetchCars = async (
  selectedYear: string,
  selectedMake: string,
  selectedModel: string
) => {
  const arr = [];
  const url = `https://www.fueleconomy.gov/ws/rest/vehicle/menu/options?year=${selectedYear}&make=${selectedMake}&model=${selectedModel}`;
  const options = { headers: { Accept: "application/json" } };
  try {
    const res = await fetch(url, options);
    const data = await res.json();
    console.log("vehicle car", data.menuItem);
    if (data.menuItem.length > 1) {
      return data.menuItem.map((car: any) => car);
    }
    return data.menuItem;
  } catch (error) {
    console.error(error);
  }
};

export const fetchVehicleId = async (id: number) => {
  const options = { headers: { Accept: "application/json" } };
  const url = `https://www.fueleconomy.gov/ws/rest/vehicle/${id}`;
  try {
    const res = await fetch(url, options);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("No vehicle found!");
  }
};
