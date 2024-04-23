import React, { Fragment, useEffect, useState } from 'react'
import Image from 'next/image'
import { User } from '@/app/types'
import { fetchUserLogin } from '@/app/_api/routes'

export default async function Header() {
  let user: User[] | null = null
  try {
    user = await fetchUserLogin();
  } catch (error) {
    console.log("Field to fetch User Login, Debug : ", error);
  }

  return(
    <div className='absolute left-0 right-0 top-0 h-[70px]'>
      <nav className="bg-transparent">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div className="relative text-gray-600">
            <input type="search" name="serch" placeholder="Search" className="h-10 px-5 pr-10 w-[336px] rounded-full text-sm focus:outline-none bg-white"/>
            <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
            </button>
          </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button type="button" className="relative rounded-full bg-transparent p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <span className="absolute -inset-1.5"></span>
              <span className="sr-only">View notifications</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
            </button>

            <div className="relative ml-3">
              <div>
                <button type="button" className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">Open user menu</span>
                  {
                    (user ? user : []).map((item: any) => {
                      const {media, name, id} = item
                      return (
                        <Fragment key={id}>
                          <Image
                          className='h-8 w-8 rounded-full'
                          src={media}
                          width={500}
                          height={500}
                          alt={name}
                          />
                        </Fragment>
                      )
                    })
                  }
                </button>
              </div>
              {/* <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-1">Settings</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">Sign out</a>
              </div> */}
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
};
