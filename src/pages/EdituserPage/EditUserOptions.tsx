import axios from "axios";
import { OptionsResponse, User, Attribute } from "../../interfaces/interfaces";

export const fetchOptions = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  return axios
    .get<OptionsResponse>(`${BASE_URL}/users/options`)
    .then((response) => response.data.result.attributes)
    .catch((error) => {
      console.error("Error fetching options:", error);
      return [];
    });
};

export const renderFormFields = (
  user: User,
  options: Attribute[],
  getInputRef: (name: string) => React.RefObject<HTMLInputElement> | null,
  setChanges: React.Dispatch<React.SetStateAction<boolean>>,
  loadingOptions: boolean
) => {
  if (loadingOptions) {
    return <p>Loading options...</p>;
  }

  return options.map((attribute) => {
    const { name, type, options: attributeOptions } = attribute;
    const { label, controlType, validation } = attributeOptions || {};

    const isDisabled = name === "ssn" || name === "email";

    const inputProps = {
      className: "form-control",
      id: name,
      name: name,
      ref: getInputRef(name),
      required: true,
      pattern: validation?.pattern ? String(validation.pattern) : undefined,
      minLength: Number(validation?.min),
      maxLength: validation?.max ? Number(validation.max) : undefined,
      disabled: isDisabled,
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
      if (name === "birthDate") {
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
