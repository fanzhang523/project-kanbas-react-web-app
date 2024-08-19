import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";

export default function Signup() {
  const [error, setError] = useState("");
  const [user, setUser] = useState<any>({ role: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const signup = async () => {
    if (!user.role) { 
      setError("Please select a role.");
      return;
    }
    try {
      const currentUser = await client.signup(user);
      dispatch(setCurrentUser(currentUser));
      navigate("/Kanbas/Account/Profile");
    } catch (err: any) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
        console.error("Signup error:", err);
      }
    }
  };

  return (
    <div className='container mt-5'>
      <h1 className='mb-4'>Sign Up</h1>

      {error && <div className="wd-error alert alert-danger">{error}</div>}

      <div className='card p-4'>
        <div className='mb-3'>
          <label className='form-label'>Username</label>
          <input
            value={user.username}
            onChange={e => setUser({ ...user, username: e.target.value })}
            className='form-control'
            placeholder='Username'
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Password</label>
          <input
            value={user.password}
            onChange={e => setUser({ ...user, password: e.target.value })}
            type='password'
            className='form-control'
            placeholder='Password'
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Role</label>
          <select
            value={user.role}
            onChange={(e) => setUser({ ...user, role: e.target.value })}
            className="form-select"
          >
            <option value="" disabled>
              Select a role
            </option>
            <option value="STUDENT">Student</option>
            <option value="FACULTY">Faculty</option>
          </select>
        </div>

        <button onClick={signup} className='btn btn-primary w-100 mb-3'>
          Sign Up
        </button>
        <div className='mt-3'>
          <Link to='/Kanbas/Account/Signin'>Sign In</Link>
        </div>
      </div>
    </div>
  )
}