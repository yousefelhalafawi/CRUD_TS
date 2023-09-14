import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserForm from "../../../components/addDepartmentsForm/userform";
import styles from "./AddPage.module.css";
import { useDispatch } from "react-redux";
import { toggleRender } from "../../../store/renderTableSlice";
import { useSelector } from "react-redux";
import axios from "axios";

interface RootState {
  auth: {
    token: string; 
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

  const handleSubmit = (formData: any) => {
    const headers = {
      Authorization: `Bearer ${storedToken}`,
    };

    axios
      .post(`${BASE_URL}/departments/`, formData, { headers })
      .then((response) => {
        toast.success("Department added successfully");
        dispatch(toggleRender());
        onCloseModal();
        navigate(`/DepartmentSearch`);
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
};

export default AddPage;
