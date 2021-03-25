const guestMiddleware = ({ $auth, redirect }) => {
  if ($auth.loggedIn) {
    redirect('/dashboard')
  }
}

export default guestMiddleware
