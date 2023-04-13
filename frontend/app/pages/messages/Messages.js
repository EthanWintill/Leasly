import React from 'react';
import holderPFP from '../../../assets/profile/dog.jpg';
import {getDoc, doc, updateDoc, arrayUnion} from 'firebase/firestore';
import './Messages.css';
import {db, auth} from '../../util/FirebaseFuncs';
import {useState, useEffect} from 'react';

export default function Messages() {
  const [messageList, setMessageList] = useState([]);
  const [focusedUser, setFocusedUser] = useState([]);
  const [messagerName, setMessagerName] = useState(' ');
  /* not neccessary, but will optimize later*/
  const [focusedID, setFocusedID] = useState();
  const sendMessage = async ()=>{
    const senderTempArr = messageList.Inbox;
    // update current user conversation
    const message = {
      message: document.getElementById('messageBox').value,
      UID: auth.currentUser.displayName,
    };
    const docRef = doc(db, 'userData', auth.currentUser.displayName );
    try {
      senderTempArr[focusedID].conversation.push(message);
      // const searchParam = auth.currentUser.displayName
      await updateDoc(docRef, {
        'user.Inbox': senderTempArr,
      });
    } catch {
      const data = {
        user: {
          Inbox: [
            {
              conversation: [
                {
                  message: document.getElementById('messageBox').value,
                  UID: auth.currentUser.displayName,
                },
              ],
              senderID: messagerName,
            },
          ],
        },
      };
      await updateDoc(docRef, data);
    }

    // update reciever conversation
    const searchParam = messagerName;
    const receiverDocRef = doc(db, 'userData', searchParam);
    const receiverDocSnap = await getDoc(receiverDocRef);
    if (receiverDocSnap.exists()) {
      const receiverTempArr = receiverDocSnap.data().user.Inbox;
      let found = false;
      receiverDocSnap.data().user.Inbox.forEach(async (convo, index) =>{
        // if found, add to doc
        if (convo.senderID === auth.currentUser.displayName) {
          receiverTempArr[index].conversation.push(message);
          await updateDoc(receiverDocRef, {
            'user.Inbox': receiverTempArr,
          });
          found = true;
        }
      });
      // if not found, merge with new information to create a conversation
      if (found === false && receiverTempArr.length === 0) {
        const data = {
          conversation: [
            {
              message: document.getElementById('messageBox').value,
              UID: auth.currentUser.displayName,
            },
          ],
          senderID: auth.currentUser.displayName,
        };
        await updateDoc(receiverDocRef, {
          'user.Inbox': arrayUnion(data),
        });
      }
    } else {
      // docSnap.data() will be undefined in this case
      console.log('No such document!');
    }
    /* const recieverDocSnap = await updateDoc(receiverDocRef, {
      'user.Inbox': tempArr,
    });*/
    updateMessages();
  };

  const updateMessages = async () =>{
    console.log(auth.currentUser.uid);
    const searchParam = auth.currentUser.displayName;
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

  useEffect(() => {
    console.log(auth.currentUser.displayName, auth.currentUser.email);
    updateMessages();
  });

  // changes the focused account that will display the conversation. Needs to clear div of all content first
  const changeConversation = async (id) =>{
    setFocusedUser(messageList.Inbox[id].conversation);
    setMessagerName(messageList.Inbox[id].senderID);
    setFocusedID(id);
    console.log(messageList.Inbox[id].senderID);
  };

  const createNewConversation = async () =>{
    const searchParam = document.querySelector('.usernameMsgSearch').value;
    const docRef = doc(db, 'userData', searchParam);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      document.querySelector('.usernameMsgError').innerHTML = 'Enter a username to start a new message!';
      // username Found now change messagerName
      setMessagerName(searchParam);
    } else {
      // docSnap.data() will be undefined in this case
      document.querySelector('.usernameMsgError').innerHTML = 'This user does not exist!';
    }
  };

  return (
    <div>
      <div className="messagesContainer">
        <br />
        <div className="messagesUserList">
          <div className="newMessageContainer">
            <p className="usernameMsgError"> Enter a username to start a new message!</p>
            <input type="text" placeholder="Enter users email address" className="usernameMsgSearch"/>
            <button type="button" onClick={()=>{
              createNewConversation();
            }}>Send</button>
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

export {
  Messages,
};
