import { useEffect } from "react";

import { ClipLoader } from "react-spinners";
import { useSelector } from "react-redux";

import { renderViewFields } from "./ViewUserOptions"; // Import the functions from userUtils
import { useUsers } from "../../../hooks/user/useGetUsers";

const ViewUserPage = ({ id }) => {
  const userOptions = useSelector((state) => state.options.userOptions);

  const { userData, loading, error, getUser } = useUsers();

  useEffect(() => {
    getUser(id);
  }, []);

  return !error ? (
    loading ? (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <ClipLoader color="#000" size={150} />
      </div>
    ) : (
      <div className="container">
        <h2>User Details</h2>

        <div className="row mt-4 fs-5">
          <div className="col-12"></div>
          {renderViewFields(JSON.parse(userOptions), userData)}
        </div>
      </div>
    )
  ) : (
    <>failed to load data </>
  );
};

export default ViewUserPage;
