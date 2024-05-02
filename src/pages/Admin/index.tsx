import * as React from "react";
import "react-toastify/dist/ReactToastify.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { Grid, Stack } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import GridTable from "../../components/GridTable";
import axios from "axios";
import { toast } from "react-toastify";

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
  const [id, setId] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (onEdit) {
      setName(onEdit.name);
      setNickname(onEdit.nickname);
      setEmail(onEdit.email);
      setId(onEdit.id);
    }
  }, [onEdit]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !nickname || !email) {
      return toast.error("Please fill all fields");
    }

    setLoading(true);

    if (onEdit) {
      await axios.put(`http://localhost:8800/${onEdit.id}`, {
        name,
        nickname,
        email,
        id,
      });
      setTimeout(() => {
        setLoading(false);
        toast.success("User updated successfully");
      }, 1000);
    } else {
      await axios
        .post("http://localhost:8800", {
          name,
          nickname,
          email,
        })
        .then(({ data }) => {
          setTimeout(() => {
            setLoading(false);
            toast.success(data);
          }, 1000);
        })
        .catch(({ data }) => {
          setTimeout(() => {
            setLoading(false);
            toast.error(data);
          }, 1000);
        });
    }

    setOnEdit(null);
    getUsers();
    setName("");
    setNickname("");
    setEmail("");
    setId("");
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
            value={id}
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
      </Grid>
      <Box
        
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          mt: 2,
        }}
      >
        <LoadingButton
          variant="contained"
          color="primary"
          type="submit"
          loading={loading}
          loadingPosition="start"
          startIcon={<SaveIcon />}
        >
          Save
        </LoadingButton>
      </Box>
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
      margin={10}
      width="full"
    >
      <Box width="100%" >
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
