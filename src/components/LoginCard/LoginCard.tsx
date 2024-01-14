import React from 'react'

function LoginCard({setToggleForm}: {setToggleForm: any}) {

    const handleToggle = () => {setToggleForm(false)}

    return (
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body prose">
                <h1>Login</h1>
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="email" className="input input-bordered" required />
                </div>
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input type="password" placeholder="password" className="input input-bordered" required />
                </div>
                <div className="form-control mt-6">
                    <button type='submit' className="btn btn-primary">Login</button>
                </div>
                <div className="form-control mt-6">
                    <button type='button' onClick={handleToggle} className="btn btn-neutral btn-outline">Create account</button>
                </div>
            </form>        
        </div>
    )
}

export default LoginCard