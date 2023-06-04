export default ({ $auth, redirect }) => {
    if ($auth.user.role != 'admin') {
        return redirect('/login')
    }
}