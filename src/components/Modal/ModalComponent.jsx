import { Modal } from 'antd';
import React from 'react'

function ModalComponent({title="Basic Modal",isOpen,children,...rests}) {

    return (
      <>
        <Modal title={title} open={isOpen} {...rests}>
          {children}
        </Modal>
      </>
    );
  };
export default ModalComponent