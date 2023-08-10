import React, { useState } from "react";
import styles from "./UserForm.module.css";
import FormFieldsRenderer from "./RendererOptions"; // Import the new component
import { useSelector } from "react-redux";

interface UserFormProps {
  onSubmit: (formData: FormData) => void;
}
interface RootState {
  auth: {
    token: string | null; // Adjust the type of 'token' based on its actual type
  };
  options :{
    projectOptions:any
  }
}

interface FormData {
  [key: string]: string | number | null | File;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({});
  

  const projectOptions = useSelector((state:RootState) => state.options.projectOptions);




  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    let sanitizedValue: string | number | null = value === "" ? null : value;
  
    if (typeof sanitizedValue === 'string' && !isNaN(Number(sanitizedValue))) {
      sanitizedValue = Number(sanitizedValue);
    }
  
    setFormData((prevData) => ({ ...prevData, [name]: sanitizedValue }));
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prevData) => ({ ...prevData, image: file }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };


  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <form onSubmit={handleSubmit} className={styles.all}>
            {/* Use the new FormFieldsRenderer component from options */}
            <FormFieldsRenderer
              options={JSON.parse(projectOptions)}
              formData={formData}
              handleChange={handleChange}
              handleimage={handleImageChange}
            />
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
