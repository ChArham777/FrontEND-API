import React, { useEffect, useState } from 'react';

const ApiDataFetch = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiData = await fetch("http://localhost:8000/api/users");
        const jsonData = await apiData.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, [setData]);

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/users/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Update the data after successful deletion
        const updatedData = data.filter(item => item._id !== userId);
        setData(updatedData);
      } else {
        console.error('Error deleting user:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting user:', error.message);
    }
  };

  const handleEdit = async (userId, updatedUserData) => {
    try {
      const response = await fetch(`http://localhost:8000/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUserData),
      });

      if (response.ok) {
        // Update the data after successful edit
        const updatedData = data.map(item =>
          item._id === userId ? { ...item, ...updatedUserData } : item
        );
        setData(updatedData);
      } else {
        console.error('Error editing user:', response.statusText);
      }
    } catch (error) {
      console.error('Error editing user:', error.message);
    }
  };

  return (
    <>
      <ul>
        {data.map((item) => (
          <li key={item._id}>
            {item.first_name} {item.last_name} {item.email} {item.gender}
            <button onClick={() => handleDelete(item._id)}>Delete</button>
            <button onClick={() => handleEdit(item._id, { first_name:"Arham" })}>
              Edit
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ApiDataFetch;
