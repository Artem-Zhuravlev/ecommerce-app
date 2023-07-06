import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({...state}));

  useEffect(() => {
    if (user && user.token) navigate('/')
  }, [navigate, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true
    }

    await auth.sendSignInLinkToEmail(email, config);
    toast.success(`Email is sent to ${email}. Click the link to complete your registration`);
    window.localStorage.setItem('emailForRegistration', email);
    setEmail('');
  }

  const registerForm = () => (
    <form onSubmit={ handleSubmit }>
      <input
        type="email"
        className="form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
        placeholder='Your email'
      />

      <button
        type="submit"
        className="mt-4 btn btn-primary"
      >
        Register
      </button>
    </form>
  )

  return (
    <div className='container pt-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <h4 className='mb-5'>Register</h4>
          { registerForm () }
        </div>
      </div>
    </div>
  )
}

export default Register;
