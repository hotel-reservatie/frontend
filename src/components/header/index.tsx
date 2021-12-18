import React, { useState } from 'react'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import {
  Authenticated,
  NotAuthenticated,
  useAuth,
} from 'src/providers/authProvider'
import {
  MdFavorite,
  MdHelp,
  MdInfo,
  MdListAlt,
  MdLogin,
  MdLogout,
  MdPerson,
} from 'react-icons/md'
import { IoMdBed } from 'react-icons/io'
import HeaderUser from './headerUser'
import PageLayout from '../layout/PageLayout'
import { NavElement } from '../navigation/profileNavigation'
import { BsPencilSquare } from 'react-icons/bs'

const Header = () => {
  const [mobileMenuHidden, setMobileMenuHidden] = useState(true)
  const { t } = useTranslation('common')
  function toggleNav() {
    setMobileMenuHidden(!mobileMenuHidden)
  }

  const { logout } = useAuth()

  return (
    <nav className="bg-white shadow">
      <PageLayout className="py-0">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <Link href="/">
                <a className="flex items-center py-6 focus:outline-none  focus-visible:ring focus-visible:ring-blue-200">
                  <Image
                    src="/logo.svg"
                    alt="Logo"
                    width={32}
                    height={32}
                    className="mr-2"
                  />
                  <span className="font-semibold text-lg text-blue-700">
                    Hotel MCT
                  </span>
                </a>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              <Link href="/about">
                <a className="py-6 px-2 text-blue-800 hover:text-blue-700 transition duration-75 focus:outline-none  focus-visible:ring focus-visible:ring-blue-200">
                  {t('header.about')}
                </a>
              </Link>
              <Link href="/rooms">
                <a className="py-6 px-2 text-blue-800 hover:text-blue-700 transition duration-75 focus:outline-none  focus-visible:ring focus-visible:ring-blue-200">
                  {t('header.rooms')}
                </a>
              </Link>
              <Link href="/contact">
                <a className="py-6 px-2 text-blue-800 hover:text-blue-700 transition duration-75 focus:outline-none  focus-visible:ring focus-visible:ring-blue-200">
                  {t('header.contact')}
                </a>
              </Link>
            </div>
          </div>
          <Authenticated>
            <HeaderUser />
          </Authenticated>
          <NotAuthenticated>
            <div className="hidden md:flex items-center space-x-3 ">
              <Link href="/login">
                <a className="py-2 px-2 text-blue-800 font-medium rounded hover:text-blue-700 transition duration-75 focus:outline-none  focus-visible:ring focus-visible:ring-blue-200">
                  {t('header.signin')}
                </a>
              </Link>
              <Link href="/register">
                <a className="py-1 px-4 text-blue-100 font-medium  rounded-full bg-blue-800 hover:bg-blue-700 transition duration-75  focus:outline-none  focus-visible:ring focus-visible:ring-blue-200">
                  {t('header.register')}
                </a>
              </Link>
            </div>
          </NotAuthenticated>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleNav}
              className="focus:outline-none  focus-visible:ring focus-visible:ring-blue-200 mobile-menu-button"
            >
              <svg
                className=" w-6 h-6  hover: "
                x-show="!showMenu"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="#062782"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
        <div className={`${mobileMenuHidden ? 'hidden' : ''} mobile-menu `}>
          <ul className=" py-2">
            <NotAuthenticated>
              <NavElement
                Icon={MdLogin}
                title="Login"
                href="/login"
                className=" border-white"
              />
              <NavElement
                Icon={BsPencilSquare}
                title="Register"
                href="/register"
                className=" border-white"
              />
            </NotAuthenticated>
            <Authenticated>
              <NavElement
                Icon={MdPerson}
                title="Customer Info"
                href="/profile/info"
                className=" border-white"
              />
              <NavElement
                Icon={MdFavorite}
                title="Favorites"
                href="/profile/favorites"
                className=" border-white"
              />
              <NavElement
                Icon={MdListAlt}
                title="My Reservations"
                href="/profile/reservations"
                className=" border-white"
              />
            </Authenticated>
            <NavElement
              Icon={MdInfo}
              title={t('header.about')}
              href="/about"
              className=" border-white"
            />
            <NavElement
              Icon={IoMdBed}
              title={t('header.rooms')}
              href="/rooms"
              className=" border-white"
            />
            <NavElement
              Icon={MdHelp}
              title={t('header.contact')}
              href="/contact"
              className=" border-white"
            />
            <Authenticated>
              <NavElement
                Icon={MdLogout}
                title='Sign Out'
                href="/login"
                className=" border-white"
                onClick={logout}
              />
            </Authenticated>
            {/* <li className="active px-6">
              <Link href="/about">
                <a className="block text-sm px-2 py-6 text-blue-800 transition duration-75 focus:outline-none  focus-visible:ring focus-visible:ring-blue-200">
                  {t('header.about')}
                </a>
              </Link>
            </li>
            <li className="px-6">
              <Link href="/rooms">
                <a className="block text-sm px-2 py-6 text-blue-800 transition duration-75 focus:outline-none  focus-visible:ring focus-visible:ring-blue-200">
                  {t('header.rooms')}
                </a>
              </Link>
            </li>
            <li className="px-6">
              <Link href="/contact">
                <a className="block text-sm px-2 py-6 text-blue-800 transition duration-75 focus:outline-none  focus-visible:ring focus-visible:ring-blue-200">
                  {t('header.contact')}
                </a>
              </Link>
            </li> */}
          </ul>
        </div>
      </PageLayout>
    </nav>
  )
}

export default Header
