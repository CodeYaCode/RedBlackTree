// RedBlackTree.js

const RED = 'red';
const BLACK = 'black';

function Node(value, color=RED) {
	this.value = value;
	this.parent = null;
	this.left  = null;
	this.right = null;
	this.color = color;

	this.print = function() {
		if (this.value != null) {
			console.log(this.value);
		}
	}
}

function Tree() {
	this.root = null;

	this.insert = function(node, v) {
		var newNode = new Node(v);
		if (this.root == null) {
			this.root = newNode;
		} else {
			if (node.value > v) {
				if (node.left.value == null) {
					node.left = newNode;
					node.left.parent = node;
				} else {
					this.insert(node.left, v);
				}
			} else if (node.value < v) {
				if (node.right.value == null) {
					node.right = newNode;
					node.right.parent = node;
				} else {
					this.insert(node.right, v);
				}
			} else {
				return ;
			}
		}
		if (newNode.left == null) {
			newNode.left = new Node(null, BLACK);
			newNode.left.parent = newNode;
		}
		if (newNode.right == null) {
			newNode.right = new Node(null, BLACK);
			newNode.right.parent = newNode;
		}
		// 红黑树自平衡
		this.insert_case1(newNode);
	}

	this.insert_case1 = function(newNode) {
		if (newNode.parent == null) {
			// root
			newNode.color = BLACK;
		} else {
			this.insert_case2(newNode);
		}
	}

	this.insert_case2 = function(newNode) {
		if (newNode.parent.color == BLACK) {
			// 父节点是黑色节点
			return ;
		} else {
			this.insert_case3(newNode);
		}
	}

	this.insert_case3 = function(newNode) {

		if (this.uncle(newNode) != null && this.uncle(newNode).color == RED) {
			newNode.parent.color = BLACK;
			this.uncle(newNode).color = BLACK;
			this.grandparent(newNode).color = RED;
			this.insert_case1(this.grandparent(newNode));
		} else {
			this.insert_case4(newNode);
		}
	}

	this.insert_case4 = function(newNode) {
		if (newNode == newNode.parent.right && newNode.parent == this.grandparent(newNode).left) {
			this.leftRotate(newNode);
			newNode = newNode.left;
		} else if (newNode == newNode.parent.left && newNode.parent == this.grandparent(newNode).right) {
			this.rightRotate(newNode);
			newNode = newNode.right;
		}
		this.insert_case5(newNode);
	}

	this.insert_case5 = function(newNode) {
		newNode.parent.color = BLACK;
		this.grandparent(newNode).color = RED;
		if (newNode == newNode.parent.left && newNode.parent == this.grandparent(newNode).left) {
			this.rightRotate(newNode.parent);
		} else {
			this.leftRotate(newNode.parent);
		}
	}

	this.delete = function() {

	}

	this.search = function(node, value) {
		console.log(node);
		if (node.value == value) {
			return node;
		} else if (node.value > value) {
			if (node.left != null) {
				return this.search(node.left, value);
			}
		} else {
			if (node.right != null) {
				return this.search(node.right, value);
			}
		}
	}

	this.grandparent = function(node) {
		if (node.parent != null && node.parent.parent != null) {			
			return node.parent.parent;
		}
		return null;
	}

	this.uncle = function(node) {
		var grandparent = this.grandparent(node);
		if (grandparent != null) {
			if (node.parent == grandparent.left) {
				return grandparent.right;
			} else {
				return grandparent.left;
			}
		}
		return null;
	}

	this.leftRotate = function(node) {
		if (node == this.root) {
			return ;
		}
		var parent = node.parent;
		if (parent.right != node) {
			return ;
		}
		var grandparent = this.grandparent(node);
		parent.right = node.left;
		node.left.parent = parent;
		node.left = parent;
		parent.parent = node;
		if (grandparent != null) {
			if (grandparent.left == parent) {
				grandparent.left = node;
			} else {
				grandparent.right = node;
			}
			node.parent = grandparent;
		} else {
			node.parent = null;
			this.root = node;
		}
	}

	this.rightRotate = function(node) {
		if (node == this.root) {
			return ;
		}
		var parent = node.parent;
		if (parent.left != node) {
			return ;
		}
		var grandparent = this.grandparent(node);
		parent.left = node.right;
		node.right.parent = parent;
		node.right = parent;
		parent.parent = node;
		if (grandparent != null) {
			if (grandparent.left == parent) {
				grandparent.left = node;
			} else {
				grandparent.right = node;
			}
			node.parent = grandparent;
		} else {
			node.parent = null;
			this.root = node;
		}
	}

	this.height = function(node) {
		if (node == null) {
			return 0;
		}
		if (node.left == null && node.right == null) {
			return 1;
		}
		var leftHeight = this.height(node.left);
		var rightHeight = this.height(node.right);
		return leftHeight > rightHeight ? leftHeight + 1 : rightHeight + 1;
	}

	this.preOrder = function(node) {
		node.print();
		if (node.left != null) {
			this.preOrder(node.left);
		}
		if (node.right != null) {
			this.preOrder(node.right);
		}
	}

	this.inOrder = function(node) {
		if (node.left != null) {
			this.inOrder(node.left);
		}
		node.print();
		if (node.right != null) {
			this.inOrder(node.right);
		}
	}

	this.postOrder = function(node) {
		if (node.left != null) {
			this.postOrder(node.left);
		}
		if (node.right != null) {
			this.postOrder(node.right);
		}
		node.print();
	}

	this.BFS = function() {
		var queue = [];
		queue.push(this.root);
		var height = 1;
		while(queue.length != 0) {
			var node = queue.splice(0, 1)[0];
			if (node.left != null) {
				queue.push(node.left);
			}
			if (node.right != null) {
				queue.push(node.right);
			}
		}
	}

	this.print = function() {
		this.root.print();
	}
}
