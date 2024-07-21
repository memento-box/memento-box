import axios from 'axios';
import { useEffect, useState } from 'react';
import './AccountInfo.css';
import moment from 'moment/moment';

function AccountInfo() {   
    const [email, setEmail] = useState('');
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [orderHist, setOrderHist] = useState([]);

    const getInfo = () => {
        axios.get('/api/userInfo/acct').then(response => {
            console.log('User Info Get:', response);
            const info = response.data[0];
            setEmail(info.username);
            setFName(info.first_name);
            setLName(info.last_name);
            setBirthday(info.birthday);
            // const hist = response.data.map((order) => ({
            //     date: order.box_created_at,
            //     recipient: order.recipient_name,
            //     id: order.box_id
            // }));
            const hist = response.data.map((order) => ([
                order.box_created_at,
                order.recipient_name,
                order.box_id
            ]));
            setOrderHist(hist)
            // console.log(hist);
        }).catch(error => {
            console.log('Error:', error);
            alert('Something went wrong!')
        })
    };

    useEffect(() => {
        getInfo();
    }, [])

    console.log('Order History:', orderHist);

    return(
        <div id='wrapper'>
            <div id='border'>
                <div id='acctInfo'>
                    <h3>Your Info</h3>
                    <p>Name: {fName} {lName}</p>
                    <p>Email: {email}</p>
                </div>
                <div id="orderHistory">
                    <h3>Order History</h3>
                    {
                        orderHist.map((order) => (
                            <div key={order[2]} className='order'>
                                <p>{order[1]} on {moment(order[0]).format('LL')}</p>
                            </div>
                            
                        ))
                    }
                </div>
            </div>

        </div>
    )
}

export default AccountInfo;