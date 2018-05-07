const readline = require('readline');
const Utils = require('./utils');

module.exports = (function () {
    function TreeComponent(actions) {
        readline.emitKeypressEvents(process.stdin);
        this._currentRow = 0;
        this._rows = [];
        this._actions = actions;
        this._treeUtils = new Utils('Tree');
    }

    TreeComponent.prototype = {
        render,
        _getCurrentGroup,
        _keyPress,
        _printMenu,
        _printList
    };

    function render(treeList) {
        if (treeList) {
            this._rows = _renderTreeRows(treeList);
        }
        this._printMenu();
        this._printList();

        Utils.interactWithUser((selection) => {
            this._keyPress(selection);
        });
    }

    function _renderTreeRows(treeList) {
        return treeList.map(row => {
            let path = row.path;
            let groupName = path.pop();
            let indentationPrefix = path.reduce((prev) => prev + '│  ', '');
            let indentationGroup = indentationPrefix + '├─ ';
            let indentationUser = indentationPrefix + '│  * ';
            let users = row.group.users.getList().reduce((acc, user)=>{
                return acc + '\n\r'+ indentationUser + user;
            }, '');

            return {
                label: indentationGroup + groupName + ' (' + row.group.usersCount + ')' + users,
                group: row.group
            };
        });
    }

    function _printList() {
        this._rows.forEach((row, index) => {
            if (this._currentRow === index) {
                console.log('\x1b[31m%s\x1b[0m', row.label);
            }
            else {
                console.log(row.label);
            }
        });
    }

    function _keyPress(str) {
        let currentGroup = this._getCurrentGroup();
        switch (str) {
            case '[':
                this._currentRow > 0 ? this._currentRow-- : null;
                this.render();
                break;
            case ']':
                this._currentRow < (this._rows.length - 1) ? this._currentRow++ : null;
                this.render();
                break;
            case 'u':
                this._actions.addGroup(currentGroup);
                break;
            case 'i':
                this._actions.removeGroup(currentGroup);
                break;
            case 'o':
                this._actions.addUser(currentGroup);
                break;
            case 'p':
                this._actions.removeUser(currentGroup);
                break;
            case 'c':
            default:
                this._actions.backToMainMenu();
        }

    }

    function _printMenu() {
        console.clear();

        let currentGroup = this._getCurrentGroup();
        let menuOptions = [];
        menuOptions.push(this._treeUtils.getStringByPath('mainMenu'));
        menuOptions.push(this._treeUtils.getStringByPath('up'));
        menuOptions.push(this._treeUtils.getStringByPath('down'));

        if(_isLeafGroup(currentGroup)){
            menuOptions.push(this._treeUtils.getStringByPath('addUser'));
            menuOptions.push(this._treeUtils.getStringByPath('removeUser'));
        }
        if(!_hasUsers(currentGroup)){
            menuOptions.push(this._treeUtils.getStringByPath('addGroup'));
        }

        menuOptions.push(this._treeUtils.getStringByPath('removeGroup'));
        console.log(menuOptions.join('  '));
        console.log('==================');
    }

    function _isLeafGroup(group) {
        return group.isLeaf;
    }

    function _hasUsers(group) {
        return group.users.count();
    }

    function _getCurrentGroup() {
        return this._rows[this._currentRow].group;
    }

    return TreeComponent;
})();
