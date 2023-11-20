import './App.css'
import { Outlet } from "react-router-dom";

function App() {

    
    return (
        <div className='flex flex-col p-5 items-center'>
            <div className='flex justify-center'>
                <h1 className='text-4xl font-bold tracking-tighter'>
                    Countries
                </h1>
            </div>
            <div className='flex flex-col items-center pt-10'>
                <Outlet />
            </div>
        </div>
    )
}

export default App
