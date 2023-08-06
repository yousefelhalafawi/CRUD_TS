import React, { useEffect, useState } from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import styles from "./ViewUser.module.css";
import { User, Attribute, OptionsResponse } from "../../interfaces/interfaces";
import { UseFetchOptions, renderFormFields } from "./ViewUserOptions"; // Import the functions from userUtils
const BASE_URL = process.env.REACT_APP_BASE_URL;
interface ViewUserPageProps {
  id: string;
}
const ViewUserPage: React.FC<ViewUserPageProps> = ({ id }) => {
  const [user, setUser] = useState<User | null>(null);
  const [options, setOptions] = useState<Attribute[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
    UseFetchOptions().then((attributes) => setOptions(attributes));
  }, []);

  const handleEditClick = () => {
    navigate(`/user/` + user?._id);
  };

  const fetchUser = () => {
    axios
      .get(`${BASE_URL}/users/` + id)
      .then((response) => {
        setUser(response.data.result.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return user ? (
    <Box className={styles.container}>
      <Paper className={styles.paper}>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="h6">User Details</Typography>
          </Grid>
          <Grid item xs={12} textAlign="center">
            <img src={user.image} alt="User" className={styles.img} />
          </Grid>
          {renderFormFields(options, user)}{" "}
          {/* Pass options and user as arguments */}
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Email:</strong> {user.email}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Address:</strong> {user.address}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>SSN:</strong> {user.ssn}
            </Typography>
          </Grid>
        </Grid>
        {/* <Button
          type="primary"
          className={styles.btn}
          icon={<EditOutlined />}
          onClick={handleEditClick}
        >
          Edit
        </Button> */}
      </Paper>
    </Box>
  ) : (
    <div className={styles.test2}>
      <ClipLoader color="#000" size={150} />
    </div>
  );
};

export default ViewUserPage;
