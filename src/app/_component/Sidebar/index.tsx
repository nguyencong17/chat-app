import React from 'react';
import Logo from '../../../../public/logo.png'
import Image from 'next/image';
import Link from 'next/link';
import dashboard from '../../../../public/icon/dashboard.svg'
import { Menu } from '@/app/types';
import { fetchSidebar } from '@/app/_api/routes';
import MenuItem from './menu';


export default async function Sidebar() {
  let sidebar: Menu[] | null = null
  try {
    sidebar = await fetchSidebar();
  } catch (error) {
    console.log('Field to fetch Sidebar, Debug : ', error);
  }
  
  return (
    <div>
      <div className='flex items-center gap-2 p-4'>
        <Image
          src={Logo}
          width="0"
          height="0"
          alt='Logo Image'
          className='w-[40px] h-[40px]'
        />
        <p className='text-primary text-[28px] font-bold'>falcon</p>
      </div>
      <div className=''>
        <ul className='flex flex-col'>
          { Array.isArray(sidebar) && sidebar.map((item, index) => {
            return(
              <MenuItem key={index} menu={item}></MenuItem>
            )
          })}
        </ul>
      </div>
    </div>
  )
};
