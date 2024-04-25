export function getUserId() {
    return JSON.parse(atob(localStorage.getItem('token').split('.')[1])).sub
}