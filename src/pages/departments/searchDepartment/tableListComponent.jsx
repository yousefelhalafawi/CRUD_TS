import React from 'react';

const TableListComponent = ({ data }) => {
  return (
    <table className="table table-striped table-bordered">
      <thead className="thead-dark">
        <tr>
          <th>Department ID</th>
          <th>Department Name</th>
          <th>Manager Name</th>
          <th>Employees Number</th>
        </tr>
      </thead>
      <tbody>
        {data.map((department) => (
          <tr key={department._id}>
            <td>{department._id}</td>
            <td>{department.departmentName}</td>
            <td>{department.managerName}</td>
            <td>{department.employeesNumber}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableListComponent;
