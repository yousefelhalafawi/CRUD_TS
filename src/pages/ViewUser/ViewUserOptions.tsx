import axios from "axios";
import { OptionsResponse, Attribute, User } from "../../interfaces/interfaces";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";

interface RootState {
  auth: {
    token: string; // Adjust this according to your actual state shape
  };
}



export const UseFetchOptions = async () => {
  try {
    const storedToken = useSelector((state: RootState) => state.auth.token);
    const BASE_URL = process.env.REACT_APP_BASE_URL;


    const response = await axios.get<OptionsResponse>(
      `${BASE_URL}/users/options`,
      {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      }
    );
    const attributes = response.data.result.attributes;
    return attributes;
  } catch (error) {
    console.error("Error fetching options:", error);
    return [];
  }
};

export const renderFormFields = (options: Attribute[], user: User | null) => {
  const rows: JSX.Element[] = [];
  options.forEach((attribute) => {
    const { name, type, options: attributeOptions } = attribute;
    const { label, controlType, values } = attributeOptions || {};

    // If the attribute has values, render it as a label-value pair
    if (values && user && user[name]) {
      rows.push(
        <Grid item xs={12} sm={4} key={name}>
          <Typography variant="body1">
            <strong>{label}:</strong> {user[name]}
          </Typography>
        </Grid>
      );
    } else if (
      name === "firstName" ||
      name === "middleName" ||
      name === "thirdName"
    ) {
      rows.push(
        <Grid item xs={12} sm={4} key={name}>
          <Typography variant="body1">
            <strong>{label}:</strong> {user ? user[name] : ""}
          </Typography>
        </Grid>
      );
    } else if (name === "birthDate") {
      const formattedDate = user
        ? new Date(user[name]).toLocaleDateString()
        : "";
      rows.push(
        <Grid item xs={12} sm={4} key={name}>
          <Typography variant="body1">
            <strong>{label}:</strong> {formattedDate}
          </Typography>
        </Grid>
      );
    }
  });
  return rows;
};
