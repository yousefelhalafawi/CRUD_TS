import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../store/user/editUserSlice";
import { toast } from "react-toastify";
import { toggleRender } from "../../store/renderTableSlice";

export function useUpdateUser() {
  const dispatch = useDispatch();
  const loadingUpdate = useSelector((state) => state.editUser.loading);
  const errorUpdate = useSelector((state) => state.editUser.error);
  const check = useSelector((state) => state.editUser.check);
  const storedToken = useSelector((state) => state.auth.token);
  const updateUserByID = (userId, userData) => {
    dispatch(updateUser([userId, userData, storedToken]))
      .unwrap()
      .then(() => {
        toast.success("User Updated successfully");
        dispatch(toggleRender());
      })
      .catch((error) => {
        toast.error("Wrong data");
      });
  };

  return { loadingUpdate, errorUpdate, check, updateUserByID };
}
