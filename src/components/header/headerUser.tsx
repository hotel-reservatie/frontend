import Link from 'next/link'
import router, { useRouter } from 'next/router'
import React, {
  FunctionComponent,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react'
import { IconType } from 'react-icons'
import {
  MdFavorite,
  MdListAlt,
  MdLogout,
  MdOutlineShoppingBasket,
  MdPerson,
} from 'react-icons/md'
import { useAuth } from 'src/providers/authProvider'
import Translater from '../translater'

interface DropDownItemProps {
  Icon: IconType
  href: string
  title: string
  onClick?: React.MouseEventHandler<HTMLLIElement | undefined>
}

export const DropDownItem: FunctionComponent<DropDownItemProps> = ({
  Icon,
  href,
  title,
  onClick,
}) => {
  return (
    <Link href={href}>
      <li
        className=" p-4 border-1 border-blue-200 hover:cursor-pointer hover:bg-blue-100"
        onClick={onClick}
      >
        <div className=" flex items-center gap-2">
          {<Icon size={24} />}
          <a href="">
            <Translater>{title}</Translater>
          </a>
        </div>
      </li>
    </Link>
  )
}

export const UserDropDown = () => {
  const { logout } = useAuth()
  return (
    <div className=" z-50 absolute top-16 right-0 bg-white border-1 rounded-lg border-blue-400 shadow">
      <ul>
        <DropDownItem Icon={MdPerson} title={'Profile'} href="/profile/info" />
        <DropDownItem
          Icon={MdFavorite}
          title={'Favorites'}
          href="/profile/favorites"
        />
        <DropDownItem
          Icon={MdListAlt}
          title={'My Reservations'}
          href="/profile/reservations"
        />
        <DropDownItem
          Icon={MdOutlineShoppingBasket}
          title={'Cart'}
          href="/newreservation"
        />
        <DropDownItem
          Icon={MdLogout}
          onClick={logout}
          title={'Sign Out'}
          href="/login"
        />
      </ul>
    </div>
  )
}

const HeaderUser = () => {
  const divRef = useRef<HTMLDivElement>(null)
  const { user } = useAuth()
  const router = useRouter()
  const [isOpen, setisOpen] = useState(false)

  const handleOpenProfile = () => {
    setisOpen(!isOpen)
  }

  const handleClickOutside = (e: MouseEvent) => {
    if (divRef.current?.contains(e.target as Node)) {
      return
    }
    setisOpen(false)
  }

  useEffect(() => {
    document.addEventListener('mouseup', handleClickOutside)

    return () => {
      document.removeEventListener('mouseup', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    setisOpen(false)
  }, [router])

  return (
    <div ref={divRef} className="flex items-center gap-4 relative">
      <p className="">{user?.displayName}</p>
      <div
        onClick={handleOpenProfile}
        className=" rounded-3xl hover:bg-blue-200 hover:cursor-pointer  p-1"
      >
        <MdPerson size={32} />
      </div>
      {isOpen ? <UserDropDown /> : null}
    </div>
  )
}

export default HeaderUser
