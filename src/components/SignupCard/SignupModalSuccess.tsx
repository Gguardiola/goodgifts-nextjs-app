import React, { useEffect, useRef } from 'react'

function SignupModalSuccess(currentModalState: any) {
    const successModal = useRef<HTMLDialogElement | null>(null);
    const firstRender = useRef(true);
    useEffect(() => {
        if (firstRender.current) {
            console.log('first render')
            firstRender.current = false;
            return;
        } else if(currentModalState.currentModalState === true){
            console.log('currentModalState is true')
            if (successModal.current) {
                console.log(successModal.current);
                successModal.current.showModal();   
            }
        }
    }, [currentModalState]);

    const handleModalClosing = () => {
        if (successModal.current) {
            successModal.current.close();
            window.location.href = '/login';
        }
    };

    return (
        <dialog ref={successModal} id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
            <h3 className="font-bold text-lg text-green-600 text-bold">Congratulations!</h3>
            <p className="py-4 prose">You have successfully created the account. Return to the login page to enter for the first time.</p>
            <div className="modal-action">
            <form className='mr-auto ml-auto' method="dialog">
                <button onClick={handleModalClosing} className="btn btn-success btn-lg ">Return to login page</button>
            </form>
            </div>
        </div>
        </dialog>
    )
}

export default SignupModalSuccess