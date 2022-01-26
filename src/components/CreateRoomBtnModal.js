import React, { useCallback, useRef, useState } from 'react';
import { Alert, Button, ControlLabel, Form, FormControl, FormGroup, Icon, Modal, Schema } from 'rsuite';
import { useModalState } from '../misc/custom-hooks';
import firebase from 'firebase/app';
import { auth, database } from '../misc/firebase';

const { StringType } = Schema.Types;

const model = Schema.Model({
    name: StringType().isRequired('Chat Name Is Required'),
    description: StringType().isRequired('Description Is Required'),
});

const INITIAL_FORM = {
    name: "",
    description: ""
}

const CreateRoomBtnModal = () => {

    const {open,isOpen,close} = useModalState();
    const [formValue,setFormValue] = useState(INITIAL_FORM);
    const [isLoading,setIsLoading] = useState(false);
    const formRef = useRef();

    const onFormChange = useCallback( value => {
        setFormValue(value);
    },[]);

    const onSubmit = async () => {
        if(!formRef.current.check()){
            return;
        }
        setIsLoading(true);
        const newRoomdata = {
            ...formValue,
            createdAt: firebase.database.ServerValue.TIMESTAMP,
            admins: {
                [auth.currentUser.uid] : true,
            }
        }

        try {
            await database.ref('rooms').push(newRoomdata);
            setIsLoading(false);
            setFormValue(INITIAL_FORM);
            Alert.success(`${formValue.name} has been created`,5000);
            close();
        } catch (err) {
            setIsLoading(false);
            Alert.error(err.message,5000);
        }
    }

  return <div className='mt-2'>
      <Button block color='yellow' onClick={open}>
          <Icon icon='creative' /> Create New Chat Room
      </Button>
      <Modal show={isOpen} onHide={close}>
          <Modal.Header>
              <Modal.Title>
                  New Chat Room
              </Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Form 
                fluid 
                onChange={onFormChange} 
                formValue={formValue} 
                model={model} 
                ref={formRef}>
                  <FormGroup>
                      <ControlLabel>
                          Room Name
                      </ControlLabel>
                      <FormControl 
                        name='name' 
                        placeHolder="Enter the chat room name ..." />
                  </FormGroup>
                  <FormGroup>
                        <ControlLabel>                        
                          Description
                      </ControlLabel>
                      <FormControl 
                        componentClass="textarea" 
                        rows={4} 
                        name='description' 
                        placeHolder="Enter room description ..." />
                  </FormGroup>
              </Form>
          </Modal.Body>
          <Modal.Footer>
              <Button block appearance='primary' onClick={onSubmit} disabled={isLoading}>
                  <Icon icon={"plus"}/>  Create new chat room
              </Button>
          </Modal.Footer>
      </Modal>
  </div>;
};

export default CreateRoomBtnModal;

