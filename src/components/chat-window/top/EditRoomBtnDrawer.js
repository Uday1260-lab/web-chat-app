import React, { memo } from 'react';
import { useParams } from 'react-router';
import {Alert, Button, Drawer} from 'rsuite';
import { useCurrentroom } from '../../../context/current-room.context';
import { useMediaQuery, useModalState } from '../../../misc/custom-hooks';
import { database } from '../../../misc/firebase';
import EditableInput from '../../EditableInput';


const EditRoomBtnDrawer = () => {

    const {open,close,isOpen} = useModalState();
    const {chatId} = useParams();
    const isMobile = useMediaQuery('(max-width: 992px)')
    const name = useCurrentroom(v => v.name);
    const description = useCurrentroom(v => v.description);

    const updateData = (key,value) => {
        database.ref(`rooms/${chatId}`).child(key).set(value).then(() => {
            Alert.success("Updated successfully!!",5000);
        }).catch(err => {
            Alert.error(err.message,5000);
        })    
    }

    const onNameSave = (newName) => {
        updateData('name',newName);
    }

    const onDescriptionSave = (newDesc) => {
        updateData('description',newDesc);
    }

  return ( 
    <div>
        <Button className='br-circle' size='sm' color='red' onClick={open} >
            A
        </Button>

        <Drawer full={isMobile} show={isOpen} onHide={close} placement='right' >
            <Drawer.Header>
                <Drawer.Title>
                    Edit Room Info
                </Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
                < EditableInput
                    initialValue={name}
                    onSave={onNameSave}
                    label={<h6 className='mb-2'>Name</h6>}
                    emptyMsg="Name can not be empty"
                />

                < EditableInput
                    componentClass="textarea"
                    rows={5}
                    initialValue={description}
                    onSave={onDescriptionSave}
                    emptyMsg="Description can not be empty"
                    wrapperClassName="mt-3"
                />

            </Drawer.Body>
            <Drawer.Footer>
                <Button block onClick={close} >
                    Close(X)
                </Button>
            </Drawer.Footer>
        </Drawer>

    </div>
    );
};

export default memo(EditRoomBtnDrawer);
