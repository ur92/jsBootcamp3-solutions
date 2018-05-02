const readline = require('readline');

module.exports = (function () {
    let rl = readline.createInterface(process.stdin, process.stdout);

    function Utils(type) {
        this.type = type;
    }

    // static properties
    Utils.stringsResource = {
        users: {
            createOrUpdate: 'enter user details with this format: USERNAME,AGE,PASSWORD: ',
            remove: 'enter username to remove: '

        },
        groups:{
            createOrUpdate: 'enter group name to add: ',
            remove: 'enter group name to remove: ',
            assignUserToGroup: 'enter user to add to group like USERNAME,GROUP: ',
            removeUserFromGroup: 'enter user to remove from group like USERNAME,GROUP: '
        },
        general: {
            choose: 'Choose the action by number:'
        }
    };

    // static methods
    Utils.printMainMenu= function () {
        console.log('');
        console.log('=== Available Actions ===');
        console.log('1. Users Management');
        console.log('2. Groups Management');
        console.log('3. User To Group Association');
        console.log('4. Exit');
    };

    Utils.interactWithUser= function (onSelectionCallback, path) {
        let question = '';
        if(arguments.length<2 || !!path){
            question = Utils.stringsResource.general.choose;
        }
        else if(type){
            question = Utils.stringsResource[type][path];
        }

        rl.question(question, function (selectedActionNumber) {
            onSelectionCallback(selectedActionNumber);
        });
    };

    Utils.printUsersToGroupMenu= function () {
        console.log('');
        console.log('=== User association Management ===');
        console.log('1. Add user to group');
        console.log('2. Remove user from group');
        console.log('3. List groups and associated users');
        console.log('4. Back');
    };

    // public methods
    Utils.prototype = {
        printTypeMenu
    };

    // private methods
    function printTypeMenu() {
        console.log('');
        console.log('=== ' + this.type + ' Management ===');
        console.log('1. Create ' + ((this.type === 'User') ? 'or Update ' + this.type : this.type));
        console.log('2. Delete ' + this.type);
        console.log('3. List ' + this.type + 's');
        console.log('4. Back');
    }

    return Utils;
})();



