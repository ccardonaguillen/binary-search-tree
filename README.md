# Binary Search Trees

Practice exercise about constructing and interacting with a binary search tree (BST)

## Description

The solution includes a Tree class that incorporates the following functions:

-   A `buildTree` function which takes an `array` of data, that is first sorted and filtered of duplicates, and turns it into a balanced binary tree full of `Node` objects appropriately placed.
-   A `prettyPrint()` to visualize the tree (provided in The Odin Project exercise description).
-   An `insert` and `delete` functions which accepts a `value` to insert/delete in the appropriate position in the tree.
-   A `find` function which accepts a `value` and returns the `Node` with the given value.
-   A `levelOrder` function to traverse the tree in breadth-first level order recursively.
-   An `inorder`, `preorder`, and `postorder` functions to traverse the tree in their respective depth-first order recursively.
-   A `nodeHeight` function which accepts a node and returns its height, i.e. the number of edges in longest path from a given node to a leaf node.
-   A `nodeDepth` function which accepts a node and returns its depth, i.e. the number of edges in path from a given node to the tree’s root node.
-   A `isBalanced` function which checks if the tree is balanced, i.e. if the difference between heights of left subtree and right subtree of every node is not more than 1.
-   A `rebalance` function which rebalances an unbalanced tree.

## Test case

Additionally, the code includes one example where the following steps are performed:

1. Create a binary search tree from an array of random numbers (between 1-100)
2. Confirm that the tree is balanced by calling isBalanced
3. Print out all elements in level, pre, post, and in order
4. Unbalance the tree by adding 10 new number (between 50-150)
5. Confirm that the tree is unbalanced by calling isBalanced
6. Balance the tree by calling rebalance
7. Confirm that the tree is balanced by calling isBalanced
8. Print out all elements in level, pre, post, and in order
