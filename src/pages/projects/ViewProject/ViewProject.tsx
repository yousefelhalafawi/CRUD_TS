import React, { useEffect, useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { User} from "../../../interfaces/interfaces";
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
  options :{
    projectOptions:any
  }
}

const ViewUserPage: React.FC<ViewUserPageProps> = ({ id }) => {
  const [user, setUser] = useState<User | null>(null);

  const storedToken = useSelector((state: RootState) => state.auth.token);
  const projectOptions = useSelector((state:RootState) => state.options.projectOptions);

  useEffect(() => {
    fetchUser();
  }, []);



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
        {renderViewFields(JSON.parse(projectOptions), user)}
      </div>
    
    </div>
  ) : (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <ClipLoader color="#000" size={150} />
    </div>
  );
};

export default ViewUserPage;
