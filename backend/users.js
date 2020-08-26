const users = []

const addUser = ({id, name, room}) => {
    name = name.trim().toLocaleLowerCase()
    room = room.trim().toLocaleLowerCase()

    const existingUser = users.find(user => user.room === room && user.name === name)
    if (existingUser) return {error: 'username is already taken'}
    if (name.length || room.length > 10) return {error: `user name or room name length shouldn't exceed 10 symbols`}

    const user = {id, name, room}
    users.push(user)
    return {user}
}

const removeUser = (id) => {
    return users.filter(user => {
        if (user.id === id) return undefined
        else return user
    })
}

const getUser = (id) => users.find(user => user.id === id)

const getUsersInRoom = (room) => users.filter(user => user.room === room)

module.exports = {addUser, removeUser, getUser, getUsersInRoom}