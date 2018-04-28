// dependencies
const readline = require('readline');
const Utils = require('./utils');
const Users = require('./users');
const Groups = require('./groups');

//private properties
const rl = readline.createInterface(process.stdin, process.stdout);
let users, groups, utils, actions;

// init function
(function init() {
    users = new Users(rl);
    groups = new Groups(rl, users);
    utils = new Utils(rl);

    actions = {
        1: users.menu,
        2: groups.menu,
        3: groups.usersToGroupMenu
    };

    menu();
})();

//private methods
function menu() {
    utils.showActions();
    utils.readSelectedCommand(function (selection) {
        actions[selection] ? actions[selection](menu) : process.exit();
    });
}









