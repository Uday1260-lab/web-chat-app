import React from 'react';
import { Button, Drawer } from 'rsuite';
import { useMediaQuery, useModalState } from '../../misc/custom-hooks';
import Dashboard from '.';

const DashboardToggle = () => {
  const {isOpen,open,close} =useModalState();
  const isMobile = useMediaQuery('(max-width: 992px)');
  return(
      <>
        <Button block color="blue" onClick={open}>
        <i class="fa-solid fa-list-dropdown" ></i>Dashboard 
        </Button>
        <Drawer full={isMobile} show={isOpen} onHide={close} placement='left'>
          <Dashboard/>
        </Drawer>
        
      </>
  );
};

export default DashboardToggle;
