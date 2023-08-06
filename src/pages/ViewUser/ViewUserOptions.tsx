import {  Attribute, User } from "../../interfaces/interfaces";
export const renderViewFields = (options: Attribute[], user: User | null) => {
  const rows: JSX.Element[] = [];

  options.forEach((attribute) => {
    const { name, type, options: attributeOptions } = attribute;
    const { label, controlType, values } = attributeOptions || {};

    if (user) {
      let displayValue: string | JSX.Element = String(user[name]);

      if (controlType === "file") {
        // If controlType is "file", render an image if available
        displayValue = (
          <img
            src={String(user[name])}
            alt={label}
            className=""
            style={{ width: 200,height:200}}
          />
        );
      } else if (controlType === "date") {
        // If controlType is "date", format the date value
        const formattedDate = new Date(user[name]).toLocaleDateString();
        displayValue = formattedDate;
      } else if (controlType === "radio") {
        // If controlType is "radio", find the corresponding label for the selected value
        const attributeValue = String(user[name]);
        const selectedLabel =
          values && values.includes(attributeValue)
            ? values.find((val) => val === attributeValue) || ""
            : "";

        displayValue = selectedLabel;
      }

      rows.push(
        <div className="col-12 " key={name}>
          <p>
            <strong>{label}: </strong> {displayValue}
          </p>
        </div>
      );
    }
  });
  return rows;
};
