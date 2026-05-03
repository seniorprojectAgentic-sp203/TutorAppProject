import { useNavigate } from 'react-router-dom';
import '../styles/homepage.css';
import { selectUsers } from '../database/userSlice';
import { addDoc, arrayUnion, collection, doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig"
import { useDispatch, useSelector } from 'react-redux';
import { clearSession, selectSessions, setSession } from '../database/sessionSlice';

function HomePage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(selectUsers);
    const sessionRef = collection(db, "sessions");
    const tutorId = "tutor-bot";

    async function handleNewSession() {
        if (!user?.currentUser?.id) {
            return;
        }
        if (confirm("Create a new tutor session?")) {
            try {
                const timeElapsed = Date.now();
                const timestamp = new Date(timeElapsed);
                const sessionDoc = await addDoc(sessionRef, {
                    userId: user.currentUser.id,
                    messages: arrayUnion({
                        text: "Hello, how can I help you today?",
                        createdAt: timestamp.toUTCString(),
                        senderId: tutorId,
                    }),
                    initialSessionDate: serverTimestamp(),
                });
                dispatch(setSession({ id: sessionDoc.id }));
                navigate("/newsession");
            }
            catch (error) {
                console.error(error);
                dispatch(clearSession());
            }
        }
        else {
            console.log("Cancelled");
        }
    }


    return (
        <div className="home">
            <h1>Welcome to Tutor Bot</h1>
            <p>Click the "Session History" button to view your previous tutoring sessions <br/>
                or start a new session by clicking the "New Tutor Session" button</p>
            <div className="home-grid">
                <button onClick={() => navigate("/sessionhistory")}>Session History</button>
                <button onClick={handleNewSession}>New Tutor Session</button>
            </div>
        </div>
    );
}

export default HomePage