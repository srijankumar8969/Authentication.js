import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useAuth0 } from '@auth0/auth0-react'

function App() {
  const [count, setCount] = useState(0);
  const {user, loginWithRedirect, isAuthenticated} = useAuth0();
  return (
  <div className='bg-red-500 h-screen w-screen flex text-red'>
    <button onClick={()=>loginWithRedirect()}> login </button>
    {isAuthenticated? (<h1>{user.email}</h1>):(<h1>wow</h1>)}
  </div>
  )
}
export default App