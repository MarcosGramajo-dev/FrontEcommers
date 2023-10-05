import { createContext, useContext, ReactNode, useState } from 'react';

type MyContextProviderProps = {
    children: ReactNode;
};

type ContextModal = {
    setShowBigModal: React.Dispatch<React.SetStateAction<boolean>>,
    showBigModal:boolean,
    passModalObject: (props:product)=> void;
    objectModal: product
}

type product = {
    modelo: string,
    age: number,
    km: number,
    combustible: string,
    motor: string,
    idProduct: string,
    photos:[{public_id: string, secure_url:string}],
  }

const MyContext = createContext<ContextModal | undefined>(undefined);

//Esto es lo que llama el componente para usar el valor
export function useMyContextModal() {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }
  return context;
}

export function ContextModalProvider({ children }: MyContextProviderProps) {

    const [showBigModal, setShowBigModal] = useState(false)
    const [objectModal, setObjectModal] = useState<product>({
        modelo: "",
        age: 0,
        km: 0,
        combustible: "",
        motor: "",
        idProduct: "",
        photos:[{public_id: "", secure_url:""}]
    })

    const passModalObject = (props:product) => {
        console.log(props)
        setObjectModal(props)
    }

    const sharedData: ContextModal = {
        setShowBigModal,
        showBigModal,
        passModalObject,
        objectModal
    }

    return <MyContext.Provider value={sharedData}>{children}</MyContext.Provider>;
}