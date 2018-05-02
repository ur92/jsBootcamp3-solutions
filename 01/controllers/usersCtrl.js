const Utils = require('../utils');
const Users = require('../models/users');

module.exports = (function () {
    // private properties
    let users, usersUtils, backToMainMenu;

    // events
    let listeners = {
        userDelete: []
    };

    let actions = {
        1: function (backToMainMenu) {
            Utils.interactWithUser(function (userDetails) {
                let newUser = new User(...userDetails.split(','));
                addOrUpdate(newUser);
                backToMainMenu();
            }, Utils.stringsResource.users.createOrUpdate);
        },
        2: function (backToMainMenu) {
            Utils.interactWithUser(function (userDetails) {
                remove(userDetails.split(','));
                backToMainMenu();
            }, Utils.stringsResource.users.remove);
        },
        3: function (backToMainMenu) {
            printList();
            backToMainMenu();
        }
    };

    function UsersCtrl(backToMainMenu) {
        backToMainMenu = backToMainMenu;
        usersUtils = new Utils('User');
        users = new Users();
    }

    // public methods
    UsersCtrl.prototype = {
        menu,
        getUser,
        addOrUpdate,
        remove,
        printList,
        on
    };

    // private methods
    function menu() {
        usersUtils.printTypeMenu();
        Utils.interactWithUser(function (selection) {
            actions[selection] ? actions[selection](backToMainMenu) : backToMainMenu();
        });
    }

    function addOrUpdate(user) {
        let userToUpdate = getUser(user.username);
        if (userToUpdate) { // update
            userToUpdate.age = user.age || userToUpdate.age;
            userToUpdate.password = user.password || userToUpdate.password;
        }
        else { // create new
            users[user.username] = user;
        }
    }

    function remove(username) {
        if (getUser(username)) {
            delete users[username];
            trigger('userDelete', username);
        }
    }

    function printList() {
        for (let username in users) {
            if (users.hasOwnProperty(username)) {
                console.log('* username: ' + username +
                    ', age: ' + users[username].age +
                    ', password: ' + users[username].password);
            }
        }
    }

    function getUser(username) {
        return users[username] ? users[username] : null;
    }

    function on(eventName, handler) {
        if (listeners[eventName]) {
            listeners[eventName].push(handler);
        }
        else {
            listeners[eventName] = [handler];
        }
    }

    function trigger(eventName, data) {
        if (listeners[eventName] && listeners[eventName].length) {
            listeners[eventName].forEach(handler => {
                if(!!handler && typeof handler === 'function'){
                    handler(data);
                }
            });
        }
    }

    return UsersCtrl;
})();


