import {io} from 'socket.io-client';
import { useEffect, useState } from 'react';



const socket = io("http://localhost:5000/");

const Home = () =>{

    const [message, setMessage] = useState<string>("");
    const [messages, setMessages] = useState<string[]>([]);
    const handleSubmit = () => {
        if (message.trim()) {
            socket.emit("send_message", { message }); // Emit the message to the server
            setMessage(""); // Clear the input field
        }
    };

    useEffect(() => {
        // Define the message handler
        const handleReceiveMessage = (msg: { message: string }) => {
            console.log("Message received on client:", msg);
            setMessages((prevMessages) => [...prevMessages, msg.message]);
        };

        // Listen for `receive_message` events
        socket.on("receive_message", handleReceiveMessage);

        // Cleanup on component unmount to prevent memory leaks
        return () => {
            socket.off("receive_message", handleReceiveMessage);
        };
    }, []);

    return(
        <>
            <h2>Chat App</h2>
            <input type="text" id="message" placeholder="Enter" onChange={(e)=>{
                setMessage(e.target.value);
            }}/>
            <button id="btn" onClick={handleSubmit}>Send</button>
            <h1>Message :</h1>
           
                {messages.map((msg, index) => (
                    <p key={index}>{msg}</p> // Display each message in a list
                ))}
            
        </>
    );
}

export default Home;