import React, { useEffect, useState } from "react";
import { Attribute } from "../../interfaces/interfaces";
import { v4 as uuidv4 } from "uuid";

interface FormFieldsRendererProps {
  options: Attribute[];
  formData: { [key: string]: string | number | null | File };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleimage: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormFieldsRenderer: React.FC<FormFieldsRendererProps> = ({
  options,
  formData,
  handleChange,
  handleimage,
}) => {
  const renderFormFields = () => {
    const rows: JSX.Element[] = [];

 
    let currentRowInputs: JSX.Element[] = [];

    options.map((attribute) => {
      const { name, type, options: attributeOptions } = attribute;
      const { label, controlType, placeholder, validation } =
        attributeOptions || {};
      const inputProps = {
        className: "form-control",
        id: name,
        name: name,
        value: String(formData[name] || ""),
        onChange: handleChange,
        placeholder: placeholder,
        required: validation?.required ? true : false,
        minLength: validation?.min ? Number(validation.min) : undefined,
        maxLength: validation?.max ? Number(validation.max) : undefined,
      };

      if (
        controlType === "text" ||
        controlType === "email" ||
        controlType === "number" ||
        controlType === "date"
      ) {
        currentRowInputs.push(
          <div className=" mb-3" key={name}>
            <label htmlFor={name} className="form-label">
              {label}
            </label>
            <input type={controlType} {...inputProps} />
          </div>
        );
      } else if (controlType === "radio") {
        currentRowInputs.push(
          <div key={uuidv4()} className=" mb-3">
            <label className="form-label">{label}</label>
            <select {...inputProps}>
              {attributeOptions?.values?.map((value: string) => (
                <option key={uuidv4()} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        );
      } else if (controlType === "file") {
        currentRowInputs.push(
          <div className="mb-3" key={uuidv4()}>
            <label htmlFor={name} className="form-label">
              {" "}
              {name}{" "}
            </label>
            <input
              type={controlType}
              className="form-control"
              id={name}
              name={name}
              onChange={handleimage}
            />
          </div>
        );
      } else {
        currentRowInputs.push(
          <div key={name}>
            <p>Unsupported control type: {controlType}</p>
          </div>
        );
        <></>;
      }

      if (currentRowInputs.length === 1) {
        rows.push(
          <div key={name} className="row">
            {currentRowInputs}
          </div>
        );
        currentRowInputs = [];
      }
    });

    return rows;
  };

  return <>{renderFormFields()}</>;
};

export default React.memo(FormFieldsRenderer);
