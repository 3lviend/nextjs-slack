import '~/styles/style.scss'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import UserContext from 'lib/UserContext'
import { supabase } from 'lib/Store'
import { jwtDecode } from 'jwt-decode'

export default function SupabaseSlackClone({ Component, pageProps }) {
  const [userLoaded, setUserLoaded] = useState(false)
  const [user, setUser] = useState(null)
  const [session, setSession] = useState(null)
  const router = useRouter()

  useEffect(() => {
    function saveSession(
      /** @type {Awaited<ReturnType<typeof supabase.auth.getSession>>['data']['session']} */
      session
    ) {
      setSession(session)
      const currentUser = session?.user
      if (session) {
        const jwt = jwtDecode(session.access_token)
        currentUser.appRole = jwt.user_role
      }
      setUser(currentUser ?? null)
      setUserLoaded(!!currentUser)
      if (currentUser) {
        router.push('/channels/[id]', '/channels/1')
      }
    }

    let authListener = null
    
    if (supabase?.auth) {
      supabase.auth.getSession().then(({ data: { session } }) => saveSession(session)).catch(console.error)

      try {
        const authStateChange = supabase.auth.onAuthStateChange(
          async (event, session) => {
            console.log(session)
            saveSession(session)
          }
        )
        // Handle both possible return structures
        authListener = authStateChange?.data?.subscription || authStateChange?.subscription
      } catch (error) {
        console.error('Error setting up auth listener:', error)
      }
    } else {
      console.warn('Supabase is not properly configured. Please check your environment variables (NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY).')
    }

    return () => {
      if (authListener && typeof authListener.unsubscribe === 'function') {
        authListener.unsubscribe()
      }
    }
  }, [])

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (!error) {
      router.push('/')
    }
  }

  return (
    <UserContext.Provider
      value={{
        userLoaded,
        user,
        signOut,
      }}
    >
      <Component {...pageProps} />
    </UserContext.Provider>
  )
}
