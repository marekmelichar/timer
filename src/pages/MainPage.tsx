import React from 'react'
import { Box } from '@mui/material'
import { CountDownTimer } from '@/features'

export const MainPage: React.FC = () => {
  return (
    <Box sx={{ padding: '1.5rem' }}>
      <CountDownTimer />
    </Box>
  )
}
