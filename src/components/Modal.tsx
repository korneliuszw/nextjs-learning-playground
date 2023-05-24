'use client'

import {createPortal} from "react-dom";
import {useState} from "react";

export interface IModal {
    children: React.ReactNode,
    title?: string,
    action?: React.ReactNode,
    onClickOutside: () => void
}

export function useModal() {
    const [isModalVisible, setModalVisible] = useState<boolean>(false)
    const hideModal = () => setModalVisible(false)
    const showModal = () => setModalVisible(true)
    return {
        isModalVisible,
        showModal,
        hideModal
    }
}

export function Modal({children, title, action, onClickOutside}: IModal) {
    return createPortal(
        <label htmlFor={"modal"} className={"modal modal-bottom sm:modal-middle modal-open cursor-pointer"}
               onClick={onClickOutside}>
            <label className={"modal-box relative"} onClick={event => event.stopPropagation()}>
                {title && <h3 className={"text-lg font-bold"}>{title}</h3>}
                <div className={"py-4"}>
                    {children}
                </div>
                <div className={"modal-action"}>
                    {action}
                </div>
            </label>
        </label>,
        document.querySelector("body")
    )
}