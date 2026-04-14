import { Link, NavLink } from "react-router-dom"
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useDispatch } from "react-redux";
import { setUser } from "../database/userSlice";
import '../styles/sidebar.css';

function SideBar(){

    const dispatch = useDispatch();

    function handleSignOut(){
        if(confirm("Are you sure you want to log out?"))
        signOut(auth).then(() =>{
            dispatch(setUser(null));
        }).catch((error)=>{
            console.log(error);
        });
    }

    return  (
    <nav className= "sidebar">
        <img src="/logo.png" alt="logo"></img> {/*created by Muhammad Atif*/}
        <span className="title">Tutor Bot</span>
        <ul>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="/sessionhistory">Session History</NavLink>
            </li>
            <li>
                <NavLink to="/newsession">New Session</NavLink>
            </li>
            <li>
                <Link to="/" onClick={handleSignOut}>Logout</Link>
            </li>
        </ul>
        
    </nav> 
    );
}

export default SideBar