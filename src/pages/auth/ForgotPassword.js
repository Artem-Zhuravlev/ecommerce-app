import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';


const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { user } = useSelector((state) => ({...state}));

  useEffect(() => {
    if (user && user.token) navigate('/');
  }, [navigate, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
      handleCodeInApp: true
    };

    await auth.sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail('')
        setLoading(false)
        toast.success('Check your email for password reset link')
      }).catch((error) => {
        setLoading(false)
        toast.error(error.message)
      });
  }

  return (
    <div
      className='container col-md-6 offset-md-3 pt-5'
    >
      {loading ? <h4 className='text-danger mb-5'>Loading...</h4> : <h4 className='mb-5'>Forgot password</h4>}
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <input
            type="email"
            className='form-control'
            value={email}
            onChange={(e) =>setEmail(e.target.value)}
            placeholder='Type your email'
            autoFocus
          />
        </div>
        <Button
          type='primary'
          htmlType='submit'
          size='large'
          secondary
          disabled={!email}
        >Submit</Button>
      </form>
    </div>
  )
}

export default ForgotPassword
