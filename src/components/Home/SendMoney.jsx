import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const SendMoney = () => {

    const [balance, setBalance] = useState('')
    const [email, setEmail] = useState()
    const [sender, setSender] = useState()
    const [reciver, setReciver] = useState('')
    const [money, setMoney] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        const data = localStorage.getItem("email")
        const data1 = JSON.parse(data)
        const db_account = localStorage.getItem("account")
        const db1 = JSON.parse(db_account)
        const db_balance = localStorage.getItem("balance")
        const db2 = JSON.parse(db_balance)
        setEmail(data1)
        setSender(db1)
        setBalance(db2)

    }, [])

    const handleSubmit = async (e) => {
        debugger
        e.preventDefault();

        if (!email || !sender || !reciver || !money) {
            setError('fields cannot be empty!')
            return;
        }

        if (reciver.length !== 11) {
            setError("Enter the correct account number")
            return;
        }

        if (money === 0) {
            setError('cannot send 0!')
            return;
        }

        if (balance !== 0) {
        const post = { email: email, sender: sender, reciver: reciver, money: money }
        try {
            const res = await axios.post('http://localhost:3000/auth/sendmoney', post)
            console.log(res)
            if (res.data === "Error") {
                setError('sorry something went wrong')
                resetForm()
            }
            else {
                const transferData = balance - money
                localStorage.setItem("balance", JSON.stringify(transferData));
                resetForm()
                setError('')
                alert("Send Successfully")
                window.location.reload()
            }

        } catch (e) {
            alert(e)
        }

        }
    }

    const resetForm = () => {
        setEmail('');
        setSender('');
        setReciver('');
        setMoney('');
    }


    return (
        <div>
            <div className='row'>
                <div className='col-md-4'>
                </div>

                <div className='col-md-4'>
                    <Form className='input-style'>
                        {
                            balance ?
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label style={{ fontSize: '25px' }}>Your Balance: {balance}</Form.Label>
                                </Form.Group>
                                :
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label style={{ fontSize: '25px' }}>Your Balance: 0</Form.Label>
                                </Form.Group>

                        }

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Reciver Account</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="enter number"
                                onChange={(e) => setReciver(e.target.value)}
                                value={reciver}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Enter Money</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="enter amount"
                                onChange={(e) => setMoney(e.target.value)}
                                value={money}
                                required
                            />
                        </Form.Group>

                        <div className="error" style={{ color: 'red', fontSize: '12px' }}>
                            {error}
                        </div>


                        <Button variant="primary" type="submit" style={{ backgroundColor: 'white', color: '#212529b5', marginBottom: '15px' }} onClick={handleSubmit}>
                            Send
                        </Button>

                    </Form>

                </div>

                <div className='col-md-4'>
                </div>
            </div>

        </div>
    )
}

export default SendMoney