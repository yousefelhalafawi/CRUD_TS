import {  User, Attribute } from "../../../interfaces/interfaces";
import { v4 as uuidv4 } from "uuid";


export const renderFormFields = (
  user: User,
  options: Attribute[],
  getInputRef: (name: string) => React.RefObject<HTMLInputElement> | null,
  setChanges: React.Dispatch<React.SetStateAction<boolean>>,
) => {
 

  return options.map((attribute) => {
    const { name, options: attributeOptions } = attribute;
    const { label, controlType, validation } = attributeOptions || {};


    const inputProps = {
      className: "form-control",
      id: name,
      name: name,
      key:uuidv4(),
      ref: getInputRef(name),
      required: true,
      pattern: validation?.pattern ? String(validation.pattern) : undefined,
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
        <div key={uuidv4()} className="col-lg-6 col-12">
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
null       
      );
    }
  });
};
