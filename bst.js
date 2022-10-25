class Node {
    constructor(value, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

class Tree {
    constructor(array) {
        // First sort array
        array.sort((a, b) => a - b);
        // Remove any dupiclates and build the tree
        let filteredArray = array.filter((val, idx) => {
            return array.indexOf(val) === idx ? true : false;
        });
        this.root = this.buildTree(filteredArray);
        this.depth = 0;
    }

    buildTree(array) {
        if (array.length === 0) {
            return null;
        } else if (array.length === 1) {
            return new Node(array[0]);
        } else {
            const pivot = Math.floor(array.length / 2);
            const root = array[pivot];
            const leftBranch = this.buildTree(array.slice(0, pivot));
            const rightBranch = this.buildTree(array.slice(pivot + 1));

            return new Node(root, leftBranch, rightBranch);
        }
    }

    insert(value, node = this.root) {
        // Traverse tree going left if value is lower than node value or right if it is higher
        // When reaching the end of a branch, add new node with value as a new leaf
        if (node === null) return new Node(value);

        // Repeat recursively until the end of a branch is reached
        if (value < node.value) {
            node.left = this.insert(value, node.left);
        } else if (value > node.value) {
            node.right = this.insert(value, node.right);
        }

        return node;
    }

    delete(value, node = this.root) {
        if (node === null) return;

        // Traverse recursively the tree until a match is found
        if (value < node.value) {
            node.left = this.delete(value, node.left);
        } else if (value > node.value) {
            node.right = this.delete(value, node.right);
        } else {
            // Case 1 or no children
            if (node.right === null) {
                return node.left;
            } else if (node.left === null) {
                return node.right;
            } else {
                // Find successor (next smallest value)
                // Always go left from right subtree until reaching an end)
                let closestMin = node.right;
                while (closestMin.left !== null) closestMin = closestMin.left;

                console.log(closestMin);

                // Replace with successor and delete successor recursively
                node.value = closestMin.value;
                node.right = this.delete(closestMin.value, node.right);
            }
        }

        return node;
    }

    find(value, node = this.root) {
        // If we find the element of reach the end of the tree return the node (null if not found)
        if (node === null || node.value == value) return node;

        // If the value is lower than the node value go left, else go right, and keep going down
        return value < node.value ? this.find(value, node.left) : this.find(value, node.right);
    }

    levelOrder(node = this.root, array = [], queue = []) {
        // If we have reached an end, return the stored array
        if (node === null) return array;

        // Else append current node and add its children to the queue
        array.push(node.value);
        queue.push(node.left);
        queue.push(node.right);

        // Check queue recursively until no element is left
        return queue.length === 0 ? array : this.levelOrder(queue.shift(), array, queue);
    }

    preorder(node = this.root, array = []) {
        if (node === null) return array;

        array.push(node.value);
        this.preorder(node.left, array);
        this.preorder(node.right, array);

        return array;
    }

    inorder(node = this.root, array = []) {
        if (node === null) return array;

        this.inorder(node.left, array);
        array.push(node.value);
        this.inorder(node.right, array);

        return array;
    }

    postorder(node = this.root, array = []) {
        if (node === null) return array;

        this.postorder(node.left, array);
        this.postorder(node.right, array);
        array.push(node.value);

        return array;
    }

    nodeHeight = (node, height = 0) => {
        // Remove one extra edge going from last leaf node to null
        if (node === null) return height;

        // Add one height/edge to previous node
        height += 1;

        // Calculate recursively height of the left and right node
        const heightLeft = this.nodeHeight(node.left, height);
        const heightRight = this.nodeHeight(node.right, height);

        // Return max of both heights
        return Math.max(heightLeft, heightRight);
    };

    nodeDepth = (target, node = this.root, depth = 0) => {
        // If we reach the end of a subtree with no match depth = 0
        if (node === null) return 0;

        // Traverse tree recursively until a match with target is found
        if (target === node) return depth;

        // Increase depth by one and go down in the subtree
        depth += 1;
        const leftDepth = this.nodeDepth(target, node.left, depth);
        const rightDepth = this.nodeDepth(target, node.right, depth);

        return Math.max(leftDepth, rightDepth);
    };

    isBalanced = (node = this.root) => {
        if (node === null) return true;

        const isNodeBalanced =
            Math.abs(this.nodeHeight(node.left) - this.nodeHeight(node.right)) <= 1;

        return isNodeBalanced && this.isBalanced(node.left) && this.isBalanced(node.right);
    };

    rebalance() {
        this.root = this.buildTree(this.inorder());
    }

    prettyPrint(node = this.root, prefix = '', isLeft = true) {
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    }
}

let testArray = [...Array(40)].map((val) => Math.floor(Math.random() * 100));
let bst = new Tree(testArray);
bst.prettyPrint();

console.log('Is it balanced? ' + bst.isBalanced());

console.log('Level Order: ' + bst.levelOrder());
console.log('Preorder: ' + bst.preorder());
console.log('Inorder: ' + bst.inorder());
console.log('Postorder: ' + bst.postorder());

[...Array(10)].map((val) => bst.insert(Math.floor((Math.random() + 0.5) * 100)));
bst.prettyPrint();

console.log('Is it balanced now? ' + bst.isBalanced());
console.log('Rebalancing');
bst.rebalance();

bst.prettyPrint();
console.log('And now, is it balanced? ' + bst.isBalanced());

console.log('Level Order: ' + bst.levelOrder());
console.log('Preorder: ' + bst.preorder());
console.log('Inorder: ' + bst.inorder());
console.log('Postorder: ' + bst.postorder());
