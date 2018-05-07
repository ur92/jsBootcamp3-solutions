const readline = require('readline');
const Utils = require('./utils');

module.exports = (function () {
    function TreeComponent(actions) {
        readline.emitKeypressEvents(process.stdin);
        /*if(process.stdin.setRawMode) {
            process.stdin.setRawMode(true);
        }*/
        /*this._bindedKeyPress = _keyPress.bind(this);
        process.stdin.on('keypress', this._bindedKeyPress);*/
        this._currentRow = 0;
        this._rows = [];
        this._actions = actions;
        this._treeUtils = new Utils('Tree');
    }

    TreeComponent.prototype = {
        render,
        getCurrentGroup,
        _keyPress,
        _printMenu,
        _printList
    };

    function getTreeRows(treeList) {
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

    function render(treeList) {
        if (treeList) {
            this._rows = getTreeRows(treeList);
        }
        console.clear();
        this._printMenu();
        this._printList();

        Utils.interactWithUser((selection) => {
            this._keyPress(selection);
        });
    }

    function _keyPress(str) {
        let currentGroup = this.getCurrentGroup();
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
                // process.stdin.removeListener('keypress', this._bindedKeyPress);
                this._actions.backToMainMenu();
        }

    }

    function _printMenu() {
        let currentGroup = this.getCurrentGroup();
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

    function getCurrentGroup() {
        return this._rows[this._currentRow].group;
    }

    return TreeComponent;
})();
