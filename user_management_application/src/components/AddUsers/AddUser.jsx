import React from 'react';
import './AddUser.css';

const AddUser = ({ addUser }) => {
  const handleOnSubmit = (e) => {
    e.preventDefault();
    addUser(e.target.name.value, e.target.email.value, e.target.phone.value);
    e.target.name.value = "";
    e.target.email.value = "";
    e.target.phone.value = "";
  };

  return (
    <>
    <h2 className='heading'>Add User</h2>
    <div className="add-user">
      <form onSubmit={handleOnSubmit}>
        <input type="text" placeholder="Name" name="name" required />
        <input type="email" placeholder="Email" name="email" required />
        <input type="text" placeholder="Phone" name="phone" />
        <button type="submit" className="btn add-btn btn-width">Add</button>
      </form>
    </div>
    </>
  );
};

export default AddUser;
