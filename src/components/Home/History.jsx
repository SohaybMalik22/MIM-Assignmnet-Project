import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { CSVLink } from 'react-csv';

const History = () => {

    const [db_data, setDb_Data] = useState([]);
    const [db_email, setDb_Email] = useState('')

    useEffect(() => {
        const data = localStorage.getItem("email")
        const d1 = JSON.parse(data)
        setDb_Email(d1);
    })

    const getApiData = async () => {
        const res = await axios.get('http://localhost:3000/auth/singleUser')
        console.log(res.data)
        setDb_Data(res.data);
    }

    useEffect(() => {
        getApiData()
    }, [])

    const data = db_data;
    const down_headers = [
        {
            label: 'email', key: 'email'
        },
        {
            labe: 'sender', key: 'sender'
        },
        {
            labe: 'reciver', key: 'reciver'
        },
        {
            labe: 'money', key: 'money'
        }
    ];

    const csvReport = {
        filename: 'Report.csv',
        headers: down_headers,
        data: data
    };

    return (
        <>
            <div className='svg-style'>
                <CSVLink {...csvReport}>
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" focusable="false" className="SVGstyle" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z">
                            download transactions detail
                        </path>
                    </svg>
                </CSVLink>
            </div>

            {db_data?.map(({ email, sender, reciver, money }, index) => {
                return (
                    <div key={index}>
                        <div className='row'>
                            <div className='col-md-4'></div>
                            <div className='col-md-4'>
                                {db_email === email ?
                                    <div className="p-style">
                                        <p>
                                            Reciever Account: {reciver} <br />
                                        </p>
                                        <p>
                                            Sender Account: {sender} <br />
                                        </p>

                                        <p>
                                            Amount Transfer: {money} <br />
                                        </p>
                                    </div>
                                    :
                                    <p>
                                        there is no transaction history.
                                    </p>
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

export default History