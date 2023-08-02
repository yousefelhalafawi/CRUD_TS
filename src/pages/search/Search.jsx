import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Button, Modal, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import TableComponent from "./TableComponent";
import PaginationComponent from "./PaginationComponent";
import FormInputs from "./FormInputs";
import AddPage from "../addUser/addPage";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../../stateManagment/authSlice";
import { Dropdown, Form } from "react-bootstrap";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Search = () => {
  const [addModalShow, setAddModalShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState({});
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [count, setCount] = useState(1);
  const [total, setTotal] = useState(null);
  const [sortArr, setSortArr] = useState([]);
  const renderState = useSelector((state) => state.tableRender.render);
  const handleCloseModal = () => {
    setAddModalShow(false);
  };
  const { token } = useParams();
  const dispatch = useDispatch();
  dispatch(setToken(token));
  const storedToken = useSelector((state) => state.auth.token);

  const [attributes, setAttributes] = useState([]); // State to store the attributes fetched from the API

  // Fetch attributes from the API
  useEffect(() => {
    const fetchAttributes = () => {
      axios
        .get(`${BASE_URL}/users/options`)
        .then((response) => {
          setAttributes(response.data.result.attributes);
        })
        .catch((error) => {
          console.error("Error fetching attributes:", error);
        });
    };

    fetchAttributes();
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

  const [selectedHeaders, setSelectedHeaders] = useState(tableHeaders);

  const [headerVisibility, setHeaderVisibility] = useState(() => {
    const initialVisibility = {};
    tableHeaders.forEach((header) => {
      initialVisibility[header.key] = true; // Initialize all headers as visible
    });
    return initialVisibility;
  });

  const toggleAllHeadersVisibility = () => {
    const newVisibility = {};
    Object.keys(headerVisibility).forEach((headerKey) => {
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
    if (sortArr.includes(key)) {
      const updatedSortArr = sortArr.filter((item) => item !== key);
      setSortArr([...updatedSortArr, `-${key}`]);
    } else if (sortArr.includes(`-${key}`)) {
      const updatedSortArr = sortArr.filter((item) => item !== `-${key}`);
      setSortArr([...updatedSortArr, key]);
    } else {
      setSortArr([...sortArr, key]);
    }
  };

  const fetchData = (filterDataObj = {}) => {
    setLoading(true);

    const headers = {
      Authorization: `Bearer ${storedToken}`,
    };

    const axiosInstance = axios.create({
      baseURL: BASE_URL,
    });

    axiosInstance.interceptors.request.use(
      (config) => {
        console.log("Request URL:", config.url);
        console.log("Request Method:", config.method);
        console.log("Request Headers:", config.headers);
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    axiosInstance
      .post(
        `/users/search?s=${perPage}&p=${page}&sort=${sortArr.join(" ")}`,
        filterDataObj,
        { headers }
      )
      .then((res) => {
        setData(res.data.result.data);
        setCount(res.data.result.pagesCount);
        setTotal(res.data.result.total);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData(filterData);
  }, [page, perPage, sortArr, renderState]);

  const handleDelete = (id) => {
    axios
      .delete(`${BASE_URL}/users/${id}`)
      .then((response) => {
        toast.success("User deleted successfully");
        fetchData();
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    fetchData(filterData);
    console.log(filterData);
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
    <div className="px-5">
      <div className="d-flex justify-content-between">
        <h1>User Control</h1>
        <Button variant="primary" onClick={() => setAddModalShow(true)}>
          Add
        </Button>
      </div>
      <FormInputs
        handleSearchClick={handleSearchClick}
        handleInputChange={handleInputChange}
        handleResetClick={handleResetClick}
        filterData={filterData}
        attributes={attributes}
      />

      <div className="mb-2">
        <Dropdown>
          <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
            Select & Sort Columns
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

      {loading ? (
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
          <p className="m-0">You can sort rows based on clicking table header</p>
          <TableComponent
            data={data}
            onDelete={handleDelete}
            handelSort={handelSort}
            sortArr={sortArr}
            tableHeaders={selectedHeaders.filter(
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
        <h1>No Data found</h1>
      )}
      <Modal size="lg" show={addModalShow} onHide={() => setAddModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddPage onCloseModal={handleCloseModal} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Search;
