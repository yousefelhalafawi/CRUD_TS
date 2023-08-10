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
import { renderFormFields } from "./EditUserOptions"; 
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

interface RootState {
  auth: {
    token: string | null; // Adjust the type of 'token' based on its actual type
    accessCode:any| null;
    
  };
  options :{
    userOptions:any
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
  const { patchData } = usePatchRequest(`${BASE_URL}/users/` + id);
  const storedToken = useSelector((state: RootState) => state.auth.token);
  const accessCode = useSelector((state: RootState) => state.auth.accessCode);
  const userOptions = useSelector((state:RootState) => state.options.userOptions);



  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const middleNameRef = useRef<HTMLInputElement>(null);
  const thirdNameRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const subref = useRef<HTMLInputElement>(null);

  // Options state
  const [changes, setChanges] = useState(false);
  const [imageChanges, setImageChanges] = useState(false);

  // Fetch user data from the server
  const fetchUser = useCallback(() => {
    axios
      .get(`${BASE_URL}/users/` + id, {
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
  
  }, [imageChanges,fetchUser]);


  
  const handleSave = () => {
    // Check if any changes have been made before submitting
    if (changes === false) {
      toast.error("No changes made. Cannot save.");
      return;
    }

    const updatedData = {
      firstName: firstNameRef.current?.value || "",
      middleName: middleNameRef.current?.value || "",
      thirdName: thirdNameRef.current?.value || "",
      address: addressRef.current?.value || "",
    };

    patchData(updatedData)
      .then((res) => {
        toast.success("User Updated successfully");
        navigate("/Usersearch");
        handleEdit();
      })
      .catch((error) => {
        toast.error("Invalid editting data");
      });
  };

  const handleCancel = () => {
    navigate("/Usersearch");
    handleCancelEdit();
  };

  const handleUpdateImage = () => {
    if (
      fileRef.current &&
      fileRef.current.files &&
      fileRef.current.files.length > 0
    ) {
      const formData = new FormData();
      formData.append("image", fileRef.current.files[0]);
  
      const updatedData = {};
  
      formData.append("data", JSON.stringify(updatedData));
  
      axios
        .patch(`${BASE_URL}/users/uploadImage/` + id, formData, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then((response) => {
          setImageChanges(!imageChanges);
          setChanges(true);
          toast.success("Image updated successfully");
        })
        .catch((error) => {
          
          toast.error("Failed");
        });
    } else {
      toast.error("Please select an image to update.");
    }
  };
  

  // Get the ref for each input field
  const getInputRef = (name: string) => {
    switch (name) {
      case "firstName":
        return firstNameRef;
      case "middleName":
        return middleNameRef;
      case "thirdName":
        return thirdNameRef;
      case "address":
        return addressRef;
      default:
        return null;
    }
  };

  return user ? (
    <div className={styles.all2}>
      <Container>
        <div className={styles.parent}>
          <Image src={user.image} roundedCircle className={styles.userImage} key={uuidv4()}   onError={(e) => {
              e.currentTarget.src = "https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg"; // Set default image on error
            }} />

          {accessCode?.includes("userImage")&&<div className={styles.child}>
            <form onSubmit={(e)=>{e.preventDefault()}}>
              <input
                type="file"
                hidden
                name="image"
                className="btn m-0"
                ref={fileRef}
                onChange={() => {
                  subref.current?.click();
                  handleUpdateImage();
                }}
              />
              <input type="submit" hidden className="btn m-0" ref={subref} />

              <FontAwesomeIcon
                icon={faPen}
                onClick={() => {
                  fileRef.current?.click();
                }}
              />
            </form>
          </div>}
        </div>
      </Container>

      <Container className={styles.form}>
        <div className={styles.all}>
          <div className="row g-2">
            {/* Render the form fields */}
            {renderFormFields(
              user,
              JSON.parse(userOptions),
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
