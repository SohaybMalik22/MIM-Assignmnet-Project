import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Login.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
// import {setLocalStorage} from '../../utils/storageUtil'


const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        debugger
        e.preventDefault();

        if (!email || !password) {
            setError('fields cannot be empty!')
            return;
        }

        const post = { email: email, password: password }

        try {
            const res = await axios.post('http://localhost:3000/auth/login/', post)
            if(res.data){
                navigate('/')
                resetForm('')
                setError('')
            }
            else{
                setError('enter the correct password')
            }

        } catch (e) {
            setError('you donot signin')
        }
    }

    const resetForm = () => {
        setEmail('');
        setPassword('');
    }

    const handleClick = () => {
        navigate('/signup')
    }

    useEffect(() => {
        if(email && password){
            localStorage.setItem("email", JSON.stringify(email));
        }
      }, [email, password]);

    return (
        <div>
            <div className='row'>
                <div className='col-md-5'>
                </div>

                <div className='col-md-3'>
                    <Form className='input-style'>

                    <Form.Group className="mb-3" controlId="formBasicEmail" >
                            <Form.Label style={{fontSize: '25px'}}>Log In</Form.Label>
                        </Form.Group>
                        
                        <Form.Group className="mb-3" controlId="formBasicEmail" >
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password} 
                                required />
                        </Form.Group>

                        <div className="error" style={{color: 'red', fontSize: '15px'}}>
                            {error}
                        </div>

                        <div className="txt-style" >
                           <p onClick={handleClick} style={{textDecoration: "underline"}}>Signup</p>
                        </div>

                        <Button variant="primary" type="submit" style={{backgroundColor: 'white', color: '#212529b5', marginBottom: '15px'}} onClick={handleSubmit}>
                            Log In
                        </Button>
                    </Form>
                </div>

                <div className='col-md-4'>
                </div>
            </div>
        </div>
    )
}

export default Login