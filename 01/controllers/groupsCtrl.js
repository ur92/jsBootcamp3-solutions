const Utils = require('../utils');
const Groups = require('../models/groups');

module.exports = (function () {
    // private properties
    let backToMainMenu, groupUtils, groups;

    let actions = {
        1: function () {
            groupUtils.interactWithUser(function (groupName) {
                groups.addGroup(groupName);
                backToMainMenu();
            }, 'create');
        },
        2: function () {
            groupUtils.interactWithUser(function (groupName) {
                groups.removeGroup(groupName);
                backToMainMenu();
            }, 'remove');
        },
        3: function (backToMainMenu) {
            groups.printList();
            backToMainMenu();
        }
    };

    let usersToGroupActions = {
        1: function () {
            groupUtils.interactWithUser(function (userGroupArgs) {
                groups.addUserToGroup(...userGroupArgs.split(','));
                backToMainMenu();
            }, 'assignUserToGroup');
        },
        2: function () {
            groupUtils.interactWithUser(function (userGroupArgs) {
                groups.removeUserFromGroup(...userGroupArgs.split(','));
                backToMainMenu();
            }, 'removeUserFromGroup');
        },
        3: function () {
            groups.printGroupsAndUsersList();
            backToMainMenu();
        }
    };


    function GroupsCtrl(backToMainMenu, usersCtrl) {
        backToMainMenu = backToMainMenu;
        groupUtils = new Utils('Group');
        groups = new Groups();
        usersCtrl.on('userDelete', groups.removeUserFromAllGroups);
    }

    // public methods
    GroupsCtrl.prototype = {
        menu,
        usersToGroupMenu
    };

    // private mathods
    function menu(backToMainMenu) {
        groupUtils.printTypeMenu();
        groupUtils.interactWithUser(function (selection) {
            actions[selection] ? actions[selection](backToMainMenu) : backToMainMenu();
        });
    }

    function usersToGroupMenu(backToMainMenu) {
        groupUtils.printUsersToGroupMenu();
        groupUtils.interactWithUser(function (selection) {
            usersToGroupActions[selection] ? usersToGroupActions[selection](backToMainMenu) : backToMainMenu();
        });
    }

    return GroupsCtrl;

})();


