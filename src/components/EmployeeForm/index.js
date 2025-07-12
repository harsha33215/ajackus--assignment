import { useState, useEffect } from "react";
import "./index.css";

const departments = ["HR", "IT", "Finance", "Marketing", "Sales"];
const roles = ["Manager", "Developer", "Analyst", "Coordinator", "Director"];

const EmployeeForm = ({ onSubmit, onCancel, employee }) => {
  const [formData, setFormData] = useState({
    // initialize the empty form
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    role: "",
  });

  const [errors, setErrors] = useState({}); // used to catch the error

  useEffect(() => {
    if (employee) {
      setFormData(employee);
      setErrors({});
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    // validate the form
    const newErrors = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Invalid email";
    if (!formData.department) newErrors.department = "Department is required";
    if (!formData.role) newErrors.role = "Role is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    // form submition
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      onSubmit(formData);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        department: "",
        role: "",
      });
      setErrors({});
    }
  };

  return (
    <form className="employee-form" onSubmit={handleSubmit}>
      <input
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
      />
      {errors.firstName && <p className="error">{errors.firstName}</p>}

      <input
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
      />
      {errors.lastName && <p className="error">{errors.lastName}</p>}

      <input
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      {errors.email && <p className="error">{errors.email}</p>}

      <select
        name="department"
        value={formData.department}
        onChange={handleChange}
      >
        <option value="">Select Department</option>
        {departments.map((dep) => (
          <option key={dep}>{dep}</option>
        ))}
      </select>
      {errors.department && <p className="error">{errors.department}</p>}

      <select name="role" value={formData.role} onChange={handleChange}>
        <option value="">Select Role</option>
        {roles.map((role) => (
          <option key={role}>{role}</option>
        ))}
      </select>
      {errors.role && <p className="error">{errors.role}</p>}

      <div className="form-buttons">
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
