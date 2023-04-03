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
                <h1>Messages</h1>
                <div className="messagesUserList">
                    <div className="indivUser">
                        <img className="indivUserImg" src={holderPFP}></img>
                        <p className="indivUserName"> temp user</p>
                        <p className="indivUserPreview"> random Message</p>
                    </div>
                    <div className="indivUser">
                        <img className="indivUserImg" src={holderPFP}></img>
                        <p className="indivUserName"> temp user</p>
                        <p className="indivUserPreview"> random Message</p>
                    </div>
                    
                </div>
                <div className="messagesView">
                    <p>Ayyy yyooo</p>
                </div>
            </div>
        </div>
    )
}

export default Messages