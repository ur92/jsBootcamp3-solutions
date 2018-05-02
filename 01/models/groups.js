const Users = require('./users');

function Group(groupName) {
    this.groupName = groupName;
    this.users = new Users();
}

module.exports = (function () {
    // private properties
    let groups;

    function Groups() {
        groups = {};
    }

    // public methods
    Groups.prototype = {
        addGroup,
        removeGroup,
        printList,
        printGroupsAndUsersList,
        addUserToGroup,
        removeUserFromGroup,
        removeUserFromAllGroups
    };

    // private mathods
    function addGroup(groupName) {
        if (!groups[groupName]) {
            groups[groupName] = new Group(groupName);
        }
    }

    function removeGroup(groupName) {
        if (groups[groupName]) {
            delete groups[groupName];
        }
    }

    function printList() {
        for (let groupname in groups) {
            if (groups.hasOwnProperty(groupname)) {
                console.log('* ', groupname);
            }
        }
    }

    function printGroupsAndUsersList() {
        for (let groupname in groups) {
            if (groups.hasOwnProperty(groupname)) {
                console.log('* ', groupname);
                groups[groupname].users.printList();
            }
        }
    }

    function addUserToGroup(username, groupname) {
        let userToAdd = users.getUser(username);
        if (userToAdd && groups[groupname]) {
            groups[groupname].users.addOrUpdate(userToAdd);
        }
    }

    function removeUserFromGroup(username, groupname) {
        if (groups[groupname] && groups[groupname].users.getUser(username)) {
            groups[groupname].users.remove(username);
        }
    }

    function removeUserFromAllGroups(username) {
        for (let groupname in groups) {
            if (groups.hasOwnProperty(groupname)) {
                removeUserFromGroup(username, groupname);
            }
        }
    }

    return Groups;
})();


