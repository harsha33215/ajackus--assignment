import "./index.css";

const FilterSidebar = ({ filters, setFilters, clearFilters }) => {
  return (
    <div className="filter-sidebar">
      <h3>Filter Employees</h3>
      <input
        type="text"
        placeholder="First Name"
        value={filters.firstName}
        onChange={(e) => setFilters({ ...filters, firstName: e.target.value })}
      />
      <select
        value={filters.department}
        onChange={(e) => setFilters({ ...filters, department: e.target.value })}
      >
        <option value="">All Departments</option>
        <option>HR</option>
        <option>IT</option>
        <option>Finance</option>
        <option>Marketing</option>
        <option>Sales</option>
      </select>
      <select
        value={filters.role}
        onChange={(e) => setFilters({ ...filters, role: e.target.value })}
      >
        <option value="">All Roles</option>
        <option>Manager</option>
        <option>Developer</option>
        <option>Analyst</option>
        <option>Coordinator</option>
        <option>Director</option>
      </select>
      <div className="filter-buttons">
        <button onClick={clearFilters}>Clear</button>
      </div>
    </div>
  );
};

export default FilterSidebar;
