import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './home.css'

const RecieveMoney = () => {

    const [db_data, setDb_Data] = useState([]);
    const [db_acount, setDb_Account] = useState('')

    const getApiData = async () => {
        const res = await axios.get('http://localhost:3000/auth/singleUser')
        setDb_Data(res.data);
    }

    useEffect(() => {
        getApiData()
        const data = localStorage.getItem("account")
        const data1 = JSON.parse(data)
        setDb_Account(data1);
    }, [])
    return (
        <>

            {db_data?.map(({ sender, reciver, money }, index) => {
                return (
                    <div key={index}>
                        <div className='row'>
                            <div className='col-md-4'></div>
                            <div className='col-md-4'>
                                {reciver === db_acount ?
                                    <div className="p-style">
                                        <p>
                                            Sender Account: {sender} <br />
                                        </p>
                                        <p>
                                            Amount Transfer: {money} <br />
                                        </p>
                                    </div>
                                    :
                                    <div className="p-style">
                                          <p>
                                        You don't receive any money yet.
                                    </p>
                                    </div>
                                  
                                }


                            </div>
                            <div className='col-md-4'></div>
                        </div>
                    </div>
                )
            }
            )}
        </>
    )
}

export default RecieveMoney