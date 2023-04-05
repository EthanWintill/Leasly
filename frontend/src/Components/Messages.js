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
                    <div className="messagerInfo">
                        <p className="messagerName">Ayyy yyooo</p>
                    </div>
                    <div className="messageHistory">

                    </div>
                    <div className="messageTypeBox">
                        
                        <textarea></textarea>
                        <button className="messageSendBtn" type="button">Send Message</button>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Messages