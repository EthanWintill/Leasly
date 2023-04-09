import Navbar from "./Navbar"
import './Messages.css'
import holderPFP from '../imgs/holderPFP.jpg'
const Messages = () =>{
    return(
        <div>
            <div>
                <Navbar></Navbar>
            </div>
            <div className="messagesContainer">
                <br></br>
                <div className="messagesUserList">

                    {/*this will have to be ternary based on a state. If there are other users they have had a conversation with
                        ,each one will be its own div*/}
                    <div className="indivUser">
                        <img className="indivUserImg" src={holderPFP}></img>
                        {/* will hold the username of the account talking too*/}
                        <p className="indivUserName"> temp user</p>
                        {/* will be a quick preview of the last recieved or sent message*/}
                        <p className="indivUserPreview"> random Message</p>
                    </div>
        
                </div>

                {/* another ternary based on state. If there are messages, it will default to loading the first message info,
                            if there are not any, all of this will just be blank until a user from the messages list is focused. */}

                <div className="messagesView">

                    <div className="messagerInfo">
                        <p className="messagerName">Ayyy yyooo</p>
                    </div>

                    {/*Holds the conversation log. Another state ternary. If theres a conversation, it will display the messages, if not,
                        stay empty*/}

                    <div className="messageHistory">

                            <div>
                                <div>
                                    <p> Woof! Woof! ARRRRRRRGH!  Woof! Woof!  Woof! Woof! Woof! Woof!</p>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <p> Bark! </p>
                                </div>
                            </div>

                    </div>
                    <div className="messageTypeBox">
                        <textarea></textarea>
                        {/*OnClick, send contents of textarea*/}
                        <button className="messageSendBtn" type="button">Send Message</button>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Messages