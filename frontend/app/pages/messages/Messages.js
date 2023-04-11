import React from 'react';

import holderPFP from '../../../assets/profile/dog.jpg';
import {collection, getDoc, doc, updateDoc, arrayUnion} from 'firebase/firestore';
import './Messages.css';
import {db, auth} from '../../util/FirebaseFuncs';
import {useState, useEffect} from 'react';

function Messages() {
  const [messageList, setMessageList] = useState([]);
  const [focusedUser, setFocusedUser] = useState([]);
  const [messagerName, setMessagerName] = useState(' ');
  /* not neccessary, but will optimize later*/
  const [focusedID, setFocusedID] = useState(0);

  const sendMessage = async ()=>{
    const tempArr = messageList.Inbox;
    console.log({tempArr});
    const message = {
      message: document.getElementById('messageBox').value,
      UID: 'DFASF',
    };
    tempArr[focusedID].conversation.push(message);

    const searchParam = auth.currentUser.displayName 
    const docRef = doc(db, 'userData', searchParam);
    const docSnap = await updateDoc(docRef, {
      'user.Inbox': tempArr,
    });
  };


  useEffect(() => {
    const getUserDataDoc = async () =>{
      console.log(auth.currentUser.uid);
      const searchParam = auth.currentUser.uid + ' ';


      const docRef = doc(db, 'userData', searchParam);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data().user.Inbox);
        getMessages(docSnap.data());
      } else {
        // docSnap.data() will be undefined in this case
        console.log('No such document!');
      }
    };

    const getMessages = (userList) => {
      const messages = userList.user;
      setMessageList(messages);
      console.log(userList.user.Inbox.length);
    };

    getUserDataDoc();
  }, []);

  // changes the focused account that will display the conversation. Needs to clear div of all content first
  const changeConversation = async (id) =>{
    setFocusedUser(messageList.Inbox[id].conversation);
    setMessagerName(messageList.Inbox[id].senderID);
    setFocusedID(id);
    console.log(messageList.Inbox[id].senderID);
  };


  return (
    <div>
      <div className="messagesContainer">
        <br />
        <div className="messagesUserList">
          <div className="newMessageContainer">
            <p> Send new message</p>
            <input type="text" placeholder="Enter users email address" />
            <button type="button">Send</button>
          </div>
          <div className="indivUserContainer">
            {/* this will have to be ternary based on a state. If there are other users they have had a conversation with
                        ,each one will be its own div*/}

            {(messageList.Inbox) ? messageList.Inbox.map((user, index)=>

              <div className="indivUser" key ={messageList.Inbox[index].senderID} onClick={()=>{
                changeConversation(index);
              }}>
                <img className="indivUserImg" src={holderPFP} />
                {/* will hold the username of the account talking too*/}
                <p className="indivUserName"> {messageList.Inbox[index].senderID}</p>
                {/* will be a quick preview of the last recieved or sent message*/}
                <p className="indivUserPreview"> {index}</p>
              </div>,
            ) :
                        <div>
                          <p>No messages</p>
                        </div>}

          </div>

        </div>

        {/* another ternary based on state. If there are messages, it will default to loading the first message info,
                            if there are not any, all of this will just be blank until a user from the messages list is focused. */}

        <div className="messagesView">

          <div className="messagerInfo">
            <p className="messagerName">{messagerName}</p>
          </div>

          {/* Holds the conversation log. Another state ternary. If theres a conversation, it will display the messages, if not,
                        stay empty*/}

          <div className="messageHistory">
            {(focusedUser) ? focusedUser.map((message)=>
              <div key={message.UID}>
                <div>
                  <p>{message.message} </p>
                </div>
              </div>,
            ) :
                            <div>
                              <div>
                                <p>   </p>
                              </div>
                            </div>
            }
            <div className="to-be-removed" />
          </div>
          <div className="messageTypeBox">
            <textarea id="messageBox" />
            {/* OnClick, send contents of textarea*/}
            <button className="messageSendBtn" type="button" onClick={()=>sendMessage()}>Send Message</button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Messages;
