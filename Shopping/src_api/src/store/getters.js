const isAdmin = state => state.app.isAdmin
const getUserName = state => state.app.name.username
const getDisplayName = state => state.app.name.displayName

export {
  isAdmin,
  getUserName,
  getDisplayName
}
