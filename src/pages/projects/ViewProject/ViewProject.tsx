import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { User, Attribute ,OptionsResponse} from "../../../interfaces/interfaces";
import { useSelector } from "react-redux";

import { renderViewFields } from "./ViewProjectOptions"; // Import the functions from userUtils
const BASE_URL = process.env.REACT_APP_BASE_URL;

interface ViewUserPageProps {
  id: string;
}

interface RootState {
  auth: {
    token: string; // Adjust this according to your actual state shape
  };
}

const ViewUserPage: React.FC<ViewUserPageProps> = ({ id }) => {
  const [user, setUser] = useState<User | null>(null);
  const [options, setOptions] = useState<Attribute[]>([]);
  const navigate = useNavigate();
  const storedToken = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    fetchUser();
    UseFetchOptions().then((attributes) => setOptions(attributes));
  }, []);

  const UseFetchOptions = async () => {
    try {
      const response = await axios.get<OptionsResponse>(
        `${BASE_URL}/projects/options`,
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


  const fetchUser = () => {
    const headers = {
      Authorization: `Bearer ${storedToken}`,
    };
  
    axios
      .get(`${BASE_URL}/projects/` + id, { headers })
      .then((response) => {
        setUser(response.data.result.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  

  return user ? (
    <div className="container">
                <h2>Project Details</h2>

      <div className="row mt-4 fs-5">
        <div className="col-12">
        </div>
        {renderViewFields(options, user)}
      </div>
    
    </div>
  ) : (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <ClipLoader color="#000" size={150} />
    </div>
  );
};

export default ViewUserPage;
