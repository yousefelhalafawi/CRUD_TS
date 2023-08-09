import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setAccessCode } from "../../stateManagment/authSlice";
import { useEffect } from "react";
import axios from "axios";
import { Card, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
function Home() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const dispatch = useDispatch();
  const { token } = useParams();

  const storedToken = useSelector((state: RootState) => state.auth.token);

  interface RootState {
    auth: {
      token: string;
    };
  }

  const accessCodes = useSelector(
    (state: RootAccessState) => state.auth.accessCode
  );
  interface RootAccessState {
    auth: {
      accessCode: string;
    };
  }
  const fetchAssetsCode = () => {
    axios
      .get(`${BASE_URL}/assets/getAccessCodes`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((response) => {
        dispatch(setAccessCode(response.data.result));
      })
      .catch((error) => {
        console.error("Error fetching :", error);
      });
  };

  useEffect(() => {
    if (token) {
      dispatch(setToken(token));
      fetchAssetsCode();
    }
    // fetchAssetsCode();
  }, [storedToken]);

  return (
    <div className="container mt-5">
      <h4>Welcome to Your Dashboard</h4>
  
      <Row>
        {accessCodes?.toString().includes("user") && (
          <Col sm={12} lg={4} md={6} className="my-4">
            <Card>
              <Card.Img
                variant="top"
                src="https://images.pexels.com/photos/8088443/pexels-photo-8088443.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Users"
                height="200"
              />
              <Card.Body>
                <Card.Title>Users</Card.Title>
                <Card.Text>Explore and manage users</Card.Text>
                <Card.Text>
                  <strong>your access:</strong>
                </Card.Text>
                {accessCodes?.includes("userCreate") && (
                  <Card.Text>
                    <FontAwesomeIcon
                      icon={faCheck}
                      size="xl"
                      className="mx-1"
                      style={{ color: "#004e00" }}
                    />{" "}
                    Create users
                  </Card.Text>
                )}
                {accessCodes?.includes("userFindById") && (
                  <Card.Text>
                    <FontAwesomeIcon
                      icon={faCheck}
                      size="xl"
                      className="mx-1"
                      style={{ color: "#004e00" }}
                    />
                    View user
                  </Card.Text>
                )}
                {accessCodes?.includes("userSearch") && (
                  <Card.Text>
                    <FontAwesomeIcon
                      icon={faCheck}
                      size="xl"
                      className="mx-1"
                      style={{ color: "#004e00" }}
                    />
                    search users
                  </Card.Text>
                )}
                {accessCodes?.includes("userUpdate") && (
                  <Card.Text>
                    <FontAwesomeIcon
                      icon={faCheck}
                      size="xl"
                      className="mx-1"
                      style={{ color: "#004e00" }}
                    />
                    Update user
                  </Card.Text>
                )}
                {accessCodes?.includes("userDelete") && (
                  <Card.Text>
                    <FontAwesomeIcon
                      icon={faCheck}
                      size="xl"
                      className="mx-1"
                      style={{ color: "#004e00" }}
                    />
                    Delete user
                  </Card.Text>
                )}

                <Link className="btn btn-dark p-3 w-75 ms-5" to="/Usersearch">
                  View
                </Link>
              </Card.Body>
            </Card>
          </Col>
        )}

        {accessCodes?.toString().includes("department") && (
          <Col sm={12} lg={4} md={6} className="my-4">
            <Card>
              <Card.Img
                variant="top"
                src="https://images.pexels.com/photos/396036/pexels-photo-396036.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Departments"
                height="200"
              />
              <Card.Body>
                <Card.Title>Departments</Card.Title>
                <Card.Text>Explore and manage departments</Card.Text>
                <Card.Text>
                  <strong>your access:</strong>
                </Card.Text>
                {accessCodes?.includes("departmentCreate") && (
                  <Card.Text>
                    <FontAwesomeIcon
                      icon={faCheck}
                      size="xl"
                      className="mx-1"
                      style={{ color: "#004e00" }}
                    />{" "}
                    Create departments
                  </Card.Text>
                )}
                {accessCodes?.includes("departmentFindById") && (
                  <Card.Text>
                    <FontAwesomeIcon
                      icon={faCheck}
                      size="xl"
                      className="mx-1"
                      style={{ color: "#004e00" }}
                    />
                    View departments
                  </Card.Text>
                )}
                {accessCodes?.includes("departmentSearch") && (
                  <Card.Text>
                    <FontAwesomeIcon
                      icon={faCheck}
                      size="xl"
                      className="mx-1"
                      style={{ color: "#004e00" }}
                    />
                    search departments
                  </Card.Text>
                )}
                {accessCodes?.includes("departmentUpdate") && (
                  <Card.Text>
                    <FontAwesomeIcon
                      icon={faCheck}
                      size="xl"
                      className="mx-1"
                      style={{ color: "#004e00" }}
                    />
                    Update departments
                  </Card.Text>
                )}
                {accessCodes?.includes("departmentDelete") && (
                  <Card.Text>
                    <FontAwesomeIcon
                      icon={faCheck}
                      size="xl"
                      className="mx-1"
                      style={{ color: "#004e00" }}
                    />
                    Delete departments
                  </Card.Text>
                )}
                
                <Link className="btn btn-dark p-3 w-75 ms-5" to="/DepartmentSearch">
                  View
                </Link>
              </Card.Body>
            </Card>
          </Col>
        )}

        {accessCodes?.toString().includes("project") && (
          <Col sm={12} lg={4} md={6} className="my-4">
            <Card>
              <Card.Img
                variant="top"
                src="https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Projects"
                height="200"
              />
              <Card.Body>
                <Card.Title>Projects</Card.Title>
                <Card.Text>Explore and manage projects</Card.Text>
                <Card.Text>
                  <strong>your access:</strong>
                </Card.Text>
                {accessCodes?.includes("projectCreate") && (
                  <Card.Text>
                    <FontAwesomeIcon
                      icon={faCheck}
                      size="xl"
                      className="mx-1"
                      style={{ color: "#004e00" }}
                    />{" "}
                    Create project
                  </Card.Text>
                )}
                {accessCodes?.includes("projectFindById") && (
                  <Card.Text>
                    <FontAwesomeIcon
                      icon={faCheck}
                      size="xl"
                      className="mx-1"
                      style={{ color: "#004e00" }}
                    />
                    View project
                  </Card.Text>
                )}
                {accessCodes?.includes("projectSearch") && (
                  <Card.Text>
                    <FontAwesomeIcon
                      icon={faCheck}
                      size="xl"
                      className="mx-1"
                      style={{ color: "#004e00" }}
                    />
                    search project
                  </Card.Text>
                )}
                {accessCodes?.includes("projectUpdateById") && (
                  <Card.Text>
                    <FontAwesomeIcon
                      icon={faCheck}
                      size="xl"
                      className="mx-1"
                      style={{ color: "#004e00" }}
                    />
                    Update project
                  </Card.Text>
                )}
                {accessCodes?.includes("projectDeleteById") && (
                  <Card.Text>
                    <FontAwesomeIcon
                      icon={faCheck}
                      size="xl"
                      className="mx-1"
                      style={{ color: "#004e00" }}
                    />
                    Delete project
                  </Card.Text>
                )}
                <Link className="btn btn-dark p-3 w-75 ms-5" to="/ProjectSearch">
                  View
                </Link>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    </div>
  );
}

export default Home;
