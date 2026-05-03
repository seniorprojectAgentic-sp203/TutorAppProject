import { useEffect, useState } from 'react';
import '../styles/chatbox.css';
import { db } from '../firebase/firebaseConfig';
import { arrayUnion, collection, doc, getDoc, onSnapshot, serverTimestamp, updateDoc } from 'firebase/firestore';
import { selectUsers } from '../database/userSlice';
import { useSelector } from 'react-redux';
import { selectSessions } from '../database/sessionSlice';

function ChatBox() {

    const user = useSelector(selectUsers);
    const session = useSelector(selectSessions);
    const [message, setMessage] = useState("");
    const [userMessages, setUserMessages] = useState([]);
    const sessionRef = collection(db, "sessions");

    useEffect(() => {
        if (!session?.currentSession?.id) {
            return;
        }

        const unsubscribe = onSnapshot(doc(db, "sessions", session.currentSession.id), (snapshot) => {
            if (snapshot.exists()) {
                setUserMessages(snapshot.data().messages || []);
            }
        });
        return () => unsubscribe();
    }, [session?.currentSession?.id]);

    async function addMessage(e) {
        e.preventDefault();

        if (!message.trim()) {
            return;
        }
        if (!session?.currentSession?.id) {
            return;
        }

        const docRef = doc(sessionRef, session.currentSession.id);

        try {
            const timeElapsed = Date.now();
            const timestamp = new Date(timeElapsed);
            await updateDoc(docRef, {
                messages: arrayUnion({
                    text: message,
                    createdAt: timestamp.toUTCString(),
                    senderId: user.currentUser.id,
                })
            });

            setMessage("");
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div className="chatbox">
                <div className="chatarea">
                    {userMessages.map((msg, index) => {
                        const isUserMessage = msg.senderId === user.currentUser.id;

                        return (
                            <div key={index}
                                className={`message ${isUserMessage ? "own" : ""}`}
                            >
                                <img src={isUserMessage ? "user.png" : "logo.png"}
                                    alt={isUserMessage ? "user" : "tutor"}>
                                </img>
                                <div className='text'>
                                    <p>{msg.text}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="chatinput">
                    <form onSubmit={addMessage}>
                        <input className="userinput" type="text" value={message} onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type a message..." />
                        <button type='submit'>Send</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ChatBox