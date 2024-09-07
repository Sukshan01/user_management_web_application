
import React, { useState } from 'react';
import './EditUser.css';

const EditUser = ({ user, updateUser, cancelEdit }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(user.id, { name, email, phone });
  };

  return (

    <>
    <h2 className='edit-heading'>Edit User</h2>
    <div className="edit-user">
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
        />
        <button type="submit" className="btn update-btn btn-width">Update</button>
        <button type="button" className="btn cancel-btn btn-width" onClick={cancelEdit}>Cancel</button>
      </form>
    </div>
    </>
  );
};

export default EditUser;
