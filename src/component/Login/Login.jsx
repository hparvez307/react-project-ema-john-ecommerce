import React, { useContext, useState } from 'react';
import './Login.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';

const Login = () => {

    const {signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [show,setShow] = useState(false);
    const from = location?.state?.from?.pathname || '/';

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email,password)
        .then( res => {
            console.log(res.user);
            form.reset();
            navigate(from, {replace: true})
        })
        .catch(er => {
            console.log(er.message);
        })
    }


    return (
        <div className='form-container'>
            <h1 className='form-title'>Login</h1>

            <form onSubmit={handleSubmit}>

                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" required />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type={show? 'text' : 'password'} name="password" id="password" required />
                    <h4 onClick={()=> { setShow(!show)}}><small>
                        {
                            show?'Hide password' : 'Show password'
                        }
                         </small></h4>
                </div>

                <input className='btn-submit' type="submit" value="Login" />
            </form>
            
            <p><small>New to ema-john? <Link to='/login'>Create a new account</Link></small></p>
        </div>
    );
};

export default Login;