import { useState } from "react";
import './ContactPage.css'

function ContactPage() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    return(
        <form>
            <h2>Still have questions? Contact us</h2>
            <br/>
            <div className="inputFields">
            <input 
                type="text"
                placeholder="Full Name"
                value={fullName}
                required
                onChange={(e) => setFullName(e.target.value)}
            />
            <br />
            <input 
                type="text"
                placeholder="Email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <input 
                type="text"
                placeholder="Subject"
                value={subject}
                required
                onChange={(e) => setSubject(e.target.value)}
            />
            <br />
            <textarea 
                type="text"
                placeholder="Message"
                rows={4}
                value={message}
                required
                onChange={(e) => setMessage(e.target.value)}
            />
            </div>
            <br />
            <input type="submit" value="Send" />

        </form>
    )
}

export default ContactPage;