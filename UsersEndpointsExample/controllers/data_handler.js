"use strict";

const fs = require('fs')
const User = require('./users')

let content = fs.readFileSync('./data/users.json')
let users = JSON.parse(content).map(User.generateUser);

function getUsers() {
    return users
}

function getUserByEmail(email) {
    return users.find(user => user.email === email)
}

function createUser(user) {
    if (isUserValid(user)) {
        users.push(User.generateUser(user))
        fs.writeFileSync('./data/users.json', JSON.stringify(users))
    }
}

function updateUser(email, updatedUser) {
    let index = users.findIndex(user => user.email === email);
    if (index == -1) return;

    for (let property in updatedUser) {
        if (['nombre', 'apellidos', 'password', 'fecha', 'sexo', 'imagen'].includes(property)) continue;
        delete updatedUser[property];
    } 

    Object.assign(users[index], updatedUser);
    fs.writeFileSync('./data/users.json', JSON.stringify(users))
}

function deleteUser(email) {    
    let index = users.findIndex(user => user.email === email)
    if (index == -1) return;

    let user = users.splice(index, 1)[0]
    fs.writeFileSync('./data/users.json', JSON.stringify(users))
    return user
}

function isUserValid(nombre, apellidos, email) {
    if (users.find(user => user.nombre == nombre && user.apellidos == apellidos)) return false;
    if (users.find(user => user.email == email)) return false;
    return true;
}

exports.getUsers = getUsers;
exports.getUserByEmail = getUserByEmail;
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;