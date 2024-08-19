import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";

export default function Signin() {
    const [error, setError] = useState("");
    const [credentials, setCredentials] = useState<any>({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const signin = async () => {
        try {
            const currentUser = await client.signin(credentials);
            dispatch(setCurrentUser(currentUser));

            navigate("/Kanbas/Account/Profile");
        } catch (err: any) {
            
            if (err.response && err.response.data) {
                setError(err.response.data.message);
            } else {
                setError("An unexpected error occurred. Please try again.");
                console.error("Signin error:", err); 
            }
            
        }
    };

    return (
    <div className='container mt-5'>
      <h1 className='mb-4'>Sign In</h1>
      {error && <div className='alert alert-danger'>{error}</div>}

      <div className='card p-4'>
        <div className='mb-3'>
          <label className='form-label'>Username</label>
          <input
            onChange={e =>
              setCredentials({ ...credentials, username: e.target.value })
            }
            value={credentials.username}
            className='form-control'
            placeholder='Username'
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Password</label>
          <input
            onChange={e =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            value={credentials.password}
            className='form-control'
            placeholder='Password'
            type='password'
          />
        </div>
        <button onClick={signin} className='btn btn-primary w-100'>
          Sign In
        </button>
        <div className='mt-3'>
          <Link to='/Kanbas/Account/Signup'>Sign Up</Link>
        </div>
      </div>

      <div className='mt-5 text-center'>
        <h2
          className='mb-3'
          style={{ fontFamily: 'Arial, sans-serif', color: '#4A90E2' }}
        >
          Group 10:
        </h2>
        <p className='mb-1' style={{ fontSize: '1.2em', fontWeight: 'bold' }}>
          Fan Zhang
        </p>
        <p className='mb-1' style={{ fontSize: '1.2em', fontWeight: 'bold' }}>
          Keyan Shen
        </p>
        <div style={{ marginBottom: '2em' }}></div>
        
        <div>
          <h3
            className='mb-3'
            style={{ fontFamily: 'Arial, sans-serif', color: '#4A90E2' }}
          >
            Git Repositories:
          </h3>
          <a
            href='https://github.com/fanzhang523/Kanbas-Quiz/tree/main' //需要修改
            target='_blank'
            rel='noopener noreferrer'
            style={{ color: '#D0021B', fontFamily: 'Arial, sans-serif' }}
            className='btn btn-link'
          >
            Kanbas-react-web-app Repository
          </a>
          <a
            href='https://github.com/fanzhang523/kanbas-server/tree/main' //需要修改
            target='_blank'
            rel='noopener noreferrer'
            style={{ color: '#D0021B', fontFamily: 'Arial, sans-serif' }}
            className='btn btn-link'
          >
            Kanbas-node-server-app Repository
          </a>
        </div>
      </div>
    </div>
  )
}
