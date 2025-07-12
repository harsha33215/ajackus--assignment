import "./index.css";
import { Mail, Building, UserCheck } from "lucide-react";

const EmployeeItem = ({ employee, onEdit, onDelete }) => {
  return (
    <div className="employee-item">
      <div className="employee-info">
        <h3>
          {employee.firstName} {employee.lastName}
        </h3>
        <p>ID: {employee.id}</p>
      </div>
      <div className="employee-details">
        <p>
          <Mail size={14} /> {employee.email}
        </p>
        <p>
          <Building size={14} /> {employee.department}
        </p>
        <p>
          <UserCheck size={14} /> {employee.role}
        </p>
      </div>
      <div className="employee-actions">
        <button onClick={() => onEdit(employee)}>Edit</button>
        <button onClick={() => onDelete(employee.id)}>Delete</button>
      </div>
    </div>
  );
};

export default EmployeeItem;
