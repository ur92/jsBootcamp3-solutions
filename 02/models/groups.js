const Users = require('./users');
const Node = require('./node')(group => group.groupName);

module.exports = (function () {
    function Group(groupName) {
        this.groupName = groupName;
        this.users = new Users();
    }

    function Groups() {
        this._rootGroup = new Node(new Group('root'));

        mock(this._rootGroup);
    }

    // public methods
    Groups.prototype = {
        addGroup,
        removeGroup,
        getList,
        removeUserFromAllGroups
    };

    // private mathods
    function mock(rootNode) {
        let one = new Group('one');
        let two = new Group('two');
        let oneOne = new Group('one-one');
        oneOne.users.addOrUpdate('sdf', 444, 'fsdfds');
        oneOne.users.addOrUpdate('sdf1', 444, 'fsdfds');
        oneOne.users.addOrUpdate('sdf2', 444, 'fsdfds');
        oneOne.users.addOrUpdate('sdf3', 444, 'fsdfds');

        let twoOne = new Group('two-one');
        twoOne.users.addOrUpdate('sdf', 444, 'fsdfds');
        twoOne.users.addOrUpdate('sdf1', 444, 'fsdfds');
        twoOne.users.addOrUpdate('sdf2', 444, 'fsdfds');

        let twoTwo = new Group('two-two');
        twoTwo.users.addOrUpdate('sdf1', 444, 'fsdfds');
        twoTwo.users.addOrUpdate('sdf2', 444, 'fsdfds');


        let oneNode = rootNode.add(one);
        let twoNode = rootNode.add(two);
        oneNode.add(oneOne);
        twoNode.add(twoOne);
        twoNode.add(twoTwo);
    }

    function addGroup(parentGroup, groupName) {
        let parent = this._rootGroup.search(parentGroup).pop();
        if (parent && parent.getData().users.count() === 0) {
            parent.add(new Group(groupName));
            return true;
        }
        return false;
    }

    function removeGroup(group) {
        let node = this._rootGroup.search(group).pop();
        if (node) {
            node.remove();
            return true;
        } else {
            return false;
        }
    }

    function search(groupName) {
        return this._rootGroup.search(groupName);
    }

    function resetUsersCount(leafs) {
        for (let leaf of leafs) {
            let node = leaf;
            leaf.getData().isLeaf = true;
            while (node) {
                node.getData().usersCount = 0;
                node = node.getParent();
            }
        }
    }

    function bubbleUsersCount(leafs) {
        for (let leaf of leafs) {
            let users = 0;
            let node = leaf;
            while (node) {
                users += node.getData().users.count();
                node.getData().usersCount += users;
                node = node.getParent();
            }
        }
    }

    function getList(nodes) {
        let leafs = this._rootGroup.getLeafs();
        resetUsersCount(leafs);
        bubbleUsersCount(leafs);

        nodes = nodes || this._rootGroup.getAll();
        return nodes.map(node => {
            let path = [node.getData().groupName];
            let parentNode = node.getParent();
            while (parentNode) {
                path.unshift(parentNode.getData().groupName);
                parentNode = parentNode.getParent();
            }
            return {path, group: node.getData()};
        });
    }

    function removeUserFromAllGroups(username) {
        let res = true;
        this._rootGroup.getLeafs().forEach(leaf=>{
            res = res && removeUserFromGroup(leaf.getData(), username);
        });
        return res;
    }

    return Groups;
})();


