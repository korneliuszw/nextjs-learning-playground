'use client'

import {IModal, Modal, useModal} from "@/components/Modal";


interface IModalOpener {
    buttonText: string,
    onClickOutside?: () => void
}

export default function ModalOpener({
                                        buttonText,
                                        onClickOutside,
                                        ...props
                                    }: Omit<IModal, 'onClickOutside'> & IModalOpener) {
    const {isModalVisible, hideModal, showModal} = useModal()
    return (
        <>
            <button className={"btn btn-primary"} onClick={showModal}>{buttonText}</button>
            <input checked={isModalVisible} type="checkbox" id={"modal"} className={"modal-toggle"}
                   onChange={(event) => {
                       if (!event.target.checked) hideModal()
                       else showModal()
                   }}/>
            {isModalVisible && <Modal {...props} onClickOutside={onClickOutside ?? hideModal}/>}
        </>
    )
}