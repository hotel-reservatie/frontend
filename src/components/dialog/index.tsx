import React, {
  Fragment,
  FunctionComponent,
  MouseEventHandler,
  useState,
} from 'react'
import { MdClose } from 'react-icons/md'
import SubTitle from '../text/SubTitle'
import { Dialog as Modal, Transition } from '@headlessui/react'

interface AlertProps extends ModalProps {
  title: string
  description: string
  onRequestClose: MouseEventHandler<HTMLButtonElement>
  onRequestConfirm: MouseEventHandler<HTMLButtonElement>
}

// const OldDialog: FunctionComponent<AlertProps> = ({
//   show,
//   onRequestClose,
//   onRequestConfirm,
//   description,
//   ...props
// }) => {
//   return (
//     <Modal
//       {...props}
//       contentClassName="rounded-xl p-8 border-1 border-blue-500 shadow"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//       backdrop="static"
//       show={show}
//       // onHide={handleClose}
//     >
//       <div className="flex justify-between items-center mb-8">
//         <SubTitle className="mb-0">Warning!</SubTitle>
//         <button
//           onClick={onRequestClose}
//           className="rounded-xl hover:bg-blue-300"
//         >
//           <MdClose size={24} />
//         </button>
//       </div>
//       <p className="mb-8">{description}</p>
//       <div className="flex justify-end gap-2">
//         <button onClick={onRequestClose}>Cancel</button>
//         <button
//           onClick={onRequestConfirm}
//           className=" bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-500"
//         >
//           Confirm
//         </button>
//       </div>
//     </Modal>
//   )
// }

interface DialogProps {
  title: string
  description: string
  onRequestClose: MouseEventHandler<HTMLButtonElement>
  onRequestConfirm: MouseEventHandler<HTMLButtonElement>
  show: boolean
}

const Dialog: FunctionComponent<DialogProps> = ({
  title,
  description,
  onRequestClose,
  onRequestConfirm,
  show,
}) => {
  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Modal
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => onRequestClose}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Modal.Overlay className="fixed inset-0 bg-black opacity-30" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Modal.Title as={Fragment}>
                  <SubTitle className="mb-0">{title}</SubTitle>
                </Modal.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{description}</p>
                </div>

                <div className="flex justify-end gap-2">
                  <button onClick={onRequestClose}>Cancel</button>
                  <button
                    onClick={onRequestConfirm}
                    className=" bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-500"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Modal>
      </Transition>
    </>
  )
}

export default Dialog
