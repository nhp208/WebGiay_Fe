import { Drawer } from 'antd';
import React, { useState } from 'react'

function DrawerComponnent({title='Drawer',placement='right',isOpen=false,...rests}) {
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
      setOpen(true);
    };
    const onClose = () => {
      setOpen(false);
    };
    return (
      <>
        <Drawer title={title} placement={placement} onClose={onClose} open={isOpen} {...rests} width={'90%'}>
            
        </Drawer>
      </>
    );
  };
export default DrawerComponnent