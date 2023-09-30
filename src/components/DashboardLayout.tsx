import { useEffect } from 'react';
import { Navigate } from 'react-router'
import { useMyContext } from './Context'
import Navbar from './Navbar';


const DashboardLayout = () => {
    const { auth, loading } = useMyContext();

    useEffect(() => {
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>", loading, auth)
    }, [loading])

    if(!loading && !auth) {
      return <Navigate to="/" />
    }

    if(loading) {
      return <div>loading...</div>
    }

    
    
    return (
        <Navbar />
    )
}

export default DashboardLayout
