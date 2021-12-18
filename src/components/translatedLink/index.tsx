import { useRouter } from 'next/router'
import { default as NextLink } from 'next/link'
import { AnchorHTMLAttributes, FunctionComponent } from 'react'

interface IRoutes {
  [key: string]: string
}

interface IPathTranslations {
  [key: string]: IRoutes
}

const pathTranslations: IPathTranslations = {
  nl: {
    '/about': '/over-ons',
    '/rooms': '/kamers',
    '/contact': '/contact',
    '/login': '/login',
    '/register': '/registreer',
    '/newreservation': '/nieuwereservatie',
    '/profile/favorites': '/profiel/favorieten',
    '/profile/info': '/profiel/info',
    '/profile/reservations': '/profiel/reservaties',
    '/reservation/:reservationId': '/reservatie/:reservationId',
    '/room/:roomId': '/kamer/:roomId',
  },
}

interface TranslatedLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {}

const Link: FunctionComponent<TranslatedLinkProps> = ({
  href = '',
  children,
  ...props
}) => {
  const { locale } = useRouter()
  if (locale && href) {
    // Get translated route for non-default locales
    const translatedPath = pathTranslations[locale]?.[href]
    // Set `as` prop to change displayed URL in browser
    const as = translatedPath ? `/${locale}${translatedPath}` : undefined
    return (
      <NextLink href={href} as={as} passHref {...props}>
        {children}
      </NextLink>
    )
  } else {
    return <NextLink href={href}>{children}</NextLink>
  }
}

export default Link
