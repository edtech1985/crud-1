import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast } from "react-toastify";

export default function GridTable(props: {
  users: any[];
  setUsers: any;
  setOnEdit: any;
  getUsers: () => void;
}) {
  const { users, setUsers, setOnEdit } = props;

  const handleDelete = async (id: number) => {
    await axios
      .delete(`http://localhost:8800/${id}`)
      .then(({ data }) => {
        const newArray: { id: number }[] = users.filter(
          (user) => user.id !== id
        );

        setUsers(newArray);
        toast.success(data);
      })
      .catch(({ data }) => {
        console.error("data", data);
        toast.error("Failed to delete user");
      });

    setOnEdit(null);
  };

  const handleEdit = (user: any) => {
    setOnEdit(user);
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 10 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">ID</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Username</TableCell>
            <TableCell align="left">Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user: any, i: number) => (
            <TableRow
              key={user.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">{user.id}</TableCell>
              <TableCell align="left">{user.name}</TableCell>
              <TableCell align="left">{user.nickname}</TableCell>
              <TableCell align="left">{user.email}</TableCell>

              <FontAwesomeIcon
                icon={faEdit}
                cursor= "pointer"
                onClick={() => handleEdit(user)}
              />

              <DeleteRoundedIcon
                sx={{ cursor: "pointer" }}
                onClick={() => handleDelete(user.id)}
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
