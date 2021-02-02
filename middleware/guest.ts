import { Middleware } from '@nuxt/types'

const guestMiddleware: Middleware = ({ $auth, redirect }) => {
  if ($auth.loggedIn) {
    redirect('/dashboard')
  }
}

export default guestMiddleware
