const guestMiddleware = ({ $auth, redirect }) => {
  if (!$auth.loggedIn) {
    redirect('/sign-in')
  }
}

export default guestMiddleware
