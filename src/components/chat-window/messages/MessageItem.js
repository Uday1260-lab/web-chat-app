import React, { memo } from 'react';
import { Button } from 'rsuite';
import TimeAgo from 'timeago-react';
import { useCurrentroom } from '../../../context/current-room.context';
import { auth } from '../../../misc/firebase';
import PresenceDot from '../../PresenceDot';
import ProfileAvatar from '../../ProfileAvatar';
import ProfileInfoBtnModal from './ProfileInfoBtnModal';

const MessageItem = ({message,handleAdmin}) => {

    const {author , createdAt , text } = message;

    const isAdmin = useCurrentroom( v => v.isAdmin );

    const admins = useCurrentroom ( v => v.admins );

    const isMsgAuthorAdmin = admins.includes(author.uid);

    const isAuthor = auth.currentUser.uid === author.uid;

    const canGrantAdmin = isAdmin && !isAuthor;

    return <li className='padded mb-1'>
        <div className='d-flex align-items-center font-bolder mb-1'>
            < PresenceDot uid={author.uid} />
            <ProfileAvatar 
                src={author.avatar} 
                name={author.name} 
                size='sm' />
            <ProfileInfoBtnModal 
                profile={author} 
                appearance="link" 
                className="p-0 ml-1 text-black"
            >
                {
                    canGrantAdmin && 

                    <Button block onClick={() => handleAdmin(author.uid)} color="green">
                        {isMsgAuthorAdmin ? "Remove Admin Permission" : "Give Admin Permission" }
                    </Button>
                }                    
            </ProfileInfoBtnModal>
            <TimeAgo 
                datetime={createdAt} 
                className='font-normal text-black-45 ml-2' />
        </div>
        <div>
            <span className='word-break-all' >{text}</span>
        </div>
    </li>;
};

export default memo(MessageItem);