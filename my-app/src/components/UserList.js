import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserList.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://reqres.in/api/users?page=${page}`)
      .then((res) => res.json())
      .then((data) => setUsers(data.data));
  }, [page]);

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (id) => {
    await fetch(`https://reqres.in/api/users/${id}`, {
      method: "DELETE",
    });
    setUsers(users.filter((user) => user.id !== id));
    alert("User deleted successfully!");
  };

  return (
    <div className="userlist-container">
      <h2 className="userlist-title">User List</h2>
      <table className="userlist-table">
        <thead>
          <tr>
            <th>Avatar</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <img className="user-avatar" src={user.avatar} alt="avatar" />
              </td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
              <td>
                <button className="edit-button" onClick={() => handleEdit(user.id)}>Edit</button>
                <button className="delete-button" onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
      </div>
    </div>
  );
};

export default UserList;
