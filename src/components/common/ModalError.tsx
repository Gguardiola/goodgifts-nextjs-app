import React, { useEffect, useRef, useState } from 'react'

function ModalError(currentModalStateError: any) {

    const [modalStateError, setModalStateError] = useState<boolean>(currentModalStateError.currentModalStateError);

    const errorModal = useRef<HTMLDialogElement | null>(null);
    const firstRender = useRef(true);
    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        } else if(currentModalStateError.currentModalStateError === true){
            if (errorModal.current) {
                errorModal.current.showModal(); 
                setModalStateError(false);  
            }
        }
    }, [currentModalStateError.currentModalStateError]);

    const handleModalClosing = () => {
        if (errorModal.current) {
            errorModal.current.close();
            setModalStateError(false);
        }
    };

    return (
        <dialog ref={errorModal} id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box ">
            <h3 className="text-center font-bold text-lg text-red-400 text-bold">A problem has occurred!</h3>
            <div className="modal-action">
            <form className='mr-auto ml-auto' method="dialog">
                <button onClick={handleModalClosing} className="btn btn-error btn-lg ">Try again</button>
            </form>
            </div>
        </div>
        </dialog>
    )
}

export default ModalError