import { useParams, useNavigate } from "react-router-dom";

import { useEffect } from "react";

function DefaultComponent() {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/home" + token);
    } else {
      window.location.replace("http://localhost:3001/");
    }
  }, [token, navigate]);
  return <></>;
}

export default DefaultComponent;
