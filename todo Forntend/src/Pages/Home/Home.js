import React from 'react'
import logo from './logo (1).jpg'
import './Home.css'
import { useLocation , useNavigate, useParams } from 'react-router-dom'
export default function Home() {
    // const Navigate = useNavigate();
    const location  = useLocation();
    const params = useParams();
    console.log(params);
    console.log(location);
  return (
    <>
        <div className='container main-sec'>
            <div className='row justify-content-around align-items-center'>
                <div className='col-auto'>
                    <h2> Hello My Name is Mohammed  </h2>
                    <h3> a full stack Devlpment   </h3>
                    <h4> Let's Make an impact   </h4>
                      <a className='btn btn-primary' >Create your Todo </a>  
                </div>
                <div className='col-auto'>
                    {/* <img src={logo} alt='Logo  for joonguini'  className='custom mt-5'  /> */}
                </div>

            </div>

        </div>
    
    
    </>
  )
}
