import {Link, Outlet} from 'react-router-dom'
// import {useForm} from 'react-hook-form'
// import {useState} from 'react'
// import bgLogo from '../images/bg-logo.svg'
import bgLinks from '../images/bg-links.svg'
// import avatar from '../images/user-login-avatar.svg'
import { useMyContext } from './Context'
import ModalLogin from './ModalLogin'

export default function Navbar(){
    const { getConfigBasic, getConfigColor, auth, setShowModal, outAccount} = useMyContext(); 




    const bgLogo =  <svg width="320" height="100" viewBox="0 0 320 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 0H273L320 100H0V0Z" fill={getConfigColor.colorS ? getConfigColor.colorS: "#000000"}/>
                    </svg>

    const logOut = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffffff" className="bi bi-box-arrow-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
                        <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
                    </svg>
    
    const logIn =   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffffff" className="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>
                        <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                    </svg>

    return(
        <div>
            <div className="w-full max-w-[1920px] m-auto h-[100px] relative overflow-hidden flex justify-center bgNavMobile" style={{backgroundColor: getConfigColor.colorP}}>
                <nav className="  flex justify-between max-w-[1920px] w-full">
                    <div className="text-white w-[320px] relative flex justify-center items-center">                        
                        <img className="z-10 max-md:w-24 max-md:absolute max-md:left-12 max-sm:w-20 max-sm:left-4" src={`${getConfigBasic.urlImg}`} alt={getConfigBasic.nameLogo}/>  
                        <div className="absolute">{bgLogo}</div> 
                        {/* <img src={bgLogo} alt="bg-logo"/>            */}
                    </div>
                    <div className="text-white flex justify-center items-center pr-5">
                        <Link className="mx-2 z-10" to="/">Inicio</Link>
                        <Link className="mx-2 z-10" to="/">Vehiculos</Link>
                        <Link className="mx-2 z-10" to="/dashboard">Dashboard</Link>
                        {auth ? <button 
                        onClick={()=> outAccount()}
                        className="mx-2 z-10 text-white active:text-gray-400 focus:outline-none ease-linear transition-all duration-150"
                        >{logOut}</button> : <button
                            className="mx-2 z-10 text-white active:text-gray-400 focus:outline-none ease-linear transition-all duration-150"
                            type="button" onClick={() => setShowModal(true)}>
                            {logIn}
                        </button>}
                        <img className="absolute h-[115px] max-sm:w-80" src={bgLinks} alt="bg-links"/>
                    </div>
                </nav>
            </div>
            <ModalLogin/>
            <Outlet />
        </div>
    )
}