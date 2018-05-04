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

        if(isDeepRemove){
            for (let childKey in this.children) {
                this.children[childKey].remove(data, isDeepRemove);
            }
        }
    }

    function search(data, isDeepSearch, parentPath) {
        isDeepSearch = (typeof isDeepSearch === 'undefined') ? true : isDeepSearch;
        const key = getUniqueKey(data);
        const results = {};

        parentPath = (typeof parentPath === 'undefined') ? [key] : parentPath.push(key);

        if (this.children[key]) {
            results[parentPath] = this.children[key];
        }

        if (isDeepSearch) {
            for (let childKey in this.children) {
                Object.assign(results, this.children[childKey].search(data, isDeepSearch, parentPath));
            }
        }

        return results;
    }

    function getList(){
        return this.search('', true, 'root');
    }

    return Node;
};

module.exports = NodeFactory;