const Utils = require('./utils');

module.exports = Groups;

function Groups(rl, users) {
    // private properties
    let groups = {};
    const utils = new Utils(rl);

    // public methods
    return {
        menu: menu,
        manageUsersMenu: manageUsersMenu,
        addGroup: addGroup,
        removeGroup: removeGroup,
        printList: printList,
        printGroupsAndUsers: printGroupsAndUsersList,
        addUserToGroup: addUserToGroup,
        removeUserFromGroup: removeUserFromGroup
    };

    // prototyping??
    function menu(backToMainMenu) {
        utils.showOptions('Group');
        utils.readSelectedCommand(function (selection) {
            switch (selection) {
                case '1':
                    rl.question('enter group name to add: ', function (groupName) {
                        addGroup(groupName);
                        backToMainMenu();
                    });
                    break;
                case '2':
                    rl.question('enter group name to remove: ', function (groupName) {
                        removeGroup(groupName);
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

    function manageUsersMenu(backToMainMenu) {
        console.log('');
        console.log('=== User association Management ===');
        console.log('1. Add user to group');
        console.log('2. Remove user from group');
        console.log('3. List groups and associated users');
        console.log('4. Back');

        utils.readSelectedCommand(function (selection) {
            switch (selection) {
                case '1':
                    rl.question('enter user to add to group like USERNAME,GROUP: ',
                        function (userGroupArgs) {
                            let userGroupArray = userGroupArgs.split(',');
                            addUserToGroup(userGroupArray[0], userGroupArray[1]);
                            backToMainMenu();
                        });
                    break;
                case '2':
                    rl.question('enter user to remove from group like USERNAME,GROUP: ',
                        function (userGroupArgs) {
                            let userGroupArray = userGroupArgs.split(',');
                            removeUserFromGroup(userGroupArray[0], userGroupArray[1]);
                            backToMainMenu();
                        });
                    break;
                case '3':
                    printGroupsAndUsersList();
                    backToMainMenu();
                    break;
                case '4':
                    backToMainMenu();
                    break;
            }
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
            console.log(groupname);
        }
    }

    function printGroupsAndUsersList() {
        for (let groupname in groups) {
            console.log('* ' + groupname);
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
        if (users.getUser(username) && groups[groupname] && groups[groupname][username]) {
            delete groups[groupname][username];
        }
    }
}

