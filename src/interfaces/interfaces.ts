
export interface User {
    _id: string;
    firstName: string;
    middleName: string;
    thirdName: string;
    image: string;
    email: string;
    address: string;
    birthDate: string;
    gender: string;
    ssn: number;
    [key: string]: string | number; // Index signature for dynamic property access
  }
  
  export interface AttributeOption {
    label: string;
    control: string;
    controlType: string;
    placeholder?: string;
    validation?: {
      [key: string]: string | boolean;
    };
    values?: string[];
  }
  
  export interface Attribute {
    name: string;
    type: string;
    options?: AttributeOption;
  }
  
  export interface OptionsResponse {
    message: string;
    result: {
      attributes: Attribute[];
    };
  }
  