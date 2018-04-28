const Utils = require('./utils');

module.exports = Users;

function Users(rl) {
    // private properties
    let users = {};
    const utils = new Utils(rl);
    let listeners = {
        userDelete: []
    };

    let actions = {
        1: function (backToMainMenu) {
            rl.question('enter user details with this format: USERNAME,AGE,PASSWORD: ',
                function (userDetails) {
                    addOrUpdateUser(userDetails.split(','));
                    backToMainMenu();
                });
        },
        2: function (backToMainMenu) {
            rl.question('enter username to remove: ', function (username) {
                removeUser(username);
                backToMainMenu();
            });
        },
        3: function (backToMainMenu) {
            printList();
            backToMainMenu();
        }
    };

    // public methods
    return {
        menu: menu,
        getUser: getUser,
        on: on
    };

    // private methods
    function menu(backToMainMenu) {
        utils.showOptions('User');
        utils.readSelectedCommand(function (selection) {
            actions[selection] ? actions[selection](backToMainMenu) : backToMainMenu();
        });
    }

    function addOrUpdateUser(userDetailsArray) {
        let username = userDetailsArray[0];
        let age = userDetailsArray[1];
        let password = userDetailsArray[2];

        let userToUpdate = getUser(username);
        if (userToUpdate) { // update
            userToUpdate.age = age || userToUpdate.age;
            userToUpdate.password = password || userToUpdate.password;
        }
        else { // create new
            users[username] = {
                age: age,
                password: password
            }
        }
    }

    function removeUser(username) {
        if (getUser(username)) {
            delete users[username];
            trigger('userDelete', username);
        }
    }

    function printList() {
        for (let username in users) {
            console.log('* username: ' + username + ', age: ' + users[username].age + ', password: ' + users[username].password);
        }
    }

    function getUser(username) {
        return users[username] ? users[username] : null;
    }

    function on(eventName, handler) {
        if(listeners[eventName]){
            listeners[eventName].push(handler);
        }
        else{
            listeners[eventName]=[handler];
        }
    }

    function trigger(eventName, data){
        if(listeners[eventName] && listeners[eventName].length){
            listeners[eventName].forEach(handler => handler(data));
        }
    }
}
