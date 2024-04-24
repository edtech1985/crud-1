import * as React from "react";
import "react-toastify/dist/ReactToastify.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { Button, Grid, Stack } from "@mui/material";
import { createSvgIcon } from "@mui/material/utils";
import GridTable from "../../components/GridTable";
import axios from "axios";
import { toast } from "react-toastify";

const PlusIcon = createSvgIcon(
  // credit: plus icon from https://heroicons.com/
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.5v15m7.5-7.5h-15"
    />
  </svg>,
  "Plus"
);

const UserForm = ({
  onEdit,
  setOnEdit,
  getUsers,
}: {
  onEdit: any;
  setOnEdit: any;
  getUsers: any;
}) => {
  const [name, setName] = React.useState("");
  const [nickname, setNickname] = React.useState("");
  const [email, setEmail] = React.useState("");

  React.useEffect(() => {
    if (onEdit) {
      setName(onEdit.name);
      setNickname(onEdit.nickname);
      setEmail(onEdit.email);
    }
  }, [onEdit]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !nickname || !email) {
      return toast.error("Please fill all fields");
    }

    try {
      if (onEdit) {
        await axios.put(`http://localhost:8800/${onEdit.id}`, {
          name,
          nickname,
          email,
        });
        toast.success("User updated successfully");
      } else {
        await axios.post("http://localhost:8800", { name, nickname, email });
        toast.success("User created successfully");
      }

      setOnEdit(null);
      getUsers();
      setName("");
      setNickname("");
      setEmail("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save user");
    }

    setOnEdit(null);
    getUsers();
  };

  return (
    <FormControl component="form" onSubmit={handleSubmit}>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <TextField
            sx={{ width: "100px" }}
            id="user_id"
            label="ID"
            variant="outlined"
            disabled
          />
        </Grid>
        <Grid item>
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField
            id="nickname"
            label="Nickname"
            variant="outlined"
            required
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Button variant="contained" color="primary" type="submit">
          Save
        </Button>
        <PlusIcon sx={{ cursor: "pointer" }} />
      </Grid>
    </FormControl>
  );
};

export default function Admin() {
  const [users, setUsers] = React.useState([]);
  const [onEdit, setOnEdit] = React.useState(null);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      setUsers(res.data.sort((a: any, b: any) => a.name.localeCompare(b.name)));
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch users");
    }
  };

  React.useEffect(() => {
    getUsers();
  }, []);

  return (
    <Stack
      direction="row"
      spacing={2}
      mt={20}
      bgcolor="yellow"
      sx={{ margin: 10 }}
    >
      <Box bgcolor="aqua">
        <UserForm onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
        <GridTable
          users={users}
          setUsers={setUsers}
          setOnEdit={setOnEdit}
          getUsers={getUsers}
        />
      </Box>
    </Stack>
  );
}
