const NodeFactory = function (getUniqueKey) {
    function Node(data) {
        this.data = data;
        this.children = {};
    }

    Node.prototype = {
        add,
        remove,
        search,
        getList
    };

    function add(data) {
        const key = getUniqueKey(data);

        if (!this.children[key]) {
            this.children[key] = new Node(data);
            return this.children[key];
        }
        else {
            return this;
        }
    }

    function remove(data, isDeepRemove) {
        isDeepRemove = (typeof isDeepRemove === 'undefined') ? true : isDeepRemove;
        const key = getUniqueKey(data);

        if (this.children[key]) {
            delete this.children[key];
        }

        if (isDeepRemove) {
            for (let childKey in this.children) {
                this.children[childKey].remove(data, isDeepRemove);
            }
        }
    }

    function search(data, isDeepSearch, parentPath) {
        isDeepSearch = (typeof isDeepSearch === 'undefined') ? true : isDeepSearch;
        const key = getUniqueKey(data);
        let results = {};

        if (typeof parentPath === 'undefined') {
            parentPath = [key];
            if (getUniqueKey(this.data) === key) { // if the root node is matching the search
                results[parentPath] = this;
            }
        }
        else {
            parentPath.push(key);
        }

        if (this.children[key]) { // search immediate children
            results[parentPath] = this.children[key];
        }

        if (isDeepSearch) { // recursive search
            for (let childKey in this.children) {
                results = Object.assign(results, this.children[childKey].search(data, isDeepSearch, parentPath));
            }
        }

        return results;
    }

    function getList(parentPath) {
        let results = {};
        const key = getUniqueKey(this.data);

        (typeof parentPath === 'undefined') ? parentPath = [key] : parentPath.push(key);

        results[parentPath] = this;
        if (Object.keys(this.children).length) {
            for (let childKey in this.children) {
                results = Object.assign(results, this.children[childKey].getList(parentPath));
            }
        }
        else {
            // return {[parentPath] : this};
        }

        return results;
    }

    return Node;
};

module.exports = NodeFactory;