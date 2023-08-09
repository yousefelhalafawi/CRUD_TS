import React from 'react';

const TableListComponent = ({ data }) => {
  return (
    <table className="table table-striped table-bordered">
      <thead className="thead-dark">
        <tr>
          <th>User first Name</th>
         
        </tr>
      </thead>
      <tbody>
        {data.map((user) => (
          <tr key={user._id}>
            <td>{user.firstName}</td>
            
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableListComponent;
