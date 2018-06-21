export function getUserDataSelector(state, uid) {
    return state.auth[uid]
}