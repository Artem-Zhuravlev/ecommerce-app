import React, { useState } from 'react';
import UserNav from "../../components/nav/UserNav";
import { auth } from '../../firebase';
import { toast } from "react-toastify";

const Password = () => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await  auth.currentUser.updatePassword(password)
      .then(() => {
        setLoading(false)
        setPassword('')
        toast.success('Password updated')
      })
      .catch(err => {
        setLoading(false)
        toast.error(err.message)
      });
  }

  const passwordUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-outline mb-4">
        <label class="form-label">Your password</label>
        <input
          type="password"
          onChange={e => setPassword(e.target.value)}
          className='form-control mb-2'
          placeholder='Enter new password'
          disabled={loading}
          value={password}
        />
        <button className='btn btn-primary btn-rounded' disabled={!password || loading}>
          { loading ? (
              <>
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span className='d-inline-flex ms-2'>Loading...</span>
              </>
            ) : 'Submit'
          }

        </button>
      </div>
    </form>
  )

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col pt-4">
          <h4>Password Update</h4>
          { passwordUpdateForm() }
        </div>
      </div>
    </div>
  );
}

export default Password;
