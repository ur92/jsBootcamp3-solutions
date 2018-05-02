function User(username, age, password) {
    this.username = username;
    this.age = age;
    this.password = password;
}

module.exports = (function () {
    // private properties
    let users;

    function Users() {
        users = {};
    }

    // public methods
    Users.prototype = {
        getUser,
        addOrUpdate,
        remove,
        printList,
    };

    // private methods
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

    return Users;
})();


