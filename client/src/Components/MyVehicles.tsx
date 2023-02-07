import { Paper, Table, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { getVehicleId } from "../Actions/fetchDB";


const MyVehicles = () => {
    const user_id = localStorage.getItem("user_id")
    if(user_id !== null){
        const vehicle_id = getVehicleId(user_id)
        console.log(vehicle_id)

    }

    return(
        <div>
            <h1>My Vehicles</h1>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Dessert</TableCell>
                            <TableCell align="right">Calories</TableCell>
                            <TableCell align="right">width</TableCell>
                            <TableCell align="right">height</TableCell>
                            <TableCell align="right">name</TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
            </TableContainer>
        </div>
    )
}

export default MyVehicles;