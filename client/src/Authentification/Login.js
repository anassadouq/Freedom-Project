import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AccountService } from './AccountService';
import axios from 'axios';
import Header from '../Components/Header/Header'

export default function Login() {
  let navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const onChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
    setErrorMessage("");
  };

  const onSubmit = (e) => {
    e.preventDefault();

    axios.post('http://127.0.0.1:8000/api/login', credentials)
      .then(res => {
        AccountService.saveToken(res.data.token);
        if (credentials.email === 'admin@gmail.com') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      })
      .catch(error => {
        setErrorMessage("Email or Password incorrect. Please try again.");
      });
  };

  return (
    <div>
      <div className="container my-5">
        <div className="my-4 card mx-auto" style={{ maxWidth: '600px' }}>
          <div className="card-body">
            <h1 className="text-center">Login</h1>
            <form onSubmit={onSubmit}>
              <div className="row">
              </div>

              <div className='form-group'>
                <b>Email</b>
                <input type="text" name="email" onChange={onChange} className="form-control my-3" placeholder="Enter Your Email Address" />
              </div>

              <div className='form-group'>
                <b>Password</b>
                <input type="password" name="password" onChange={onChange} className="form-control my-3" placeholder="*******" />
                <button type="submit" className="form-control btn btn-dark btn-block" >Login</button><br/><br/>
              </div>

              <center>
                <span>I don't have an account.</span>
                <span>
                  <Link to="/register" className="text-center mx-2">Register</Link>
                </span>
              </center>
            </form>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}