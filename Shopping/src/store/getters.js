const isAdmin = state => state.app.isAdmin
const getUserName = state => state.app.name.username
const getDisplayName = state => state.app.name.displayName
const getFlag = state => state.app.flag

export {
  isAdmin,
  getUserName,
  getDisplayName,
  getFlag
}
