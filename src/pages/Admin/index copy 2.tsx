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
  // const ref = React.useRef<HTMLFormElement>(null);
  const nameRef = React.useRef<HTMLInputElement>(null);
  const nicknameRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);

  // React.useEffect(() => {
  //   if (onEdit) {
  //     const user = ref.current;

  //     if (user) {
  //       user.name.value = onEdit.name;
  //       user.nickname.value = onEdit.nickname;
  //       user.email.value = onEdit.email;
  //     }
  //   }
  // }, [onEdit]);

  React.useEffect(() => {
    if (onEdit) {
      if (nameRef.current) {
        nameRef.current.value = onEdit.name;
      }
      if (nicknameRef.current) {
        nicknameRef.current.value = onEdit.nickname;
      }
      if (emailRef.current) {
        emailRef.current.value = onEdit.email;
      }
    }
  }, [onEdit]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const user = ref.current;

    // if (!user || !user.name || !user.nickname || !user.email) {
    //   return toast.error("Please fill all fields");
    // }

    const name = nameRef.current?.value;
    const nickname = nicknameRef.current?.value;
    const email = emailRef.current?.value;

    if (!name) {
      return toast.error("Please fill name");
    }

    if (!nickname) {
      return toast.error("Please fill nickname");
    }

    if (!email) {
      return toast.error("Please fill email");
    }

    if (!name || !nickname || !email) {
      return toast.error("Please fill all fields");
    }

    // if (onEdit) {
    //   await axios
    //     .put(`http://localhost:8800/${onEdit.id}`, {
    //       name: user.name.value,
    //       nickname: user.nickname.value,
    //       email: user.email.value,
    //     })
    //     .then(({ data }) => toast.success(data))
    //     .catch(({ data }) => {
    //       console.error(data);
    //       toast.error("Failed to update user");
    //     });
    // } else {
    //   await axios
    //     .post("http://localhost:8800", {
    //       name: user.name.value,
    //       nickname: user.nickname.value,
    //       email: user.email.value,
    //     })
    //     .then(({ data }) => {
    //       getUsers();
    //       toast.success(data);
    //     })
    //     .catch(({ data }) => {
    //       console.error(data);
    //       toast.error("Failed to create user");
    //     });
    // }

    // // Reset form fields
    // if (user.reset) {
    //   user.reset();
    // }

    if (onEdit) {
      await axios
        .put(`http://localhost:8800/${onEdit.id}`, {
          name,
          nickname,
          email,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => {
          console.error(data);
          toast.error("Failed to update user");
        });
    } else {
      await axios
        .post("http://localhost:8800", {
          name,
          nickname,
          email,
        })
        .then(({ data }) => {
          getUsers();
          toast.success(data);
        })
        .catch(({ data }) => {
          console.error(data);
          toast.error("Failed to create user");
        });
    }

    // Reset form fields
    e.currentTarget.reset();

    setOnEdit(null);
    getUsers();
  };

  return (
    // <FormControl component="form" ref={ref} onSubmit={handleSubmit}>
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
          <TextField id="name" label="Name" variant="outlined" required />
        </Grid>
        <Grid item>
          <TextField
            id="nickname"
            label="Nickname"
            variant="outlined"
            required
          />
        </Grid>
        <Grid item>
          <TextField
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            required
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
      setUsers(
        res.data.sort((a: { name: string }, b: { name: string }) =>
          a.name.localeCompare(b.name)
        )
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch users");
    }
  };

  React.useEffect(() => {
    getUsers();
  }, [setUsers]);

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
