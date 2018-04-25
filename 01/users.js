const Utils = require('./utils');

module.exports = Users;

function Users(rl) {
    // private properties
    let users={};
    const utils = new Utils(rl);

    // public methods
    return {
        menu: menu,
        addUser: addUser,
        removeUser: removeUser,
        printList: printList,
        getUser: getUser
    };

    // prototyping??
    function menu(backToMainMenu) {
        utils.showOptions('User');
        utils.readSelectedCommand(function (selection) {
            switch (selection){
                case '1':
                    rl.question('enter user details with this format: USERNAME,AGE,PASSWORD: ',
                        function (userDetails) {
                            addUser(userDetails.split(','));
                            backToMainMenu();
                        });
                    break;
                case '2':
                    rl.question('enter username to remove: ', function (username) {
                        removeUser(username);
                        backToMainMenu();
                    });
                    break;
                case '3':
                    printList();
                    backToMainMenu();
                    break;
                case '4':
                    backToMainMenu();
                    break;
            }
        });
    }

    function addUser(userDetailsArray) {
        let username = userDetailsArray[0];
        let age = userDetailsArray[1];
        let password = userDetailsArray[2];

        if (!getUser(username)) {
            users[username] = {
                age: age,
                password: password
            }
        }
    }

    function removeUser(username) {
        if (getUser(username)) {
            delete users[username];
        }
    }

    function printList() {
        for(let username in users){
            console.log('username: '+ username+', age: '+ users[username].age+', password: '+users[username].password);
        }
    }

    function getUser(username) {
        return users[username]? users[username]: null;
    }
}
