import React from 'react'
import logo from '../../assets/logo.png'
import TH from '../../assets/TH.png'
import UK from '../../assets/UK.png'
import { Link } from 'react-router-dom';


function Header() {
  return (
    <>
      <nav className='border-b-2 py-[5px]'>
        <div className='flex justify-between w-[80%] mx-auto text-[1.1rem]'>
          <div className='w-1/3 flex items-center justify-start'>
            <ul className='flex gap-[5rem]'>
              <li>หน้าหลัก</li>
              <li>รายการที่ชอบ</li>
            </ul>
          </div>
          <div className='w-1/3 flex justify-center items-center'><img className='w-[6rem]' src={logo} alt="Logo" /></div>
          <div className='w-1/3 flex items-center justify-end'>
            <span className='flex gap-[5rem] justify-center items-center'>
              <Link to='/'>
                <div className='bg-primary text-white p-2 rounded-[5px]'>เข้าสู่ระบบ / สมัครสมาชิก</div>
              </Link>
              <div className='flex justify-center items-center gap-[1rem]'>
                <img className='w-[3rem]' src={TH} alt="" />
                <img className='w-[3rem]' src={UK} alt="" />
              </div>
            </span>
          </div>
        </div>

      </nav>
    </>
  )
}

export default Header