import React from 'react';
import { Alert, Button, Divider, Drawer } from 'rsuite';
import { useProfile } from '../../context/profile.context';
import { database } from '../../misc/firebase';
import EditableInEditableput from '../EditableInput';
import ProviderBlock from './ProviderBlock';

const Dashboard = ( {onSignOut} ) => {
  const {profile} = useProfile();
  const onSave = async newData => {
    const userNicknameRef = database.ref(`/profiles/${profile.uid}`).child('name');
    try {
      await userNicknameRef.set(newData);
      Alert.success("Nickname has been successfully updated!!",5000);

    } catch (err) {
      Alert.error(err.message,5000);
    }
  }
  return  <>
  <Drawer.Header>
    <Drawer.Title>
      DashBoard
    </Drawer.Title>
  </Drawer.Header>
  <Drawer.Body>
    <h3>Hey ,{profile.name}</h3>
    <ProviderBlock />
    <Divider />
    <EditableInEditableput 
      name ="nickname"
      initialValue={profile.name} 
      onSave={onSave} 
      label={<h6 className='mb-2'>NickName</h6>} />
  </Drawer.Body>
  <Drawer.Footer>
    <Button block color="red" onClick={onSignOut}>
      Sign-Out
    </Button>
  </Drawer.Footer>
  </>;
};

export default Dashboard;
