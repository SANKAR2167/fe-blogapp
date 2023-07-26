import { Button, Card, TextField } from '@mui/material';
import React from 'react';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';
import { API } from './global';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

export default function Login(){

    const navigate = useNavigate();

    React.useEffect(()=>{
        if(localStorage.getItem("token")) navigate("/")
    })
    const { handleChange, values, handleSubmit } = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: (values) => {
            //  console.log(values);

            fetch(`${API}/bl_users/login`, {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(values)
            })
            .then((data) => data.json())
            .then(data => {
            if (data.status === 401) {
                toast.error ("Login Failed");
                console.log("Login Failed");
            } else {
                console.log(data);
                localStorage.setItem("Auth", values.email)
                toast.success("Login Success");
                localStorage.setItem("token",data.token);
                navigate("/");
                window.location.reload();
            }
            

        })}
    })


    return (
        <form className='login' onSubmit={handleSubmit}>
            <Card className='login-card'>
                <h2><VpnKeyIcon /> Sign In</h2>
                <div className='login-input'>
                    <TextField
                        name="email"
                        label="Email"
                        type='email'
                        variant="outlined"
                        onChange={handleChange}
                        value={values.eMAIL}
                    />

                    <TextField
                        name="password"
                        label="Password"
                        variant="outlined"
                        type='password'
                        onChange={handleChange}
                        value={values.password}
                    />
                    <Button variant="contained" type="submit" color='error'>Login<LoginIcon /></Button>

                    <p className='text'>Don't have an account <span onClick={() => navigate(`/bl_users/signup`)} className='nav'>Register</span> here</p>
                </div>
            </Card>
        </form>
    )
}
