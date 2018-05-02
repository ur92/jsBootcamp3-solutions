module.exports = (function () {
    function User(username, age, password) {
        this.username = username;
        this.age = age;
        this.password = password;
    }

    function Users() {
        this._users = {};
    }

    // public methods
    Users.prototype = {
        getUser,
        add,
        update,
        remove,
        printList,
    };

    Users.User = User;

    // private methods
    function add(user) {
        this._users[user.username] = user;
    }

    function update(user, age, password) {
        user.age = age || user.age;
        user.password = password || user.password;
    }

    function remove(username) {
        if (this.getUser(username)) {
            delete this._users[username];
        }
    }

    function printList() {
        for (let username in this._users) {
            if (this._users.hasOwnProperty(username)) {
                console.log('*** username: ' + username +
                    ', age: ' + this._users[username].age +
                    ', password: ' + this._users[username].password);
            }
        }
    }

    function getUser(username) {
        return this._users[username] ? this._users[username] : null;
    }

    return Users;
})();


