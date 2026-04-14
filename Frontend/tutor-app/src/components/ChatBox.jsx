import { useState } from 'react';
import '../styles/chatbox.css';

function ChatBox(){

    const [text, setText] = useState("");
    const [file, setFile] = useState(null);

    const handleFile = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    }

    return (
       <div className="chatbox">
          <div className="chatarea">
                <div className="message own">
                    <img src="user.png" alt="user" />
                    <div className="text">
                        <p>Message</p>
                    </div>
                </div>
                <div className="message">
                    <img src="logo.png" alt="user" />
                    <div className="text">
                        <p>Response</p>
                    </div>
                </div>
          </div>
          <div className="chatinput">
            <div>
                <input className="filechooser" type="file" onChange={handleFile}>{file && file.name}</input>
            </div>
            <input className="userinput" onChange={(e) => setText(e.target.value)}
             type="text" placeholder="Type a message..."/>
            
            <div>
                <button>Send</button>
            </div>
          </div>
       </div>
    );
}

export default ChatBox