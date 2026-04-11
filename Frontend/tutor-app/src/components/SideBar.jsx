import { Link } from "react-router-dom"
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useDispatch } from "react-redux";
import { setUser } from "../database/userSlice";

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
    <div className= "sidebar">
        <Link to="/">
                <button>Home</button>
            </Link>
            <Link to="/SessionHistory">
                <button>Session History</button> 
            </Link>
            <Link to="/NewSession">
               <button>New Session</button>
            </Link>
            <Link to="/">
                <button onClick={handleSignOut}>Logout</button>
        </Link>
    </div> 
    );
}

export default SideBar