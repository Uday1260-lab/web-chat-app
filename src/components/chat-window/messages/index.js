/* eslint-disable no-alert */
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Alert } from 'rsuite';
import { auth, database, storage } from '../../../misc/firebase';
import { groupBy, transformToArrWithId } from '../../../misc/helpers';
import MessageItem from './MessageItem';


const Messages = () => {
  const { chatId } = useParams();
  const [messages, setMessages] = useState(null);


  const isChatEmpty = messages && messages.length === 0;
  const canShowMessages = messages && messages.length > 0;


  useEffect(() => {
    const messagesRef = database.ref('/messages');


    messagesRef
      .orderByChild('roomId')
      .equalTo(chatId)
      .on('value', snap => {
        const data = transformToArrWithId(snap.val());
        setMessages(data);
      });
  }, [chatId]);


  const handleAdmin = useCallback(
    async uid => {
      const adminsRef = database.ref(`/rooms/${chatId}/admins`);


      let alertMsg;


      await adminsRef.transaction(admins => {
        if (admins) {
          if (admins[uid]) {
            admins[uid] = null;
            alertMsg = 'Admin permission removed';
          } else {
            admins[uid] = true;
            alertMsg = 'Admin permission granted';
          }
        }
        return admins;
      });
      Alert.info(alertMsg, 4000);
    },
    [chatId]
  );


  const handleLike = useCallback(async msgId => {
    const { uid } = auth.currentUser;
    const messageRef = database.ref(`/messages/${msgId}`);


    let alertMsg;


    await messageRef.transaction(msg => {
      if (msg) {
        if (msg.likes && msg.likes[uid]) {
          msg.likeCount -= 1;
          msg.likes[uid] = null;
          alertMsg = 'Like removed';
        } else {
          msg.likeCount += 1;
          if (!msg.likes) {
            msg.likes = {};
          }
          msg.likes[uid] = true;
          alertMsg = 'Like added';
        }
      }
      return msg;
    });
    Alert.info(alertMsg, 4000);
  }, []);


  const handleDelete = useCallback(
    async (msgId,file) => {
      if (!window.confirm('Delete this message?')) {
        return;
      }


      const isLast = messages[messages.length - 1].id === msgId;


      const updates = {};


      updates[`/messages/${msgId}`] = null;


      if (isLast && messages.length > 1) {
        updates[`/rooms/${chatId}/lastMessage`] = {
          ...messages[messages.length - 2],
          msgId: messages[messages.length - 2].id,
        };
      }


      if (isLast && messages.length === 1) {
        updates[`/rooms/${chatId}/lastMessage`] = null;
      }


      try {
        await database.ref().update(updates);
        Alert.info('Message has been deleted');
      } catch (err) {
        return Alert.error(err.message);
      }

      if(file){
        try {
            const fileRef = storage.refFromURL(file.url)
            await fileRef.delete();
        } catch (err) {
          Alert.error(err.message,5000);        
        }
      }

     
    },
    [chatId, messages]
  );



  const renderMessages = () => {

    const groups = groupBy(messages,(item) => 
    new Date(item.createdAt).toDateString() 
    );

    const items = [];

    Object.keys(groups).forEach((date) => {
      items.push(
        <li key={date} className='text-center mb-1 padded'>{date}</li>
      );
      const msgs = groups[date].map(msg => (
        <MessageItem
          key={msg.id}
          message={msg}
          handleAdmin={handleAdmin}
          handleDelete={handleDelete}
          handleLike={handleLike} />
      ));

        items.push(...msgs);

    });

    return items;

  }

  return (
    <ul className="msg-list custom-scroll">
      {isChatEmpty && <li>No messages yet</li>}
      {canShowMessages && renderMessages()}
    </ul>
  );
};


export default Messages;