import Navbar from "./Navbar"
import './Messages.css'
import holderPFP from '../imgs/holderPFP.jpg'
import{ collection, getDoc, doc, updateDoc, arrayUnion} from "firebase/firestore"
import { db } from "../FirebaseFuncs"
import { auth  } from "../FirebaseFuncs"
import { useNavigate } from "react-router-dom"

import { useEffect, useState } from "react"
const Messages = () =>{

    const [messageList, setMessageList] = useState();
    const navigate = useNavigate()
    const sendMessage = async ()=>{
        const message = document.getElementById("messageBox").value
        const searchParam = auth.currentUser.uid+" "
        const docRef = doc(db, "userData", searchParam);
        const docSnap = await updateDoc(docRef, {
            "user.inbox.0.messages": arrayUnion(message)
          });
        
    }
    

    useEffect(() => {

        const getUserDataDoc = async () =>{
            console.log(auth.currentUser.uid)
            const searchParam = auth.currentUser.uid+" "
            

            const docRef = doc(db, "userData", searchParam);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data().user.inbox[0]);
                getMessages(docSnap.data().user);
              } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
              }
        }

       const getMessages = (userList) => {
            const messages = userList.inbox[0];
            setMessageList(messages)
            console.log(messages)
        }
        
        getUserDataDoc();
    }, [])

    
    
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
                        {(messageList) ? messageList.messages.map((message)=>
                                    <div>
                                        <div>
                                            <p>{message} </p>
                                        </div>
                                    </div>
                                )
                            :   <div>
                                    <div>
                                        <p>   </p>
                                    </div>
                                </div>
                        }
                    </div>
                    <div className="messageTypeBox">
                        <textarea id="messageBox"></textarea>
                        {/*OnClick, send contents of textarea*/}
                        <button className="messageSendBtn" type="button" onClick={()=>sendMessage()}>Send Message</button>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Messages