import { Middleware } from '@nuxt/types'

const guestMiddleware: Middleware = ({ $auth, redirect }) => {
  if (!$auth.loggedIn) {
    redirect('/sign-in')
  }
}

export default guestMiddleware
