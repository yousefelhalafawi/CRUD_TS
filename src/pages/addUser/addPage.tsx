import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserForm from "../../components/addUserForm/userform";
import styles from "./AddPage.module.css";
import { useDispatch } from "react-redux";
import { toggleRender } from "../../stateManagment/renderTableSlice";
type OnCloseModalType = () => void;

const AddPage: React.FC<{ onCloseModal: OnCloseModalType }> = ({ onCloseModal }) => {
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const dispatch = useDispatch();

  const handleSubmit = (formData: any) => {
    const form_data = new FormData();
    Object.keys(formData).map((key) => {
      form_data.append(key, formData[key]);
    });

    fetch(`${BASE_URL}/users/`, {
      method: "POST",
      body: form_data,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result) {
          toast.success("User added successfully");
          dispatch(toggleRender());
          onCloseModal()
          navigate("/");
        } else {
   
          toast.error("Error: " + data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={styles.all}>
      <UserForm onSubmit={handleSubmit} />
    </div>
  );
}

export default AddPage;
