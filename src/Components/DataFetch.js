import React, { useEffect, useState } from 'react';

const ApiDataFetch = () => {
  const [data, setData] = useState([]);
  const [newUser, setNewUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
  });
  const [editUserId, setEditUserId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const apiData = await fetch("http://localhost:8000/api/users");
      const jsonData = await apiData.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/users/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
       
        const updatedData = data.filter(item => item._id !== userId);
        setData(updatedData);
      } else {
        console.error('Error deleting user:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting user:', error.message);
    }
  };

  const handleEdit = (userId) => {
    
    setEditUserId(userId);

    
    const userToEdit = data.find(item => item._id === userId);
    setNewUser(userToEdit);
  };
  

const handleCreate = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/users", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });

    if (response.ok) {
    
      fetchData();
      setNewUser({
        first_name: '',
        last_name: '',
        email: '',
        gender: '',
      });
    } else {
      console.error('Error creating user:', response.statusText);
    }
  } catch (error) {
    console.error('Error creating user:', error.message);
  }
};




  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/users/${editUserId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
       
        const updatedData = data.map(item =>
          item._id === editUserId ? { ...item, ...newUser } : item
        );
        setData(updatedData);
        setEditUserId(null); 
      } else {
        console.error('Error editing user:', response.statusText);
      }
    } catch (error) {
      console.error('Error editing user:', error.message);
    }
  };

  const handleCancel = () => {
   
    setEditUserId(null);
    setNewUser({
      first_name: '',
      last_name: '',
      email: '',
      gender: '',
    });
  };

  const handleChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <form>
        <label>
          First Name:
          <input type="text" name="first_name" value={newUser.first_name} onChange={handleChange} />
        </label>
        <label>
          Last Name:
          <input type="text" name="last_name" value={newUser.last_name} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="text" name="email" value={newUser.email} onChange={handleChange} />
        </label>
        <label>
          Gender:
          <input type="text" name="gender" value={newUser.gender} onChange={handleChange} />
        </label>
        {editUserId ? (
          <>
            <button type="button" onClick={handleSave}>
              Save
            </button>
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          </>
        ) : (
          <button type="button" onClick={handleCreate}>
            Post New User
          </button>
        )}
      </form>

      <ul>
        {data.map((item) => (
          <li key={item._id} style={{ marginBottom: '10px', padding: '2px', border: '2px solid black', borderRadius: '5px' }}>
            <span style={{ marginRight: '20px' }}>
              <strong>ID:</strong> {item._id}
            </span>
            <span style={{ marginRight: '20px' }}>
              <strong>Name:</strong> {item.first_name} 
            </span>

            <span style={{ marginRight: '20px' }}>
              <strong>LastName:</strong>  {item.last_name}
            </span>
            
            
            <span style={{ marginRight: '20px' }}>
              <strong>Email:</strong> {item.email}
            </span>
            <span style={{ marginRight: '20px' }}>
              <strong>Gender:</strong> {item.gender}
            </span>
            <button style={{ marginLeft: '20px' }} onClick={() => handleDelete(item._id)}>
              Delete
            </button>
            <button style={{ marginLeft: '20px' }} onClick={() => handleEdit(item._id)}>
              Edit
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ApiDataFetch;
