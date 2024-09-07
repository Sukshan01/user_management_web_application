import React from 'react';
import './Users.css';

const Users = ({ id, name, email, phone, deleteUser, editUser }) => {
  return (
    <tr>
      <td>{name}</td>
      <td className='email-data'>{email}</td>
      <td className='phone-data'>{phone}</td>
      <td>
        <button onClick={editUser} className="btn edit-btn">Edit</button>
        <button onClick={() => deleteUser(id)} className="btn delete-btn">Delete</button>
      </td>
    </tr>
  );
};

export default Users;
