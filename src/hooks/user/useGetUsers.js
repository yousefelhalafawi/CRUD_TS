import { useDispatch, useSelector } from "react-redux";
import {
  fetchUser,
  createUser,
  updateUser,
  deleteUser,
} from "../../store/user/getUserSlice";
import { useCallback } from "react";

export function useUsers() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.getUser.loading);
  const error = useSelector((state) => state.getUser.error);
  const userData = useSelector((state) => state.getUser.data);
  const storedToken = useSelector((state) => state.auth.token);

  const getUser = async (id) => {
    dispatch(fetchUser([id, storedToken]));
  };
  const addUser = useCallback(
    async (userData) => {
      dispatch(createUser[(userData, storedToken)]);
    },
    [dispatch]
  );

  const removeUser = useCallback(
    async (userId) => {
      dispatch(deleteUser([userId, storedToken]));
    },
    [dispatch]
  );

  return { userData, loading, error, getUser, addUser, removeUser };
}
