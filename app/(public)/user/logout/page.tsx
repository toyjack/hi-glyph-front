'use client'
import {useEffect} from 'react'

function LogoutPage() {
  useEffect(() => {
    localStorage.clear()
  }, [])

  return (
    <div>Logouted!</div>
  )
}

export default LogoutPage