import React from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const handleCreate = (event) => {};
  const handleCancel = (event) => {
    navigate('/login');
  };
  return (
    <form onSubmit={handleCreate}>
      <div>
        <label>name</label>
        <input></input>
      </div>
      <div>
        <label>username</label>
        <input></input>
      </div>
      <div>
        <label>password</label>
        <input></input>
      </div>
      <button
        onClick={(e) => {
          handleCreate(e);
        }}
        type="submit">
        create
      </button>
      <button
        onClick={(e) => {
          handleCancel(e);
        }}>
        cancel
      </button>
    </form>
  );
};
export default Register;
