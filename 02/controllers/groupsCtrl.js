const Utils = require('../view/utils');
const Groups = require('../models/groups');
const TreeComponent = require('../view/treeComponent');

module.exports = (function () {
    // private and static properties
    let _backToMainMenu, _groupUtils, _groups, _usersCtrl, _treeComponent;

    let actions = {
        1: function (currentGroup) {
            _groupUtils.interactWithUser((groupName) => {
                if (currentGroup.users.count()===0) {
                    Utils.printDoneMessage(
                        _groups.addGroup(currentGroup, groupName));
                }else {
                    Utils.printDoneMessage(false);
                }
                menu();
            }, 'create');
        },
        2: function (currentGroup) {
            Utils.printDoneMessage(
                _groups.removeGroup(currentGroup));
            menu();
        }
    };

    let usersToGroupActions = {
        1: function(currentGroup) {
            _groupUtils.interactWithUser(function (username) {
                let user = _usersCtrl.getUser(username);
                if (currentGroup.isLeaf && user) {
                    Utils.printDoneMessage(
                        currentGroup.users.add(user));
                }
                else {
                    Utils.printDoneMessage(false);
                }
                menu();
            }, 'assignUserToGroup');
        },
        2: function (currentGroup) {
            _groupUtils.interactWithUser(function (username) {
                Utils.printDoneMessage(currentGroup.users.remove(username));
                menu();
            }, 'removeUserFromGroup');
        }
    };

    function GroupsCtrl(backToMainMenu, usersCtrl) {
        _backToMainMenu = backToMainMenu;
        _groupUtils = new Utils('Group');
        _groups = new Groups();
        _usersCtrl = usersCtrl;

        usersCtrl.on('userDelete', function (username) {
            _groups.removeUserFromAllGroups(username)
        });

        _treeComponent = new TreeComponent({
            addGroup: actions[1],
            removeGroup: actions[2],
            addUser: usersToGroupActions[1],
            removeUser: usersToGroupActions[2],
            backToMainMenu
        });
    }

    // public methods
    GroupsCtrl.prototype = {
        menu
    };

    // private mathods
    function menu() {
        let data = _groups.getList();
        _treeComponent.render(data);
    }

    return GroupsCtrl;
})();


