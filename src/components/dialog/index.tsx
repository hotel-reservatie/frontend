import React, { FunctionComponent, MouseEventHandler } from 'react'
import { Modal, ModalProps } from 'react-bootstrap'
import { MdClose } from 'react-icons/md'
import SubTitle from '../text/SubTitle'

interface AlertProps extends ModalProps {
  title: string
  description: string
  onRequestClose: MouseEventHandler<HTMLButtonElement>
  onRequestConfirm: MouseEventHandler<HTMLButtonElement>
}

const Dialog: FunctionComponent<AlertProps> = ({
  show,
  onRequestClose,
  onRequestConfirm,
  description,
  ...props
}) => {
  return (
    <Modal
      {...props}
      contentClassName="rounded-xl p-8 border-1 border-blue-500 shadow"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      show={show}
      // onHide={handleClose}
    >
      <div className="flex justify-between items-center mb-8">
        <SubTitle className="mb-0">Warning!</SubTitle>
        <button
          onClick={onRequestClose}
          className="rounded-xl hover:bg-blue-300"
        >
          <MdClose size={24} />
        </button>
      </div>
      <p className="mb-8">{description}</p>
      <div className="flex justify-end gap-2">
        <button onClick={onRequestClose}>Cancel</button>
        <button onClick={onRequestConfirm} className=" bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-500">Confirm</button>
      </div>
    </Modal>
  )
}

export default Dialog
