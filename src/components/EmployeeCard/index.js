import "./index.css";
import { useState } from "react";
import EmployeeItem from "../EmployeeItem";
import EmployeeForm from "../EmployeeForm";
import FilterSidebar from "../FilterSidebar";

const initialEmployees = [
  {
    id: "1",
    firstName: "Alice",
    lastName: "Smith",
    email: "alice@example.com",
    department: "HR",
    role: "Manager",
  },
  {
    id: "2",
    firstName: "Bob",
    lastName: "Johnson",
    email: "bob@example.com",
    department: "IT",
    role: "Developer",
  },
  {
    id: "3",
    firstName: "Charlie",
    lastName: "Lee",
    email: "charlie@example.com",
    department: "Finance",
    role: "Analyst",
  },
  {
    id: "4",
    firstName: "Diana",
    lastName: "Wilson",
    email: "diana@example.com",
    department: "Marketing",
    role: "Coordinator",
  },
  {
    id: "5",
    firstName: "Edward",
    lastName: "Brown",
    email: "edward@example.com",
    department: "IT",
    role: "Senior Developer",
  },
  {
    id: "6",
    firstName: "Fiona",
    lastName: "Davis",
    email: "fiona@example.com",
    department: "HR",
    role: "Specialist",
  },
  {
    id: "7",
    firstName: "George",
    lastName: "Miller",
    email: "george@example.com",
    department: "Sales",
    role: "Representative",
  },
  {
    id: "8",
    firstName: "Hannah",
    lastName: "Garcia",
    email: "hannah@example.com",
    department: "Marketing",
    role: "Director",
  },
];

const EmployeeCard = () => {
  const [employeeList, setEmployeeList] = useState(initialEmployees);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [page, setPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const itemsPerPage = 5;

  const [filters, setFilters] = useState({
    firstName: "",
    department: "",
    role: "",
  });

  const clearFilters = () => {
    // used to clear the filters
    setFilters({ firstName: "", department: "", role: "" });
  };

  const sortedEmployees = [...employeeList].sort((a, b) => {
    // sorting function
    if (!sortKey) return 0;
    const [key, order] = sortKey.split("-");
    const aValue = a[key].toLowerCase();
    const bValue = b[key].toLowerCase();
    return order === "asc"
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  });

  const filteredEmployees = sortedEmployees.filter(
    // used to filter the data
    (emp) =>
      emp.firstName.toLowerCase().includes(filters.firstName.toLowerCase()) &&
      (filters.department === "" || emp.department === filters.department) &&
      (filters.role === "" || emp.role === filters.role) &&
      `${emp.firstName} ${emp.lastName}`
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  const paginatedEmployees = filteredEmployees.slice(
    // used for pagination toogle to next page
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleDelete = (id) => {
    // delete function used to delete the data
    setEmployeeList((prev) => prev.filter((emp) => emp.id !== id));
  };

  const handleSave = (emp) => {
    // updating and saving the data
    if (editing) {
      setEmployeeList((prev) =>
        prev.map((e) => (e.id === editing.id ? { ...emp, id: editing.id } : e))
      );
    } else {
      setEmployeeList((prev) => [
        ...prev,
        { ...emp, id: Date.now().toString() },
      ]);
    }
    setEditing(null);
    setShowForm(false);
  };

  const handleEdit = (emp) => {
    // edit function
    setEditing(emp);
    setShowForm(true);
  };

  return (
    <div className="employee-card-container">
      <div className="header-bar">
        <button
          className="filter-toggle"
          onClick={() => setIsFilterOpen((prev) => !prev)}
        >
          {isFilterOpen ? "Close Filter" : "Open Filter"}
        </button>
      </div>

      <div className="filter-layout">
        {isFilterOpen && (
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            clearFilters={clearFilters}
          />
        )}

        <div className="main-section">
          <div className="controls">
            <input
              className="search-input"
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className="sort-select"
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="firstName-asc">First Name (asc)</option>
              <option value="firstName-desc">First Name (desc)</option>
              <option value="department-asc">Department (asc)</option>
              <option value="department-desc">Department (desc)</option>
            </select>
            <button
              className="add-button"
              onClick={() => {
                setShowForm(true);
                setEditing(null);
              }}
            >
              Add Employee
            </button>
          </div>

          {showForm && (
            <EmployeeForm
              onSubmit={handleSave}
              onCancel={() => {
                setShowForm(false);
                setEditing(null);
              }}
              employee={editing}
            />
          )}

          <div className="employee-list">
            {paginatedEmployees.map((emp) => (
              <EmployeeItem
                key={emp.id}
                employee={emp}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>

          <div className="pagination">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
            >
              Prev
            </button>
            <span>Page {page}</span>
            <button
              onClick={() =>
                setPage((p) =>
                  p * itemsPerPage < filteredEmployees.length ? p + 1 : p
                )
              }
              disabled={page * itemsPerPage >= filteredEmployees.length}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
