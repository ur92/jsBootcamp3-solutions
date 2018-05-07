const NodeFactory = function (getUniqueKey) {
    function Node(data, parent) {
        this._data = data;
        this._children = {};
        this._parent = parent;
    }

    Node.prototype = {
        getParent,
        getData,
        hasChildren,
        add,
        remove,
        search,
        getAll,
        getLeafs,
        _dfsScan,
    };

    function getParent() {
        return this._parent;
    }

    function getData() {
        return this._data;
    }

    function add(data) {
        const key = getUniqueKey(data);

        if (!this._children[key]) {
            return this._children[key] = new Node(data, this);
        }
        return this;
    }

    function remove() {
        const key = getUniqueKey(this._data);

        delete this._parent._children[key];
        delete this._parent;
    }

    function search(data) {
        let condition;
        if (data != null && typeof data === 'object') {
            condition = node => (node._data === data);
        } else {
            condition = node => (getUniqueKey(node._data) === data);
        }
        return this._dfsScan(condition);
    }

    function _dfsScan(aggregationCondition) {
        let results = [];
        aggregationCondition = aggregationCondition || (() => true);

        if (aggregationCondition(this)) {
            results.push(this);
        }

        if (this.hasChildren()) {
            for (let childKey in this._children) {
                results = results.concat(this._children[childKey]._dfsScan(aggregationCondition));
            }
        }
        return results;
    }

    function hasChildren() {
        return Object.keys(this._children).length;
    }

    function getLeafs() {
        return this._dfsScan(node => (!node.hasChildren()));
    }

    function getAll() {
        return this._dfsScan(()=>true);
    }



    function bubble(forEachNodeInPath) {

    }

    return Node;
};

module.exports = NodeFactory;