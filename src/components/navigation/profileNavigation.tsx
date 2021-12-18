import Link from 'src/components/translatedLink'
import { useRouter } from 'next/router'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { IconType } from 'react-icons'
import { MdFavorite, MdListAlt, MdPerson } from 'react-icons/md'
import PageLayout from 'src/components/layout/PageLayout'
import PageTitle from '../text/PageTitle'
import Translater from '../translater'

interface ProfileNavigationProps {
  title: string
}

interface NavElementProps {
  Icon: IconType
  href: string
  title: string
  className?: string
  onClick?: React.MouseEventHandler<HTMLLIElement | undefined>
}

export const NavElement: FunctionComponent<NavElementProps> = ({
  Icon,
  href,
  title,
  onClick,
  className = 'border-blue-50'
}) => {
  const router = useRouter()
  const [selected, setSelected] = useState(true)

  useEffect(() => {
    if (router.pathname == href) {
      setSelected(true)
    } else {
      setSelected(false)
    }
  }, [router.pathname])
  return (
    <Link href={href}>
      <li
        className={
          selected ? 'border-l-4 border-blue-700' : `border-l-4 ${className}`
        }
        onClick={onClick}
      >
        <div className="p-2 hover:translate-x-1 hover:cursor-pointer transition-all flex items-end justify-start gap-2">
          {<Icon size={24} />}
          <a className=" whitespace-nowrap" href="">
            <Translater>{title}</Translater>
          </a>
        </div>
      </li>
    </Link>
  )
}

export const Nav: FunctionComponent<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
}) => {
  return (
    <div className={className ? className : ''}>
      <ul>
        <NavElement
          Icon={MdPerson}
          title="Customer Info"
          href="/profile/info"
        />
        <NavElement
          Icon={MdFavorite}
          title="Favorites"
          href="/profile/favorites"
        />
        <NavElement
          Icon={MdListAlt}
          title="My Reservations"
          href="/profile/reservations"
        />
      </ul>
    </div>
  )
}

const ProfileNavigation: FunctionComponent<ProfileNavigationProps> = ({
  children,
  title,
}) => {
  return (
    <PageLayout>
      <div className="flex gap-8">
        <Nav className=" hidden md:block" />
        <div className="w-full">
          <PageTitle>{title}</PageTitle>
          {children}
        </div>
      </div>
    </PageLayout>
  )
}

export default ProfileNavigation
