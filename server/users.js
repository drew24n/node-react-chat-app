let users = []

const addUser = ({id, name, room}) => {
    name = name.trim().toLocaleLowerCase()
    room = room.trim().toLocaleLowerCase()

    const existingUser = users.find(user => user.room === room && user.name === name)
    if (existingUser) return {error: 'username is already taken'}
    if (name.length > 20 || room.length > 20) return {error: 'user name or room length should be up to 10 symbols'}
    if (!name || !room) return {error: 'user name or room can`t be empty'}

    const user = {id, name, room}
    users.push(user)
    console.log(users)
    return {user}
}

const removeUser = (id) => {
    let removedUser = users.filter(user => user.id === id)
    users = users.filter(user => user.id !== id)
    console.log(users)
    return removedUser[0]
}

const getUser = (id) => users.find(user => user.id === id)

const getUsersInRoom = (room) => users.filter(user => user.room === room)

module.exports = {addUser, removeUser, getUser, getUsersInRoom}