import React, { useState, useEffect } from 'react'
import './home.css'
import { useNavigate } from "react-router-dom";
import SendMoney from './SendMoney';
import History from './History';
import RecieveMoney from './RecieveMoney';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {

  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showHistory, setShowHistory] = useState(false)
  const [showReceive, setShowReceive] = useState(false)


  useEffect(() => {
    const data = localStorage.getItem("email")
    if (!data) {
      navigate('/login')
    }
  }, [])

  const handleClick = () => {
    setShow(true)
    setShowReceive(false)
    setShowHistory(false)
  }

  const handleReceive = () => {
    setShowReceive(true)
    setShow(false)
    setShowHistory(false)
  }

  const handleHistory = () => {
    setShowHistory(true)
    setShow(false)
    setShowReceive(false)

  }

  return (
    <>
      <div className='row'>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">

          <div className='col-md-2' style={{ textAlign: 'center' }}>
            <img className='nav-style' src='https://www.myimpactmeter.com/wp-content/uploads/2022/09/Logo-With-Taglin.png' style={{ maxWidth: '70%' }} />
          </div>

          <div className='col-md-6' style={{ width: '60%' }}>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                <li className="nav-item active">
                  <Link className='text-style' onClick={handleClick}>Send Money</Link>
                </li>
                <li className="nav-item">
                  <Link className='text-style' onClick={handleReceive}>Receive Money</Link>
                </li>
                <li className="nav-item">
                  <Link className='text-style' onClick={handleHistory}>Transaction History</Link>

                </li>
              </ul>
            </div>
          </div>
          <div className='col-md-4' style={{ textAlign: 'center' }}>

            <div >
              <button disabled={true} className='btn-style'>
                LogOut
              </button>
            </div>

          </div>
        </nav>
      </div>

      {
        show && <SendMoney/>
      }

      {
        showReceive && <RecieveMoney />
      }

      {
        showHistory && <History />
      }

    </>

  )
}

export default Home




