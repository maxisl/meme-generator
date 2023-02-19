import React, { useState, useEffect } from "react";
import axios from "axios";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
    .get("http://localhost:3001/users")
    .then((response) => {
      setUsers(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <div>
      <h4>User List</h4>
      {users.map((user) => (
        <div key={user._id}>
          <p>{user.name}</p>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}

export default UserList;
