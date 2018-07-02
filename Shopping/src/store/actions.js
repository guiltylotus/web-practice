import * as types from './mutation-types'

export const setAdmin = ({ commit }, success) => commit(types.SET_ADMIN, success)

export const setName = ({ commit }, name) => commit(types.SET_NAME, name)
