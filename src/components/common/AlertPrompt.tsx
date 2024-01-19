import React, { useEffect, useState } from 'react'

function AlertPrompt({currentMessage, date, success} : {currentMessage: string, success: boolean, date: Date}) {
    const [responseMessage, setResponseMessage] = useState(currentMessage)
    const alertId = date.toString()
    console.log(responseMessage)
    useEffect(() => {   
        
        if(currentMessage.includes("object" || "error" || "unexpected" || "Too many requests" || "Internal server")){
            console.log(currentMessage)
            setResponseMessage("Unhandled error. Please try again.")
        }else if(currentMessage.includes("failed to fetch")){
            setResponseMessage("An error occurred. Please try again.")
        }
        else {
            setResponseMessage(currentMessage)
        }
       
        if(currentMessage != ''){
            const alertPrompt = document.getElementById(alertId) as HTMLDivElement;
            if (!success) {
                alertPrompt.classList.remove('alert-success');
                alertPrompt.classList.add('alert-error');
            }else{
                alertPrompt.classList.add('alert-success');
                alertPrompt.classList.remove('alert-error');
            }

            alertPrompt.classList.remove('hidden');
            setTimeout(() => {
                alertPrompt.classList.add('hidden');
            }, 2000);
        }
    }
    ,[date])

  return (
    <div id={alertId} role="alert" className="hidden alert alert-success fixed top-[80%] left-[1%] md:left-[2%] lg:top-[90%] lg:left-[2%] max-w-sm lg:max-w-screen-sm lg:max-auto whitespace-normal overflow-auto z-50">
        {
            success ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className=" stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                ) : (   
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                )
        }
        <p>{currentMessage}</p>
    </div>
  )
}

export default AlertPrompt