import { Button, Form } from "react-bootstrap";

function FormInputs({
  handleInputChange,
  handleSearchClick,
  handleResetClick,
  filterData,
}) {
  return (
    <Form className="mt-2 mb-3" onSubmit={handleSearchClick}>
      <div className="d-flex mb-3">
        <Form.Control
          onChange={handleInputChange}
          value={filterData.email || ""}
          name="email"
          type="email"
          placeholder="Enter email"
        />
        <Form.Control
          onChange={handleInputChange}
          name="ssn"
          value={filterData.ssn || ""}
          type="text"
          className="mx-3"
          placeholder="Enter SSN"
          maxLength={14}
          pattern="^[0-9]{14}$"
        />
        <Form.Control
          onChange={handleInputChange}
          name="firstName"
          value={filterData.firstName || ""}
          type="text"
          placeholder="Enter First Name"
          minLength={1}
          maxLength={10}
        />
      </div>
      <div className="d-flex align-items-center">
        <Form.Control
          onChange={handleInputChange}
          name="middleName"
          value={filterData.middleName || ""}
          type="text"
          placeholder="Enter Middle Name"
          minLength={3}
          maxLength={10}
        />
        <Form.Control
          onChange={handleInputChange}
          name="thirdName"
          className="mx-3"
          value={filterData.thirdName || ""}
          type="text"
          placeholder="Enter Third Name"
          minLength={3}
          maxLength={10}
        />
        <div
          name="gender"
          className="form-check me-3 d-flex"
          onChange={handleInputChange}
        >
          <div>
            <input
              className="form-check-input"
              type="radio"
              value="male"
              id="male"
              name="gender"
            />
            <label className="form-check-label" htmlFor="male">
              Male
            </label>
          </div>
          <div className="ms-5">
            <input
              className="form-check-input"
              type="radio"
              value="female"
              id="female"
              name="gender"
            />
            <label className="form-check-label" htmlFor="female">
              Female
            </label>
          </div>
        </div>
        <Button
          disabled={Object.keys(filterData).length === 0}
          className="mx-3"
          variant="primary"
          type="submit"
        >
          Search
        </Button>
        <Button
          disabled={Object.keys(filterData).length === 0}
          onClick={handleResetClick}
          variant="secondary"
        >
          Reset
        </Button>
      </div>
    </Form>
  );
}

export default FormInputs;
