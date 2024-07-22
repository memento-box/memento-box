import React, { useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import axios from 'axios';
import './ThankYouPage.css';

function ThankYouPage() {
    let [collabs, setCollabs] = useState([{first_name: 'Fatima', id: '1'}, {first_name: 'Charlie', id: '2'}, {first_name: 'Guillermo', id: '3'}, {first_name: 'Sasha', id: '4'}, {first_name: 'Priyanka', id: '5'}]);
    let [message, setMessage] = useState();
    let [isChecked, setIsChecked] = useState([]);
    let [sendNotif, setSendNotif] = useState(false)
    const { id } = useParams();

    // function getCollabs() {
    //     let collabData;
    //     axios.get(`/api/thanks/collaborators/${id}`).then((response) => {
    //         collabData = response.data
    //         console.log(collabData)
    //         axios.get(`/api/thanks/boxsender/${id}`).then((response) => {
    //             collabData.unshift(response.data[0]);
    //             setCollabs(collabData);
    //         }).catch((error) => {
    //             console.log('Error getting collaborators', error)
    //         })
    //     }).catch((error) => {
    //         console.log('Error getting collaborators', error)
    //     })  
    // }

    useEffect (() => {
        // getCollabs();

    }, [])

    function handleSubmit(event) {
        event.preventDefault;
        if (isChecked.length === 0) {
            alert('Please select someone to send a message!')
        } else if (message.trim().length == 0) {
            alert('Please type a message to send!')
        } else {
        console.log(message, isChecked);
        setMessage('');
        axios.post(`/api/thanks/messages`, {message: message, boxID: id}).then((response) => {
            for (let item of isChecked) {
            axios.post(`/api/thanks/userboxthanks`, {user: item, boxthanksID: response.data.rows[0].id}).then((response) => {
                setSendNotif(true)
                
            }).catch((error) => {
                console.log('Error posting to user box thanks', error)
            })
        }
        }).catch((error) => {
            console.log('Error sending message', error)
        })
        setTimeout(() => {
            setSendNotif(false)
          }, 2000);
        }
    }

    function handleCheck(event) {
        const checkedId = event.target.value;
        if(event.target.checked) {
            setIsChecked([...isChecked, checkedId]);
        } else {
            setIsChecked(isChecked.filter((id) => id !== checkedId)) 
        }
    }


  return (
    <div id='pageGrid'>
        <h1 id='heading'>Give Thanks!</h1>
        <h4 id='messageTitle'>Send a message</h4>
        <form id='messageForm' onSubmit={(e) => handleSubmit(e)}>
            <textarea id='message' value={message} onChange={(event) => setMessage(event.target.value)}/>
            <div id='collabs'>
            {collabs && (collabs.map((person) => 
            <div key={person.id}>
                <input className='collaborator' type='checkbox' value={person.id} onChange={(e) => handleCheck(e)} /> 
                <label>{person.first_name} {person.last_name}</label>
            </div>
            ))}
            </div> 
            <Button type='submit'
            variant='contained'
            sx={{borderRadius:"50px", backgroundColor:"black"}}
            id='sendButton'
            > Send </Button>
        </form>
        <p id='notif'>{sendNotif ? 'Success!' : ''}</p>
    </div>
  );
}

export default ThankYouPage;
