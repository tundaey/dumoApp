export function getUserDataSelector(state) {
    return state.profile.profile.profileComplete
}

export function getProfile(state) {
    return state.profile.profile
}

export function getProfileStatus(state) {
    console.log('selected', state.profile.profileComplete)
    return state.profile.loading
}