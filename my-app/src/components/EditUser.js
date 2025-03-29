import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EditUser.css";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ first_name: "", last_name: "", email: "" });

  useEffect(() => {
    fetch(`https://reqres.in/api/users/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data.data));
  }, [id]);

  const handleUpdate = async () => {
    await fetch(`https://reqres.in/api/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    alert("User updated successfully!");
    navigate("/users");
  };

  return (
    <div className="edit-container">
      <h2 className="edit-title">Edit User</h2>
      <input
        className="edit-input"
        type="text"
        value={user.first_name}
        onChange={(e) => setUser({ ...user, first_name: e.target.value })}
        placeholder="First Name"
      />
      <input
        className="edit-input"
        type="text"
        value={user.last_name}
        onChange={(e) => setUser({ ...user, last_name: e.target.value })}
        placeholder="Last Name"
      />
      <input
        className="edit-input"
        type="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
      />
      <button className="edit-button" onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default EditUser;
