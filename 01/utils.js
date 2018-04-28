function Utils(rl) {
    this.rl = rl;
}

Utils.prototype = {
    showActions: function () {
        console.log('');
        console.log('=== Available Actions ===');
        console.log('1. Users Management');
        console.log('2. Groups Management');
        console.log('3. User To Group Association');
        console.log('4. Exit');
    },

    showOptions: function (type) {
        console.log('');
        console.log('=== ' + type + ' Management ===');
        console.log('1. Create ' + ((type === 'User') ? 'or Update ' + type : type));
        console.log('2. Delete ' + type);
        console.log('3. List ' + type + 's');
        console.log('4. Back');
    },

    showUsersToGroupOptions: function () {
        console.log('');
        console.log('=== User association Management ===');
        console.log('1. Add user to group');
        console.log('2. Remove user from group');
        console.log('3. List groups and associated users');
        console.log('4. Back');
    },

    readSelectedCommand: function (onSelectionCallback) {
        this.rl.question("Choose the action by number:", function (selectedActionNumber) {
            onSelectionCallback(selectedActionNumber);
        });
    }
};

module.exports = Utils;
