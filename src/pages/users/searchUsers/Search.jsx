import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Button, Modal, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import TableComponent from "./TableComponent";
import PaginationComponent from "./PaginationComponent";
import FormInputs from "./FormInputs";
import AddPage from "../addUser/addPage";
import { useDispatch } from "react-redux";
import { toggleRender } from "../../../store/renderTableSlice";

import { Dropdown, Form } from "react-bootstrap";
import TableListComponent from "./tableListComponent";
import { useUsers } from "../../../hooks/user/useGetUsers";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Search = () => {
  const [addModalShow, setAddModalShow] = useState(false);
  const [loadingSearsh, setLoadingSearsh] = useState(true);
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState({});
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [count, setCount] = useState(1);
  const [total, setTotal] = useState(null);
  const [sortArr, setSortArr] = useState([]);
  const [dataList, setDataList] = useState([]);
  const dispatch = useDispatch();

  const renderState = useSelector((state) => state.tableRender.render);
  const handleCloseModal = () => {
    setAddModalShow(false);
  };

  const userOptions = useSelector((state) => state.options.userOptions);
  const storedToken = useSelector((state) => state.auth.token);
  const accessCodes = useSelector((state) => state.auth.accessCode);

  const { loading, error, removeUser } = useUsers();

  useEffect(() => {
    if (!accessCodes?.includes("userSearch")) {
      fetchDataList();
    }
  }, []);

  const tableHeaders = [
    { key: "firstName", label: "First Name" },
    { key: "middleName", label: "Middle Name" },
    { key: "thirdName", label: "Third Name" },
    { key: "email", label: "Email" },
    { key: "ssn", label: "SSN" },
    { key: "gender", label: "Gender" },
    { key: "actions", label: "Actions" },
  ];
  const fetchDataList = () => {
    setLoadingSearsh(true);
    axios
      .get(`${BASE_URL}/users?s=100`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((response) => {
        setDataList(response.data.result.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoadingSearsh(false);
      });
  };

  const [headerVisibility, setHeaderVisibility] = useState(() => {
    const initialVisibility = {};
    tableHeaders.map((header) => {
      initialVisibility[header.key] = true; // Initialize all headers as visible
    });
    return initialVisibility;
  });

  const toggleAllHeadersVisibility = () => {
    const newVisibility = {};
    Object.keys(headerVisibility).map((headerKey) => {
      newVisibility[headerKey] = !headerVisibility["actions"];
    });
    setHeaderVisibility(newVisibility);
  };

  const handleHeaderCheckboxChange = (headerKey) => {
    setHeaderVisibility((prevVisibility) => ({
      ...prevVisibility,
      [headerKey]: !prevVisibility[headerKey],
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilterData({
      ...filterData,
      [name]: value,
    });
  };

  const handelSort = (key) => {
    if (sortArr?.includes(key)) {
      const updatedSortArr = sortArr.filter((item) => item !== key);
      setSortArr([...updatedSortArr, `-${key}`]);
    } else if (sortArr?.includes(`-${key}`)) {
      const updatedSortArr = sortArr.filter((item) => item !== `-${key}`);
      setSortArr([...updatedSortArr, key]);
    } else {
      setSortArr([...sortArr, key]);
    }
  };

  const fetchData = (filterDataObj = {}) => {
    setLoadingSearsh(true);

    const headers = {
      Authorization: `Bearer ${storedToken}`,
    };

    const axiosInstance = axios.create({
      baseURL: BASE_URL,
    });

    axiosInstance.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const currentPage = page; // Store current page value in a local variable
    const currentPerPage = perPage; // Store current perPage value in a local variable
    const currentSortArr = sortArr.slice(); // Create a copy of the sortArr to avoid modification

    axiosInstance
      .post(
        `/users/search?s=${currentPerPage}&p=${currentPage}&sort=${currentSortArr.join(
          " "
        )}`,
        filterDataObj,
        { headers }
      )
      .then((res) => {
        setData(res.data.result.data);
        setCount(res.data.result.pagesCount);
        setTotal(res.data.result.total);
        setLoadingSearsh(false);
      })
      .catch((err) => {
        setLoadingSearsh(false);
      });
  };

  useEffect(() => {
    if (accessCodes?.includes("userSearch")) {
      fetchData(filterData);
    }
  }, [page, perPage, sortArr, renderState]);

  const handleDelete = async (id) => {
    await removeUser(id);
    if (error) {

      toast.error("error");
    } else {

      toast.success("User deleted successfully");
      dispatch(toggleRender());
    }
   
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    fetchData(filterData);
  };

  const handleResetClick = () => {
    setFilterData({});
    fetchData();
  };

  const handelPageRow = (e) => {
    setPerPage(e);
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };

  const onCLickPage = (e) => {
    setPage(e);
  };

  return (
    <>
      <div className="px-5">
        <div className="d-flex justify-content-between">
          <h1>User Control</h1>
          <div>
            {accessCodes?.includes("userCreate") && (
              <Button
                variant="primary"
                className="mx-1"
                onClick={() => setAddModalShow(true)}
              >
                Add user
              </Button>
            )}
          </div>
        </div>
        {!accessCodes?.includes("userSearch") && (
          <>
            {loadingSearsh && (
              <Spinner
                style={{ width: "200px", height: "200px" }}
                animation="border"
                variant="primary"
              />
            )}
            {!loadingSearsh && <TableListComponent data={dataList} />}{" "}
          </>
        )}
        {accessCodes?.includes("userSearch") && (
          <div>
            <FormInputs
              handleSearchClick={handleSearchClick}
              handleInputChange={handleInputChange}
              handleResetClick={handleResetClick}
              filterData={filterData}
              attributes={JSON.parse(userOptions)}
            />

            <div className="mb-2">
              <Dropdown>
                <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                  Select Columns
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Form.Check
                    className="m-3"
                    type="checkbox"
                    id="toggleAllHeaders"
                    label="All Headers"
                    checked={Object.values(headerVisibility).every(Boolean)}
                    onChange={toggleAllHeadersVisibility}
                  />
                  {tableHeaders.map((header) => {
                    if (header.key === "actions") {
                      return null;
                    }
                    return (
                      <Form.Check
                        key={header.key}
                        className="m-3"
                        type="checkbox"
                        id={header.key}
                        label={header.label}
                        checked={headerVisibility[header.key]}
                        onChange={() => handleHeaderCheckboxChange(header.key)}
                      />
                    );
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        )}

        {/* check access code after or before loadingSearsh */}
        {loadingSearsh && accessCodes?.includes("userSearch") ? (
          <div
            style={{ height: "600px" }}
            className="d-flex justify-content-center align-items-center"
          >
            <Spinner
              style={{ width: "200px", height: "200px" }}
              animation="border"
              variant="primary"
            />
          </div>
        ) : data.length > 0 ? (
          <>
            {/* <p className="m-0">You can sort rows based on clicking table header</p> */}
            <TableComponent
              data={data}
              onDelete={handleDelete}
              handelSort={handelSort}
              sortArr={sortArr}
              tableHeaders={tableHeaders.filter(
                (header) => headerVisibility[header.key]
              )}
            />
            <PaginationComponent
              page={page}
              count={count}
              nextPage={nextPage}
              prevPage={prevPage}
              onCLickPage={onCLickPage}
              handelPageRow={handelPageRow}
              perPage={perPage}
              total={total}
            />
          </>
        ) : (
          <></>
          // <h1>No Data found</h1>
        )}
        <Modal
          size="lg"
          show={addModalShow}
          onHide={() => setAddModalShow(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddPage onCloseModal={handleCloseModal} />
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default Search;
