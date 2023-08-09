import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./UserForm.module.css";
import { Attribute, OptionsResponse } from "../../interfaces/interfaces";
import FormFieldsRenderer from "./RendererOptions"; // Import the new component
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

interface UserFormProps {
  onSubmit: (formData: FormData) => void;
}
interface RootState {
  auth: {
    token: string | null; // Adjust the type of 'token' based on its actual type
  };
}

interface FormData {
  [key: string]: string | number | null | File;
}
const BASE_URL = process.env.REACT_APP_BASE_URL;

const UserForm: React.FC<UserFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({});
  const [options, setOptions] = useState<Attribute[]>([]);
  const [loading, setLoading] = useState(true);
  
  const storedToken = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    fetchOptions();
  }, []);

  const fetchOptions = async () => {
    try {
      const response = await axios.get<OptionsResponse>(
        `${BASE_URL}/departments/options`,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
      const attributes = response.data.result.attributes;
      const initialFormData: FormData = {};
      for (const attribute of attributes) {
        initialFormData[attribute.name] = "";
      }
      setFormData(initialFormData);
      setOptions(attributes);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching options:", error);
      setLoading(false);
    }
  };

  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    let sanitizedValue: string | number | null | File;

    // Check if the value is null or a File
    if (value === null) {
      sanitizedValue = value;
    } else {
      // If it is not null or a File, convert to string or number
      sanitizedValue = value === "" ? null : Number(value) || String(value);
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
              options={options}
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
