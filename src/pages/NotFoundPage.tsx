import React from 'react'
import { Navigate } from 'react-router-dom'

import { MAIN_ROUTE } from '@/routes'

export const NotFoundPage: React.FC = () => {
  return <Navigate to={MAIN_ROUTE} />
}
