import {  useState } from "react"
import {useForm} from 'react-hook-form'
import { useMyContext } from '../context';
import axios from 'axios';
import {UserInfo, CreateUser} from '../../types/type'
// import noPhoto from '../../images/noPhoto.png'
import Check from '../../images/check.svg'
import Cross from '../../images/cross.svg'


export default function CreateUsers(){
    const [isLoading, setIsLoading] = useState(false);
    const [stateCheck, setstateCheck] = useState(false);
    const [stateCross, setstateCross] = useState(false);

    const {register, handleSubmit, setValue} = useForm<CreateUser>()
    const { backURL, getAllUsers, AllUsers } = useMyContext(); 

    const deleteUser = ( id: string) => {

        let localFormData = localStorage.getItem('formData');
        let token

        if (localFormData) {
            const parsedLocalFormData = JSON.parse(localFormData)
            token = parsedLocalFormData?.token
        }

        if (!token) {
            throw new Error('Token not found');
        }


        let headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        }

        axios.get(`${backURL}/auth/user/delete/${id}`, {headers}).then(() => { AllUsers()})
    }

    const editUser = ( id: string) => {
        if(id === ""){

            return console.log('Token User esta vacio')

        } else{
            getAllUsers.forEach( user => {
                if(user.token === id){
                    setValue("user", user.user);
                    setValue("role", user.role);
                      
                }
            } )
        }
    }

    // console.log(getAllUsers)

    const onSubmit = (data: CreateUser) =>{
        try {
            
            setIsLoading(true);
            
            const formData = new FormData();

            let localFormData = localStorage.getItem('formData');
            let token

            if (localFormData) {
                const parsedLocalFormData = JSON.parse(localFormData)
                token = parsedLocalFormData?.token
            }

            if (!token) {
                throw new Error('Token not found');
            }


            let headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            }

            // console.log(data.user)

            formData.append('user', data.user)
            formData.append('pass', data.pass)
            formData.append('role', data.role)

            axios.post(`${backURL}/auth/create/user`, formData, { headers, }).then(() => {
                // console.log(res)
                setIsLoading(false)
                setstateCheck(true);
                setTimeout(() => {
                    setstateCheck(false);
                }, 3000);
                AllUsers()
            })
        } catch (error) {
            setIsLoading(false)
            setstateCross(true);
            setTimeout(() => {
                setstateCross(false);
            }, 3000);
            console.log('No se puedo guardar los cambios Error:', error)
        }
    }   

    return(
        <div className="min-w-[380px] max-w-7xl flex max-md:flex-col  max-sm:w-full">
            <form className="mx-5 my-3" onSubmit={handleSubmit((data: any)=> {onSubmit(data);})}>
                <h1 className="px-3 py-3 ">Crear Usuario</h1>
                <div className="col-span-full">
                    <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="user">Usuario</label>
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                        <input type="text" {...register("user")} id="user" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"/>
                    </div>
                </div>
                <div className="col-span-full">
                    <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="pass">Contraseña</label>
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                        <input type="text" {...register("pass")} id="pass" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"/>
                    </div>
                </div>
                <div className="col-span-full">
                    <label htmlFor="role">Rol</label>
                    <div className="rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                        <select {...register("role")} required id="role" className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" >
                            <option value="client">Cliente</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                </div>
                <div className="col-span-full" >
                    <button className="my-3 flex w-full justify-between rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" type="submit" disabled={isLoading}>
                        <div >
                            Crear
                        </div>
                        <div className="loading-spinner" style={{ display: isLoading ? 'block' : 'none' }}>
                            <div className="spinner"></div>
                        </div>
                        { stateCheck ? <img src={Check} alt="check" style={{width:'30px'}} /> : <></> }
                        { stateCross ? <img src={Cross} alt="cross" style={{width:'30px'}} /> : <></> }
                    </button>
                </div>
            </form>
            <div className="relative overflow-x-auto my-3">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-3 py-3">
                                Usuario
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Rol
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Accion
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {getAllUsers.map((element: UserInfo) => (
                            <tr key={element.user} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">{element.user}</th>
                                {/* <td className="text-center">{element.user}</td> */}
                                <td className="text-center">{element.role}</td>
                                <td className="flex py-2">
                                    <button className="font-medium mx-2 text-center text-blue-600 dark:text-blue-500 hover:underline" onClick={()=> editUser(element._id)}>Editar</button>
                                    <button className="font-medium mx-2 text-center text-blue-600 dark:text-blue-500 hover:underline" onClick={()=> deleteUser(element._id)}>Borrar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}