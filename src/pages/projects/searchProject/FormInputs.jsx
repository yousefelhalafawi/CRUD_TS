import React from "react";
import { Button, Form, Row, Col } from "react-bootstrap";

function FormInputs({ handleInputChange, handleSearchClick, handleResetClick, filterData, attributes }) {
  return (
    <Form className="mt-2 mb-3" onSubmit={handleSearchClick}>
      <Row>
        {attributes?.map((attribute) => {
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
                  label={name}
                  placeholder={`search ${label}`}
                  className="mb-2"
                />
              </Col>
            );
          } else if (controlType === "radio") {
            return (
              <Col md={4} key={name} className="d-flex align-items-center">
                <Form.Label className="m-2 me-4">{name}</Form.Label>
                <Form.Select
                  value={filterData[name]}
                  onChange={handleInputChange}
                  name={name}
                >
                  {values?.map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </Form.Select>
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
