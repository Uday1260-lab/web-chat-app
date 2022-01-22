import React, { useState } from 'react';
import { Alert, Button, Modal } from 'rsuite';
import { useModalState } from "../../misc/custom-hooks";
import AvatarEditor from 'react-avatar-editor'
const fileInputTypes = " .png , .jpeg , .jpg ";
const acceptedFileTypes = ['image/png' , 'image/jpeg' , 'image/pjpeg'];
const isValidFile = (file) => acceptedFileTypes.includes(file.type);
const AvatarUploadBtn = () => {
    const {isOpen,close,open} = useModalState();
    const [img,setImg] = useState(null);
    const onFileInputChange = (ev) => {
        const currFiles = ev.target.files;
        if(currFiles.length === 1){
            const file = currFiles[0];
            if(isValidFile(file)){
                setImg(file);
                open();
            }else{
                Alert.warning(`You Selected Wrong File Type ${file.type}`,5000);
            }
        }
    };
  return <div className='mt-3 text-center'>
        Avatar
        <div>
            <label 
                htmlFor='avatar-upload' 
                className='d-bloack cursor-pointer padded'>
                Select new avatar
                <input 
                    id="avatar-upload" 
                    type='file' 
                    className='d-none' 
                    accept={fileInputTypes}
                    onChange={onFileInputChange} />
                
            </label>
            <Modal show={isOpen} onHide={close} >
                <Modal.Header>
                    <Modal.Title>
                        Adjust and Upload new Avatar
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className='d-flex justify-content-center align-items-center h-100'>
                   { img &&  
                    <AvatarEditor
                        image={img}
                        width={200}
                        height={200}
                        border={10}
                        borderRadius={100}
                        rotate={0}
                    />
                    
                    }
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button block appearance='ghost'>
                        Upload new Avatar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    </div>;
};

export default AvatarUploadBtn;

