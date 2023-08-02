import React from "react";
import { Button, Form, Row, Col } from "react-bootstrap";

function FormInputs({ handleInputChange, handleSearchClick, handleResetClick, filterData, attributes }) {
  return (
    <Form className="mt-2 mb-3" onSubmit={handleSearchClick}>
      <Row>
        {attributes.map((attribute) => {
          const { name, type, options } = attribute;
          const { label, controlType, values } = options;

          if (controlType === "text" ||controlType === "email") {
            return (
              <Col md={4} key={name}>
                <Form.Control
                  onChange={handleInputChange}
                  value={filterData[name] || ""}
                  name={name}
                  type={type}
                  label={label}
                  placeholder={`search ${label}`}
                  className="mb-2"
                />
              </Col>
            );
          } else if (controlType === "radio") {
            return (
              <Col md={4} key={name} className="d-flex align-items-center">
                <p className="m-2 me-4">{name} :</p>
                {values.map((value) => (
                  <div key={value} className="form-check me-3 my-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      value={value}
                      id={value}
                      name={name}
                      checked={filterData[name] === value} // Add the checked prop
                      onChange={handleInputChange} // Add the onChange handler
                    />
                    <label className="form-check-label" htmlFor={value}>
                      {value}
                    </label>
                  </div>
                ))}
              </Col>
            );
          }
          // Add other control types as needed (e.g., "file", "date", etc.)
          return null;
        })}
      </Row>
      <div className="d-flex align-items-center">
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
