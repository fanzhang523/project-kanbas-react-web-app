import * as client from "./client";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSave, FaSignOutAlt } from "react-icons/fa";

export default function Profile() {
    const [profile, setProfile] = useState<any>({});
    const navigate = useNavigate();

    const fetchProfile = async () => {
        try {
            const account = await client.profile();
            setProfile(account);
            dispatch(setCurrentUser(account))
        } catch (err: any) {
            console.error('Error fetching profile:', err); 
            navigate("/Kanbas/Account/Signin");
        }

    };

    const dispatch = useDispatch();

    const saveProfile = async () => {
        console.log("Profile data before save:", profile);  
        if (!profile.role) {
            alert('Please select a role before saving.');
            return;
        }
    
        try {
            await client.updateProfile(profile._id, profile);
            alert('Profile saved successfully');
        } catch (err: any) {
            console.error('Error saving profile:', err);
            alert('Error saving profile');
        }
    }

    const signout = async () => {
        try {
            await client.signout();
            dispatch(setCurrentUser(null));
            navigate("/Kanbas/Account/Signin");
        } catch (err: any) {
            console.error('Error signing out:', err); 
            alert('Error signing out');
        }
    };

    useEffect(() => { fetchProfile(); }, []);

    return (
        <div className='container mt-5'>
            <h1 className='mb-4'>Profile</h1>
            {profile && (
                <div className='card p-4'>
                    <div className='mb-3'>
                        <label className='form-label'>Username</label>
                        <input
                            className='form-control'
                            value={profile.username || ''}
                            onChange={e =>
                                setProfile({ ...profile, username: e.target.value })
                            }
                        />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Password</label>
                        <input
                            className='form-control'
                            type="password"
                            value={profile.password || ''}
                            onChange={e =>
                                setProfile({ ...profile, password: e.target.value })
                            }
                        />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>First Name</label>
                        <input
                            className='form-control'
                            value={profile.firstName || ''}
                            onChange={e =>
                                setProfile({ ...profile, firstName: e.target.value })
                            }
                        />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Last Name</label>
                        <input
                            className='form-control'
                            value={profile.lastName || ''}
                            onChange={e =>
                                setProfile({ ...profile, lastName: e.target.value })
                            }
                        />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Date of Birth</label>
                        <input
                            className='form-control'
                            value={profile.dob || ''}
                            onChange={e => setProfile({ ...profile, dob: e.target.value })}
                            type='date'
                        />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Email</label>
                        <input
                            className='form-control'
                            value={profile.email || ''}
                            onChange={e => setProfile({ ...profile, email: e.target.value })}
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='form-label'>Role</label>
                        <select
                            className='form-select'
                            value={profile.role || ''} 
                            onChange={e => setProfile({ ...profile, role: e.target.value })}
                        >
                            <option value='' disabled>Select your role</option>
                            <option value='USER'>User</option>
                            <option value='ADMIN'>Admin</option>
                            <option value='FACULTY'>Faculty</option>
                            <option value='STUDENT'>Student</option>
                        </select>
                    </div>
                    <button onClick={saveProfile} className='btn btn-primary w-100 mb-3'>
                        <FaSave className='me-2' /> Save
                    </button>
                    <button onClick={signout} className='btn btn-danger w-100'>
                        <FaSignOutAlt className='me-2' /> Sign out
                    </button>
                </div>
            )}
        </div>
    )
}
