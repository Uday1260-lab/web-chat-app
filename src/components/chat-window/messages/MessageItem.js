import React, { memo } from 'react';
import { Button } from 'rsuite';
import TimeAgo from 'timeago-react';
import { useCurrentroom } from '../../../context/current-room.context';
import { useHover, useMediaQuery } from '../../../misc/custom-hooks';
import { auth } from '../../../misc/firebase';
import PresenceDot from '../../PresenceDot';
import ProfileAvatar from '../../ProfileAvatar';
import IconBtnControl from './IconBtnControl ';
import ImgBtnModal from './ImgBtnModal';
import ProfileInfoBtnModal from './ProfileInfoBtnModal';

const renderFileMessage = (file) => {
    
    if(file.contentType.includes('image')) {
        return (
            <div className="height-220">
                <ImgBtnModal src={file.url} FileName={file.name} />
            </div>
        )
    }

    if (file.contentType.includes('audio')) {
        return <audio controls>
            <source src={file.url} type="audio/mp3" />
            Your Browser does not support audio
        </audio>
    }
    
    return (
        <a href={file.url} > DownLoad {file.name} </a>
    )
}

const MessageItem = ({ message, handleAdmin, handleLike , handleDelete }) => {
    const { author, createdAt, text, file, likes, likeCount } = message;
    const [selfRef,isHover] = useHover();

    const isMobile = useMediaQuery('(max-width: 992px)');

    const isAdmin = useCurrentroom( v => v.isAdmin );

    const admins = useCurrentroom ( v => v.admins );

    const isMsgAuthorAdmin = admins.includes(author.uid);

    const isAuthor = auth.currentUser.uid === author.uid;

    const canGrantAdmin = isAdmin && !isAuthor;

    const canShowIcons = isMobile || isHover ;

    const isLiked = likes && Object.keys(likes).includes(auth.currentUser.uid)

    return <li className={` padded mb-1 cursor-pointer ${isHover ? 'bg-black-02' : ''} `} ref={selfRef} >
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
                className='font-normal text-black-45 ml-2' 
            />
            <IconBtnControl
                {...( isLiked ? {color : 'green'} : {})} 
                isVisible={canShowIcons}
                iconName='heart'
                tooltip="Like this message"
                onClick={() => handleLike(message.id) }
                badgeContent={likeCount}
            />
            {
                isAuthor && (
                    <IconBtnControl
                        isVisible={canShowIcons}
                        iconName='close'
                        tooltip="Delete this message"
                        onClick={() => handleDelete(message.id,file) }
                    />
                )
            }
        </div>
        <div>
            {text && <span className='word-break-all' >{text}</span>}
            {file && renderFileMessage(file)}            
        </div>
    </li>;
};

export default memo(MessageItem);
