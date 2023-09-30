import {Outlet} from 'react-router-dom'
// import {useForm} from 'react-hook-form'
// import {useState} from 'react'
// import bgLogo from '../images/bg-logo.svg'
import bgLinks from '../images/bg-links.svg'
// import avatar from '../images/user-login-avatar.svg'
import { useMyContext } from './Context'
import ModalLogin from './ModalLogin'

export default function Navbar(){
    const { getConfigBasic, getConfigColor, auth, setShowModal, outAccount} = useMyContext(); 




    const bgLogo = <svg width="320" height="100" viewBox="0 0 320 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0H273L320 100H0V0Z" fill={getConfigColor.colorS ? getConfigColor.colorS: "#000000"}/>
    </svg>

    return(
        <div>
            <div className="w-full h-[100px] relative overflow-hidden flex justify-center" style={{backgroundColor: getConfigColor.colorP}}>
                <nav className="  flex justify-between max-w-[1980px] w-full">
                    <div className="text-white w-[320px] relative flex justify-center items-center">                        
                        <img className="z-10" src={`${getConfigBasic.urlImg}`} alt={getConfigBasic.nameLogo}/>  
                        <div className="absolute">{bgLogo}</div> 
                        {/* <img src={bgLogo} alt="bg-logo"/>            */}
                    </div>
                    <div className="text-white flex justify-center items-center">
                        <a className="mx-2 z-10" href="#">Inicio</a>
                        <a className="mx-2 z-10" href="#">Vehiculos</a>
                        <a className="mx-2 z-10" href="#">Contacto</a>
                        {auth ? <button 
                        onClick={()=> outAccount()}
                        className="mx-2 z-10 text-white active:text-gray-400 focus:outline-none ease-linear transition-all duration-150"
                        >Salir</button> : <button
                            className="mx-2 z-10 text-white active:text-gray-400 focus:outline-none ease-linear transition-all duration-150"
                            type="button" onClick={() => setShowModal(true)}>
                            Iniciar sesion
                        </button>}
                        <img className="absolute h-[115px]" src={bgLinks} alt="bg-links"/>
                    </div>
                </nav>
            </div>
            <ModalLogin/>
            <Outlet />
        </div>
    )
}