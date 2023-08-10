import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import styles from "./UserPage.module.css";
import { ClipLoader } from "react-spinners";
import { User, Attribute } from "../../../interfaces/interfaces";
import { useNavigate } from "react-router-dom";
import usePatchRequest from "../../../hooks/usePatchRequest";
import { UseFetchOptions, renderFormFields } from "./EditDepartmentOptions"; 
import { useSelector } from "react-redux";

interface RootState {
  auth: {
    token: string | null; // Adjust the type of 'token' based on its actual type
    accessCode:any| null
  };
  options :{
    departmentOptions:any
  }
}

const BASE_URL = process.env.REACT_APP_BASE_URL;
interface EditUserPageProps {
  id: string;
  handleCancelEdit: () => void;
  handleEdit: () => void;
}
const EditUserPage: React.FC<EditUserPageProps> = ({
  id,
  handleCancelEdit,
  handleEdit,
}) => {
  const { patchData } = usePatchRequest(`${BASE_URL}/departments/` + id);
  const storedToken = useSelector((state: RootState) => state.auth.token);
  const departmentOptions = useSelector((state:RootState) => state.options.departmentOptions);



  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const middleNameRef = useRef<HTMLInputElement>(null);
  const thirdNameRef = useRef<HTMLInputElement>(null);


  // Options state
  const [changes, setChanges] = useState(false);

  // Fetch user data from the server
  const fetchUser = useCallback(() => {
    axios
      .get(`${BASE_URL}/departments/` + id, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((response) => {
        setUser(response.data.result.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id, storedToken]);
  useEffect(() => {
    fetchUser();
   
  }, [fetchUser]);


  
  const handleSave = () => {
    // Check if any changes have been made before submitting
    if (changes === false) {
      toast.error("No changes made. Cannot save.");
      return;
    }

    const updatedData = {
      departmentName: firstNameRef.current?.value || "",
      managerName: middleNameRef.current?.value || "",
      employeesNumber: thirdNameRef.current?.value || "",
    };

    patchData(updatedData)
      .then((res) => {
        toast.success("Department Updated successfully");
        navigate("/DepartmentSearch");
        handleEdit();
      })
      .catch((error) => {
        toast.error("Invalid editting data");
      });
  };

  const handleCancel = () => {
    navigate("/DepartmentSearch");
    handleCancelEdit();
  };

 
  

  // Get the ref for each input field
  const getInputRef = (name: string) => {
    switch (name) {
      case "departmentName":
        return firstNameRef;
      case "managerName":
        return middleNameRef;
      case "employeesNumber":
        return thirdNameRef;
    
      default:
        return null;
    }
  };

  return user ? (
    <div className={styles.all2}>
      <Container>
        <div className={styles.parent}>
       
         
        </div>
      </Container>

      <Container className={styles.form}>
        <div className={styles.all}>
          <div className="row g-2">
            {/* Render the form fields */}
            {renderFormFields(
              user,
              JSON.parse(departmentOptions),
              getInputRef,
              setChanges,
              
            )}

            <div className="col-12 mb-5 d-flex justify-content-center">
              <button
                type="button"
                className="btn btn-primary w-50"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                type="button"
                className="btn btn-danger ms-1 w-auto"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  ) : (
    <div className={styles.test2}>
      <ClipLoader color="#000" size={150} />
    </div>
  );
};

export default EditUserPage;
