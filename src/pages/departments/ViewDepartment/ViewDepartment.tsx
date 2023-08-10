import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { User, Attribute ,OptionsResponse} from "../../../interfaces/interfaces";
import { useSelector } from "react-redux";

import { renderViewFields } from "./ViewDepartmentOptions"; // Import the functions from userUtils
const BASE_URL = process.env.REACT_APP_BASE_URL;

interface ViewUserPageProps {
  id: string;
}

interface RootState {
  auth: {
    token: string; // Adjust this according to your actual state shape
  };
  options :{
    departmentOptions:any
  }
}

const ViewUserPage: React.FC<ViewUserPageProps> = ({ id }) => {
  const [user, setUser] = useState<User | null>(null);
  const storedToken = useSelector((state: RootState) => state.auth.token);
  const departmentOptions = useSelector((state:RootState) => state.options.departmentOptions);

  useEffect(() => {
    fetchUser();
  }, []);


 


  const fetchUser = () => {
    const headers = {
      Authorization: `Bearer ${storedToken}`,
    };
  
    axios
      .get(`${BASE_URL}/departments/` + id, { headers })
      .then((response) => {
        setUser(response.data.result.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  

  return user ? (
    <div className="container">
                <h2>department Details</h2>

      <div className="row mt-4 fs-5">
        <div className="col-12">
        </div>
        {renderViewFields(JSON.parse(departmentOptions), user)}
      </div>
    
    </div>
  ) : (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <ClipLoader color="#000" size={150} />
    </div>
  );
};

export default ViewUserPage;
