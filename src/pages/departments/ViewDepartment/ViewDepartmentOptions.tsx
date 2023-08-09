import {  Attribute, User } from "../../../interfaces/interfaces";
export const renderViewFields = (options: Attribute[], user: User | null) => {
  const rows: JSX.Element[] = [];

  options.map((attribute) => {
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
            className=" justify-content-center"
            style={{ width: 200,height:200}}
            onError={(e) => {
              e.currentTarget.src = "https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg"; // Set default image on error
            }}
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
          values && values?.includes(attributeValue)
            ? values.find((val) => val === attributeValue) || ""
            : "";

        displayValue = selectedLabel;
      }

      rows.push(
        
        (name==="image")? <div className="d-flex justify-content-center " key={name}>

         
        {displayValue}

    </div>:
        <div className="d-flex  " key={name}>
         
            <strong className="d-block mx-3 ">{label!="profile image"?label:undefined} </strong> {displayValue}
    
        </div>
      );
    }
  });
  return rows;
};
