import React, { useContext, useState } from 'react';
import './SignUp.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
const SignUp = () => {
    const {createUser} = useContext(AuthContext);
    const [error, setError] = useState('');

    const handleSignUp = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;
        
        setError('');
        form.reset();
        if(password !== confirm){
            setError('Your password did not match');
            return;
        }
        else if(password.length < 6){
            setError('password must be 6 characters');
            return;
        }

        createUser(email,password)
        .then(res => {
            
        })
        .catch(er => {
            console.log(er.message);
            setError(er.message);
        })
    }



    return (
        <div className='form-container'>
        <h1 className='form-title'>Sign Up</h1>

        <form onSubmit={handleSignUp} >

            <div className="form-control">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" required />
            </div>
            <div className="form-control">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" required />
            </div>
            <div className="form-control">
                <label htmlFor="password">Confirm Password</label>
                <input type="password" name="confirm" id="confirm" required />
            </div>

            <input className='btn-submit' type="submit" value="Sign Up" />
        </form>
        <p><small>Already have an account? <Link to='/login'>Login</Link></small></p>

        <p className='text-error'>{error}</p>

    </div>
    );
};

export default SignUp;