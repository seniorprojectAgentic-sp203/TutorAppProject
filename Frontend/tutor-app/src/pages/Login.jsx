import { useState } from "react";
import { auth } from "../firebase/firebaseConfig"
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../database/userSlice";
import '../styles/loginpage.css';

function Login(){
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [loginType, setLoginType] = useState('login');
    const [userCredentials, setUserCredentials] = useState({});
    const [error, setError] = useState("");

    onAuthStateChanged(auth, (user) =>{
        if(user){
            dispatch(setUser({id: user.uid, email: user.email}));
        }
        else{
            dispatch(setUser(null));
        }
    });

    function handleCredentials(e){
        setUserCredentials({...userCredentials, [e.target.name]: e.target.value});
    }

    function handleSignup(e){
        e.preventDefault();
        setError("");

        createUserWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
        .then((userCredential) =>{
            //Signed in
            const user = userCredential.user;

        })
        .catch((error) => {
            setError(error.message);
        });
    }

    function handleLogin(e){
        e.preventDefault();
        setError("");
        signInWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
        .then((userCredential) => {

            const user = userCredential.user;
        })
        .catch((error) => {
            setError(error.message);
        });
    }

    function handlePasswordReset(){
        const email = prompt("Please enter your email below:");
        sendPasswordResetEmail(auth, email);
        if(email.length !== 0){
            alert("Email sent! Check your inbox for instructions about password reset.");
        }
        
    }

    return(
        <div className="loginpage">
            <h1>Welcome to Tutor Bot</h1>
            <img src="logo.png" alt="logo" />
            <p>Login or create an account to continue</p>
            
            <div className="selector">
                <button className={`btn ${loginType == 'login' ? 'selected' : ''}`} onClick={() => setLoginType("login")}>Login</button>
                <button className={`btn ${loginType == 'signup' ? 'selected' : ''}`} onClick={() => setLoginType("signup")}>Signup</button>
            </div>
            <form>
                <div className="email">
                    <input type="text" name="email" placeholder="Email" onChange={(e) => {handleCredentials(e)}}></input>
                </div>
                <div className="password">
                    <input type="password" name="password" placeholder="Password" onChange={(e) => {handleCredentials(e)}}></input>
                </div>
                {
                    loginType == 'login' ?
                    <button className="loginbtn" onClick={(e)=> {handleLogin(e)}}>Login</button>
                    :
                    <button className="signupbtn" onClick={(e) => {handleSignup(e)}}>Signup</button>
                }
                {
                    error && <div className="error-msg">{error}</div>
                }

                <p className="forgot-password" onClick={handlePasswordReset}>Forgot Password?</p>                 
            </form>
        </div>
    );
}

export default Login

/**/