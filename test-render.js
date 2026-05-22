import React from 'react'
import { renderToString } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import TutorDashboard from './src/pages/Tutor/Dashboard.jsx'

try {
  const html = renderToString(
    <MemoryRouter>
      <TutorDashboard />
    </MemoryRouter>
  )
  console.log('RENDER SUCCESSFUL! HTML length:', html.length)
} catch (error) {
  console.error('RENDER FAILED WITH ERROR:', error)
}
