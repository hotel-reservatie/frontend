import { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'

const Translater: FunctionComponent = ({ children }) => {
  const { t } = useTranslation('common')
  return <>{t(`${children}`)}</>
}

export default Translater
