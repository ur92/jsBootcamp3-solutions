module.exports = (function () {
    function Node(data) {
        this.data = data;
        this.children = {};
    }

    function Tree(getUniqueKey) {
        this.root = null;
        this.getUniqueKey = getUniqueKey;
    }

    Tree.prototype = {
        add,
        remove,
        contains,
        findBFS,
        _preOrder,
        _postOrder,
        traverseBFS,
        traverseDFS,
        print,
        printByLevel
    };

    function add(data, toNodeData) {
        let node = new Node(data);
        let parent = toNodeData ? this.findBFS(toNodeData) : null;
        if (parent) {
            parent.children[this.getUniqueKey(data)] = node;
        } else {
            if (!this.root) {
                this.root = node;
            } else {
                return 'Root node is already assigned';
            }
        }
    }

    function remove(data) {
        if (this.root.data === data) {
            this.root = null;
        }

        let queue = [this.root];
        while (queue.length) {
            let node = queue.shift();
            for (let i = 0; i < Object.keys(node.children).length; i++) {
                if (node.children[i].data === data) {
                    node.children.splice(i, 1);
                } else {
                    queue.push(node.children[i]);
                }
            }
        }
    }

    function contains(data) {
        return !!this.findBFS(data);
    }

    function findBFS(data) {
        let queue = [this.root];
        while (queue.length) {
            let node = queue.shift();
            if (node.data === data) {
                return node;
            }
            for (let i = 0; i < node.children.length; i++) {
                queue.push(node.children[i]);
            }
        }
        return null;
    }

    function _preOrder(node, fn) {
        if (node) {
            if (fn) {
                fn(node);
            }
            for (let i = 0; i < node.children.length; i++) {
                this._preOrder(node.children[i], fn);
            }
        }
    }

    function _postOrder(node, fn) {
        if (node) {
            for (let i = 0; i < node.children.length; i++) {
                this._postOrder(node.children[i], fn);
            }
            if (fn) {
                fn(node);
            }
        }
    }

    function traverseDFS(fn, method) {
        let current = this.root;
        if (method) {
            this['_' + method](current, fn);
        } else {
            this._preOrder(current, fn);
        }
    }

    function traverseBFS(fn) {
        let queue = [this.root];
        while (queue.length) {
            let node = queue.shift();
            if (fn) {
                fn(node);
            }
            for (let i = 0; i < node.children.length; i++) {
                queue.push(node.children[i]);
            }
        }
    }

    function print() {
        if (!this.root) {
            return console.log('No root node found');
        }
        let newline = new Node('|');
        let queue = [this.root, newline];
        let string = '';
        while (queue.length) {
            let node = queue.shift();
            string += node.data.toString() + ' ';
            if (node === newline && queue.length) {
                queue.push(newline);
            }
            for (let i = 0; i < node.children.length; i++) {
                queue.push(node.children[i]);
            }
        }
        console.log(string.slice(0, -2).trim());
    }

    function printByLevel() {
        if (!this.root) {
            return console.log('No root node found');
        }
        let newline = new Node('\n');
        let queue = [this.root, newline];
        let string = '';
        while (queue.length) {
            let node = queue.shift();
            string += node.data.toString() + (node.data !== '\n' ? ' ' : '');
            if (node === newline && queue.length) {
                queue.push(newline);
            }
            for (let i = 0; i < node.children.length; i++) {
                queue.push(node.children[i]);
            }
        }
        console.log(string.trim());
    }

    return Tree;
})();