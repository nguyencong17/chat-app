'use client'
import React from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/16/solid'
import { Disclosure, Transition } from '@headlessui/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { isActiveLink } from '@/app/utils/template'

const MenuItem = (props:any) => {
  const {media,link,title,subnav} = props.menu
  const pathname = usePathname();
  const checkactive = isActiveLink(link, pathname);

  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button>
            <div className='flex gap-2 justify-between'>
            <div className='flex gap-2'>
              <Image width="0" height="0" src={media} className='w-[14px] height-[14px]' alt='icon'/>
              <Link href={link}className={`py-[6px] ${checkactive ? 'text-primary' : ''}`}>{title}</Link>
            </div>
            {subnav.length > 0 ? <ChevronDownIcon className={`inline-block w-[24px] duration-700 transform ${open ? 'rotate-180' : 'rotate-[0deg]'}`}/> : ''}
            </div>
          </Disclosure.Button>

          {/*
            Use the `Transition` + `open` render prop argument to add transitions.
          */}
          <Transition
            show={open}
            enter="transition-all duration-700 ease-out"
            enterFrom="max-h-0 overflow-hidden"
            enterTo="max-h-[300px] overflow-visible"
            leave="transition-all duration-700 ease-in"
            leaveFrom="max-h-[300px] overflow-visible"
            leaveTo=" max-h-0 overflow-hidden"
          >
            {/*
              Don't forget to add `static` to your `Disclosure.Panel`!
            */}
            <Disclosure.Panel static>
            {subnav && subnav.map((i: any) => (
              <Link href={''} key={i.id} className='block mb-2 ml-6'>{i.navitem}</Link>
            ))}
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  )
  
};

export default MenuItem;

