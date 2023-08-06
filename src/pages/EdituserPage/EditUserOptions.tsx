import axios from "axios";
import { OptionsResponse, User, Attribute } from "../../interfaces/interfaces";

export const UseFetchOptions = async () => {
  try {
    const storedToken = localStorage.getItem("token"); // Retrieve the token from wherever you stored it
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const response = await axios.get<OptionsResponse>(
      `${BASE_URL}/users/options`,
      {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      }
    );
    const attributes = response.data.result.attributes;
    return attributes;
  } catch (error) {
    console.error("Error fetching options:", error);
    return [];
  }
};

export const renderFormFields = (
  user: User,
  options: Attribute[],
  getInputRef: (name: string) => React.RefObject<HTMLInputElement> | null,
  setChanges: React.Dispatch<React.SetStateAction<boolean>>,
) => {
 

  return options.map((attribute) => {
    const { name, type, options: attributeOptions } = attribute;
    const { label, controlType, validation } = attributeOptions || {};


    const inputProps = {
      className: "form-control",
      id: name,
      name: name,
      ref: getInputRef(name),
      required: true,
      pattern: validation?.pattern ? String(validation.pattern) : undefined,
      minLength: Number(validation?.min),
      maxLength: validation?.max ? Number(validation.max) : undefined,
      onChange: () => {
        setChanges(true);
      },
    };

    if (
      controlType === "text" ||
      controlType === "email" ||
      controlType === "number" ||
      controlType === "date"
    ) {
      if (name === "birthDate"||name==="ssn") {
        return null;
      }

      return (
        <div key={name} className="col-lg-6 col-12">
          <label htmlFor={name}>{label}</label>
          <input
            type={controlType}
            {...inputProps}
            defaultValue={String(user?.[name] || "")}
          />
        </div>
      );
    } else if (controlType === "radio" && name === "gender") {
      return null;
    } else {
      return (
        <></>
        // <div key={name} className="col-lg-6 col-12">
        //   <p>Unsupported control type: {controlType}</p>
        // </div>
      );
    }
  });
};
