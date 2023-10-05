import axios from 'axios';
import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import {ConfBasic, ConfColors, ConfLinks, EditProduct, UserInfo} from '../types/type' //AddNewProduct

type MyContextType = {
    getConfigBasic: ConfBasic;
    getConfig: (type:string) => Promise<void>;
    backURL: string,
    getConfigColor: ConfColors,
    getConfigLink: ConfLinks,
    //getAddProduct: AddNewProduct,
    getAllProducts: EditProduct[],
    AllProducts: () => Promise<void>,
    sendAuth: () => void,
    auth: boolean,
    loading: boolean,
    showModal: boolean,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    loginUser: ( loginUserForm: UserInfo ) => void,
    getAllUsers: UserInfo[],
    AllUsers: () => Promise<void>,
    outAccount: () => void,
    headersToken: {}
};

type MyContextProviderProps = {
    children: ReactNode;
};

const MyContext = createContext<MyContextType | undefined>(undefined);

//Esto es lo que llama el componente para usar el valor
export function useMyContext() {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }
  return context;
}

//Contenedor donde Definis los valores que deseas compartir
export function MyContextProvider({ children }: MyContextProviderProps) {

const [getConfigBasic, setGetConfigBasic] = useState<ConfBasic>({
  type:"",
  direccion: "",
  eslogan: "",
  logo: new DataTransfer().files,
  tel: 0,
  titulo: "",
  nameLogo: "",
  fileName: "",
  urlImg: "",
})
const [getConfigColor, setGetConfigColor] = useState<ConfColors>({
    type:"",
    colorP: "",
    colorS: ""
})
const [getConfigLink, setGetConfigLink] = useState<ConfLinks>({
    type:"",
    facebook: "",
    instagram: "",
    linkGoogle: "",
    twiter: "",
})
// const [getAddProduct, setGetAddProduct] = useState<AddNewProduct>({
//     modelo: "",
//     age: 0,
//     km: 0,
//     combustible: "",
//     motor: "",
//     idProduct: "",
//     esUnSlide: "",
// })
const [auth, setAuth] = useState<boolean>(false)
const [loading, setLoading] = useState<boolean>(true)

const [showModal, setShowModal] = useState<boolean>(false);

const [getAllProducts, setGetAllProducts] = useState([])

const [getAllUsers, setGetAllUsers] = useState([])

//const backURL = "http://localhost:3000"
const backURL = "https://backecommers.onrender.com"
const [headersToken, setHeaders] = useState({})



const loginUser = (loginUserForm: UserInfo) => {
  setLoading(true)
  console.log(loginUserForm)

  let formData = {
    token: loginUserForm.token,
    user: loginUserForm.user
  }

  let formDataJSON = JSON.stringify(formData)

  localStorage.setItem('formData', formDataJSON)
  setAuth(true)
  setLoading(false)

    setShowModal(false);
}

const sendAuth = async () =>{

  let localFormData = localStorage.getItem('formData');
  let token

  if (localFormData) {
      const parsedLocalFormData = JSON.parse(localFormData)
      token = parsedLocalFormData?.token
  }

  if (!token) {
      throw new Error('Token not found');
  }

  // console.log(token, localFormData)

  setHeaders( {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'multipart/form-data',
  })
}

const verifyAuth = async () => {
  setLoading(true);
  try {

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

  const res = await axios.get(`${backURL}/auth`, { headers })

  console.log("data >>", res.data)
  setAuth(true)
    
  } catch (error) {
    console.log(error)
  }
  finally {
    setLoading(false);
  }
  
}

const AllProducts = async () => {
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

  const response = await axios.get(`${backURL}/auth/table`, {headers});
  setGetAllProducts(response.data)
}

const AllUsers = async () => {
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

  const response = await axios.get(`${backURL}/auth/users`, {headers});
  console.log(response)
  setGetAllUsers(response.data)
}

const getConfig = async (type: string)=> { 
    try {
      switch(type){
        case"configBasic": {
          const response = await axios.get(`${backURL}/type?type=${type}`);
          setGetConfigBasic(response.data);
          break;
        }
        case "configColor":{
          const response = await axios.get(`${backURL}/type?type=${type}`);
          setGetConfigColor(response.data);
          break;
        }
        case "configLink":{
          const response = await axios.get(`${backURL}/type?type=${type}`);
          setGetConfigLink(response.data);
          break;
        }

        default: console.log(`Tipo desconocido: ${type}`);
      }
        
    } catch (error) {
      console.error('Error fetching config:', error);
    }
  };

  const outAccount = () =>{
    setAuth(false)
    localStorage.clear()
    window.location.href = '/'
  }

  const sharedData: MyContextType = {
    getConfigBasic,
    getConfig,
    backURL,
    getConfigColor,
    getConfigLink,
    //getAddProduct,
    getAllProducts,
    AllProducts,
    sendAuth,
    auth,
    loading,
    showModal,
    setShowModal,
    loginUser,
    getAllUsers,
    AllUsers,
    outAccount,
    headersToken
  };

  useEffect(()=> {
    getConfig("configBasic")
    getConfig("configColor")
    getConfig("configLink")
    AllProducts()
    AllUsers()
    verifyAuth()
  },[]);

 return <MyContext.Provider value={sharedData}>{children}</MyContext.Provider>;
}





