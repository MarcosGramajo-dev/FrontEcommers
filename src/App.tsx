import './App.css'
import ErrorPage from './components/ErrorPage'
import Navbar from './components/Navbar'
import HomePage from './components/HomePage';
import EditPage from './components/EditPage';
import {
  Routes,
  Route,
  // Link,
  // useNavigate,
  // useLocation,
  // Navigate,
  // Outlet,
} from "react-router-dom";
import { MyContextProvider } from './components/context'
import DashboardLayout from './components/DashboardLayout';

function App() {

  

  return (
    <MyContextProvider>
      <Routes>        
        <Route path='/' element={<Navbar />}>
          <Route index element={<HomePage />}/>
          <Route path='error' element={<ErrorPage />}/>
        </Route>
        <Route path='/dashboard' element={<DashboardLayout />}>
          <Route index element={<EditPage />}/>
          <Route path='error' element={<ErrorPage />}/>
        </Route>        
      </Routes>
    </MyContextProvider>
  )
}

export default App
