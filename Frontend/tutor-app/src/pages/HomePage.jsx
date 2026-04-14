import { useNavigate } from 'react-router-dom';
import '../styles/homepage.css';

function HomePage(){

    const navigate = useNavigate();

    return (
    <div className="home">
        <h1>Welcome to Tutor Bot</h1>
        <p>Click the "Session History" button to view your previous tutoring sessions 
            or start a new session by clicking the "New Tutor Session" button</p>
        <div className="home-grid">
            <button onClick={() => navigate("/sessionhistory")}>Session History</button>
            <button onClick={() => navigate("/newsession")}>New Tutor Session</button>
        </div>
    </div>
    );
}

export default HomePage