import { Link, NavLink } from "react-router-dom"
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { setUser } from "../database/userSlice";
import '../styles/sidebar.css';
import { selectUsers } from '../database/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addDoc, arrayUnion, collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig"
import { useNavigate } from 'react-router-dom';
import { clearSession, selectSessions, setSession } from '../database/sessionSlice';

function SideBar() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(selectUsers);
    const sessionRef = collection(db, "sessions");
    const tutorId = "tutor-bot";

    async function handleNewSession(e, pagePath) {
        e.preventDefault();

        if (!user?.currentUser?.id) {
            return;
        }
        const confirmed = confirm("Create a new tutor session?")
        if (confirmed) {
            try {
                const timeElapsed = Date.now();
                const timestamp = new Date(timeElapsed);
                const sessionDoc = await addDoc(sessionRef, {
                    userId: user.currentUser.id,
                    messages: arrayUnion({
                        text: "Hello, how can I help you today?",
                        createdAt: timestamp.toUTCString(),
                        senderId: tutorId,
                        role: "tutor",
                    }),
                    initialSessionDate: serverTimestamp(),
                });
                dispatch(setSession({ id: sessionDoc.id }));
                navigate(pagePath);
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


    function handleSignOut() {
        if (confirm("Are you sure you want to log out?"))
            signOut(auth).then(() => {
                dispatch(setUser(null));
            }).catch((error) => {
                console.log(error);
            });
    }

    return (
        <nav className="sidebar">
            <div className="navLeft">
                <img src="/logo.png" alt="logo"></img> {/*created by Muhammad Atif*/}
                <span className="title">Tutor Bot</span>
            </div>
            <ul>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/sessionhistory">Session History</NavLink>
                </li>
                <li>
                    <NavLink to="/newsession" onClick={(e) => handleNewSession(e, "/newsession")}>New Session</NavLink>
                </li>
                <li>
                    <Link to="/" onClick={handleSignOut}>Logout</Link>
                </li>
            </ul>

        </nav>
    );
}

export default SideBar