'use client'
import { useSession, signIn, signOut } from 'next-auth/react';
import { useState } from 'react';
import { Menu } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import {UserInfo} from '@/app/types/user'

import * as React from "react";

export default function TopBar() {
  const { data:session , status } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);

  const [isGoogleLoading, setIsGoogleLoading] = React.useState<boolean>(false);
  const googlelogin = async () => {
    setIsGoogleLoading(true);
    signIn("google", {
      callbackUrl: `${window.location.origin}`,
    });
  };

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    
    <div className="px-4 sm:px-6 lg:px-8 ">
    <div className="flex items-center justify-between border-b border-zinc-100 py-3">
      <div className="flex items-center gap-4">
        <Image
          src="/StickerSprout.jpg"
          width={30}
          height={33}
          //className="h-9 w-9"
          alt="this is icon"
        />
        <Link href="/" className="hidden md:inline-flex font-brand text-orange-500 ">
        StickerSprout
        </Link>
        <a
          href="https://github.com/twmtest/summer-01"
          className="font-brand hidden md:inline-flex"
        >
          Go to TWM&apos;s GitHub warehouse
        </a>
      </div>
      <div className="font-brand flex items-center gap-4">
        {!session ? (
        <button onClick={googlelogin} className='className="rounded-lg bg-white hover:bg-gray-50 py-2 px-3 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 active:text-gray-800 "'>Login</button>

        ) : (
          <Menu as="div" className="relative">
            {({ open }) => (
              <>
              {session?.user &&
                (<div className="flex items-center gap-2">
                <Menu.Button className="rounded-full focus:outline-none focus:ring">
                  <Image
                    src={session.user?.image || ""}
                    width={36}
                    height={36}
                    className="rounded-full cursor-pointer"
                    alt="User Avatar"
                  />
                </Menu.Button>
                <div>
                  <div className="text-sm font-medium text-gray-800">
                    {session.user.name}
                  </div>
                  <div className="text-xs text-gray-600">
                    {session.user.email}
                  </div>
                </div>
              </div>)
              }
                
                <Menu.Items
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleSignOut}
                        className={`${
                          active ? 'bg-gray-100' : ''
                        } block w-full text-left py-2 px-4 text-sm text-gray-800`}
                      >
                        Sign out
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </>
            )}
          </Menu>
        )}
        <Link
          href="/MyPictures"
          className="rounded-lg bg-white hover:bg-gray-50 py-2 px-3 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 active:text-gray-800 "
        >
          Oven
        </Link>
        <Link
          href="/SearchPictures"
          className="rounded-lg bg-white hover:bg-gray-50 py-2 px-3 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 active:text-gray-800 "
        >
          Search
        </Link>
      </div>
    </div>
  </div>
  );
}
