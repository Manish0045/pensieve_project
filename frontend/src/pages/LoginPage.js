import '../App.css';
import React, { useState } from 'react';
// import Homepage from './Homepage';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:8000/users/login', {
            method: 'POST',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({ username: username, password: password })
        })
            .then((res) => res.json())
            .then(result => {
                // console.log(result.data[0].username)
                if (result.code === 401) {
                    console.log("Invalid Credential");
                    alert("Invalid Credential");
                    setIsError('true');
                    navigate('/');
                } else {
                    console.log("Logged In");
                    navigate('/home', { state: result.data[0].username });
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="container">
            <div className="loginForm">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="text-center">Login</h3>
                        </div>
                        <div className="card-body">
                            <form action='/' method='POST' onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" placeholder="Enter your email" name='username' autoComplete="username"
                                        style={{ borderColor: isError ? "red" : "green" }}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" placeholder="Enter your password" name='password' autoComplete="current-pasword"
                                        style={{ borderColor: isError ? "red" : "green" }}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3 form-check">
                                    <input type="checkbox" className="form-check-input" id="rememberMe" />
                                    <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div >
            </div>
        </div >
    )
}

export default LoginPage
