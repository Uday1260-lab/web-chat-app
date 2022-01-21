import React, { useCallback } from 'react';
import { Alert, Button, Drawer } from 'rsuite';
import { useMediaQuery, useModalState } from '../../misc/custom-hooks';
import Dashboard from '.';
import { auth } from '../../misc/firebase';

const DashboardToggle = () => {
  const {isOpen,open,close} =useModalState();
  const isMobile = useMediaQuery('(max-width: 992px)');
  const onSignOut = useCallback(() => {
    auth.signOut();
    Alert.info('Signed out successfully !!' , 5000);
    close();
  },[close])
  return(
      <>
        <Button block color="blue" onClick={open}>
        <i class="fa-solid fa-list-dropdown" ></i>Dashboard 
        </Button>
        <Drawer full={isMobile} show={isOpen} onHide={close} placement='left'>
          <Dashboard onSignOut={onSignOut}/>
        </Drawer>
        
      </>
  );
};

export default DashboardToggle;
