import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserForm from "../../../components/addUserForm/userform";
import styles from "./AddPage.module.css";
import { useDispatch } from "react-redux";
import { toggleRender } from "../../../store/renderTableSlice";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useUsers } from "../../../hooks/user/useGetUsers";
import store from "../../../store/store";
interface RootState {
  auth: {
    token: string; // Adjust this according to your actual state shape
  };
}

type OnCloseModalType = () => void;

const AddPage: React.FC<{ onCloseModal: OnCloseModalType }> = ({
  onCloseModal,
}) => {
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const dispatch = useDispatch();
  const storedToken = useSelector((state: RootState) => state.auth.token);

  const { loading, error, addUser } = useUsers();

  const handleSubmit = async (formData: any) => {
    const form_data = new FormData();
    Object.keys(formData).map((key) => {
      form_data.append(key, formData[key]);
    });

    await addUser(form_data);
    if (error) {
      toast.error("Error: " + error);
    } else {
      toast.success("User added successfully");
      dispatch(toggleRender());
      onCloseModal();
    }

  
  };

  return (
    <div className={styles.all}>
      <UserForm onSubmit={handleSubmit} key={uuidv4()} />
    </div>
  );
};

export default AddPage;
