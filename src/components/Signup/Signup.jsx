import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import './Signup.css'
import axios from 'axios';

const Signup = () => {

    const navigate = useNavigate();
    const [balance, setBalance] = useState('');
    const [account, setAccount] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpass, setConfirmPass] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        debugger
        e.preventDefault();

        if ( !balance || !account || !email || !password || !confirmpass) {
            setError('fields cannot be empty!')
            return;
        }

        if (password !== confirmpass) {
            setError('password does not match!')
        }

        if(password === confirmpass){
            const post = { balance: balance, account: account, email: email, password: password, confirmpass: confirmpass }

            try {
                const res = await axios.post('http://localhost:3000/auth/signup/', post)
                console.log(res.data)
                resetForm()
                setError('')
                navigate('/')
    
            } catch (e) {
                alert(e)
            }
        }
    }

    const resetForm = () => {
        setBalance('')
        setAccount('')
        setEmail('')
        setPassword('')
        setConfirmPass('')
    }

    useEffect(() => {
        if(email && account && balance){
            localStorage.setItem("account", JSON.stringify(account));
            localStorage.setItem("balance", JSON.stringify(balance));
        }
      }, [email, account]);

    return (
        <div>
            <div className='row'>
                <div className='col-md-5'>
                </div>

                <div className='col-md-3'>

                    <Form className='input-style'>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label style={{fontSize: '25px'}}>Sign Up</Form.Label>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Account Number</Form.Label>
                            <Form.Control
                                type="account"
                                placeholder="enter account #"
                                onChange={(e) => setAccount(e.target.value)}
                                value={account}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Balance</Form.Label>
                            <Form.Control
                                type="balance"
                                placeholder="your balance"
                                onChange={(e) => setBalance(e.target.value)}
                                value={balance}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
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

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                onChange={(e) => setConfirmPass(e.target.value)}
                                value={confirmpass} 
                                required />
                        </Form.Group>

                        <div className="error text-style">
                            {error}
                        </div>

                        <Button variant="primary" type="submit" style={{backgroundColor: 'white', color: '#212529b5', marginBottom: '15px'}} onClick={handleSubmit}>
                            Sign Up
                        </Button>
                    </Form>

                </div>

                <div className='col-md-4'>
                </div>
            </div>
        </div>
    )
}

export default Signup