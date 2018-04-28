const Utils = require('./utils');

module.exports = Groups;

function Groups(rl, users) {
    // private properties
    let groups = {};
    const utils = new Utils(rl);

    let actions = {
        1: function (backToMainMenu) {
            rl.question('enter group name to add: ', function (groupName) {
                addGroup(groupName);
                backToMainMenu();
            });
        },
        2: function (backToMainMenu) {
            rl.question('enter group name to remove: ', function (groupName) {
                removeGroup(groupName);
                backToMainMenu();
            });
        },
        3: function (backToMainMenu) {
            printList();
            backToMainMenu();
        }
    };

    let usersToGroupActions = {
        1: function (backToMainMenu) {
            rl.question('enter user to add to group like USERNAME,GROUP: ',
                function (userGroupArgs) {
                    let userGroupArray = userGroupArgs.split(',');
                    addUserToGroup(userGroupArray[0], userGroupArray[1]);
                    backToMainMenu();
                });
        },
        2: function (backToMainMenu) {
            rl.question('enter user to remove from group like USERNAME,GROUP: ',
                function (userGroupArgs) {
                    let userGroupArray = userGroupArgs.split(',');
                    removeUserFromGroup(userGroupArray[0], userGroupArray[1]);
                    backToMainMenu();
                });
        },
        3: function (backToMainMenu) {
            printGroupsAndUsersList();
            backToMainMenu();
        }
    };

    (function init() {
        users.on('userDelete', onUserDeleteHandler);
    })();

    // public methods
    return {
        menu: menu,
        usersToGroupMenu: usersToGroupMenu
    };

    // private mathods
    function menu(backToMainMenu) {
        utils.showOptions('Group');
        utils.readSelectedCommand(function (selection) {
            actions[selection] ? actions[selection](backToMainMenu) : backToMainMenu();
        });
    }

    function usersToGroupMenu(backToMainMenu) {
        utils.showUsersToGroupOptions();

        utils.readSelectedCommand(function (selection) {
            usersToGroupActions[selection] ? usersToGroupActions[selection](backToMainMenu) : backToMainMenu();
        });
    }

    function addGroup(groupName) {
        if (!groups[groupName]) {
            groups[groupName] = {};
        }
    }

    function removeGroup(groupName) {
        if (groups[groupName]) {
            delete groups[username];
        }
    }

    function printList() {
        for (let groupname in groups) {
            console.log('* ', groupname);
        }
    }

    function printGroupsAndUsersList() {
        for (let groupname in groups) {
            console.log('* ', groupname);
            for (let username in groups[groupname]) {
                console.log('*** ' + username + ' (' + users.getUser(username).age + ')');
            }
        }
    }

    function addUserToGroup(username, groupname) {
        if (users.getUser(username) && groups[groupname]) {
            groups[groupname][username] = users.getUser(username);
        }
    }

    function removeUserFromGroup(username, groupname) {
        if (groups[groupname] && groups[groupname][username]) {
            delete groups[groupname][username];
        }
    }

    function onUserDeleteHandler(username) {
        for (let groupname in groups) {
            removeUserFromGroup(username, groupname);
        }
    }
}

