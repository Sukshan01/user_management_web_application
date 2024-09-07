import React, { useEffect, useState } from 'react'
import Users from './components/Users/Users';
import AddUser from './components/AddUsers/AddUser';
import EditUser from './components/EditUser/EditUser';
import './App.css'
import Footer from './components/Footer/Footer';

const App = () => {


    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

      fetchUserData();
    }, [])



    // Function to fectch Users data from jsonPlaceholder API

    const fetchUserData = async () => {

      setLoading(true)

      await fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false); // data fetch successfully so loader should stop.
    })
      .catch((err) => {
        console.log(err);
        setLoading(false); // in case of any error loader should stop
      }) 

    }


    // Creating user data and adding it to list


    const addUser = async (name, email, phone) => {

      await fetch('https://jsonplaceholder.typicode.com/users', {

        method: 'POST',
        body: JSON.stringify({
          name:name,
          email:email,
          phone:phone

        }),

        headers: {
          "Content-type": "application/json; charset=UTF-8",
        }
      })

      .then((res) => {
        if(res.status !== 201){
          return 
        }
        else{
          return res.json();
        }
      })
      .then((data) => {
        setUsers((users) => [...users,data]);
      })

      .catch((err) => {
        console.log(err)
      })

    }



    //Updating or Editing user's data

    const updateUser = async (id, updatedData) => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
          method: 'PUT',
          body: JSON.stringify(updatedData),
          headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        });
    
        if (response.ok) {
          const updatedUser = await response.json();
          setUsers((prevUsers) =>
            prevUsers.map((user) => (user.id === id ? updatedUser : user))
          );
          setEditingUser(null);
        } else {
          console.error('Failed to update user:', response.statusText);
        }
      } catch (error) {
        console.error('Error updating user:', error);
      }
    };



    // Delete User function

    const deleteUser = async (id) => {

      await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {

        method: 'DELETE'
      })

      .then((res) => {
        if(res.status !== 200){
          return
        }

        else{
          setUsers(users.filter((user) => {

            return user.id !== id;
          }))
        }
      })

      .catch((err) => {
        console.log(err);
      })


    }

    console.log(users);

  return (
    <div className="app">

      <h3 className='main-heading'>User Management Application using JsonPlaceholder API</h3>

      <br />

      <AddUser addUser={addUser} />

      {editingUser && (
        <EditUser
          user={editingUser}
          updateUser={updateUser}
          cancelEdit={() => setEditingUser(null)}
        />
      )}


      {/* Showing spinner */}

      {loading ? (
        <div className='spinner'>

        <div className="spin">
          
  
        </div>
        
      </div>
      ) : (


<table className='table-data'>
        <thead>
          <tr>
            <th>Name</th>
            <th className='email'>Email</th>
            <th className='phone'>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>

        {
          users.map((user) => (

            <Users id={user.id} key={user.key} name={user.name} email={user.email} phone={user.phone} deleteUser={deleteUser}  editUser={() => setEditingUser(user)}/>

          ))
        }
       </tbody>
       </table>

      )}

       <Footer />

      
    </div>
  )
}

export default App
