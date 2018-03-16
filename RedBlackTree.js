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
			this.leftRotate(newNode.parent);
			newNode = newNode.left;
		} else if (newNode == newNode.parent.left && newNode.parent == this.grandparent(newNode).right) {
			this.rightRotate(newNode.parent);
			newNode = newNode.right;
		}
		this.insert_case5(newNode);
	}
	var i = 0;
	this.insert_case5 = function(newNode) {
		newNode.parent.color = BLACK;
		this.grandparent(newNode).color = RED;
		if (newNode == newNode.parent.left && newNode.parent == this.grandparent(newNode).left) {
			this.rightRotate(newNode.parent.parent);
		} else {
			this.leftRotate(newNode.parent.parent);
		}
	}

	this.delete = function(node) {
		var replace = node;
		if (!this.isLeaf(node.left) && !this.isLeaf(node.right)) {
			replace = replace.left;
			while (null != replace.right.value) {
				// 删除节点左子树最大的节点
				replace = replace.right;
			}
			node.value = replace.value;
		}
		this.delete_case1(replace);
	}

	this.delete_case1 = function(node) {
		if (node.color == RED) {
			// 红色节点，说明该节点的两个子节点都是叶子节点
			// if (node == node.parent.left) {
			// 	node.parent.left = node.left;
			// 	node.left.parent = node.parent;
			// } else {
			// 	node.parent.right = node.left;
			// 	node.left.parent = node.parent;
			// }
			this.swap(node, node.left);
			node.right = null;
		} else {
			this.delete_case2(node);
		}
	}

	this.delete_case2 = function(node) {
		var child = this.isLeaf(node.left) ? node.right : node.left;
		this.swap(node, child);
		if (node.color == BLACK) {
			if (child.color == RED) {
				child.color = BLACK;
			} else {
				this.delete_case3(child);
			}
		}
	}

	this.delete_case3 = function(node) {
		// 这种情况下，node有两个叶子节点
		if (null != node.parent) {
			this.delete_case4(node);
		}
	}

	this.delete_case4 = function(node) {
		var sibling = this.sibling(node);
		if (sibling.color == RED) {
			node.parent.color = RED;
			sibling.color = BLACK;
			if (node == node.parent.left) {
				this.leftRotate(node.parent.parent);
			} else {
				this.rightRotate(node.parent.parent);
			}
		} else {
			this.delete_case5(node);
		}
	}

	this.delete_case5 = function(node) {
		var sibling = this.sibling(node);
		if (node.parent.color == BLACK
			&& sibling.color == BLACK
			&& sibling.left.color == BLACK
			&& sibling.right.color == BLACK) {
			sibling.color = RED;
			this.delete_case3(node.parent);
		} else {
			this.delete_case6(node);
		}
	}

	this.delete_case6 = function(node) {
		var sibling = this.sibling(node);
		if (node.parent.color == RED
			&& sibling.color == BLACK
			&& sibling.left.color == BLACK
			&& sibling.right.color == BLACK) {
			sibling.color = RED;
			node.parent.color = BLACK;
		} else {
			this.delete_case7(node);
		}
	}

	this.delete_case7 = function(node) {
		var sibling = this.sibling(node);
		if (sibling.color == BLACK) {
			if (node == node.parent.left
				&& sibling.right.color == BLACK
				&& sibling.left.color == RED) {
				sibling.color = RED;
				sibling.left.color = BLACK;
				this.rightRotate(sibling.parent);
			} else if (node == node.parent.right
				&& sibling.left.color == BLACK
				&& sibling.right.color == RED) {
				sibling.color = RED;
				sibling.right.color = BLACK;
				this.leftRotate(sibling.parent);
			}
		}
		this.delete_case8(node);
	}

	this.delete_case8 = function(node) {
		var sibling = this.sibling(node);
		sibling.color = node.parent.color;
		node.parent.color = BLACK;
		if (node == node.parent.left) {
			sibling.right.color = BLACK;
			this.leftRotate(node.parent);
		} else {
			sibling.left.color = BLACK;
			this.rightRotate(node.parent);
		}
	}

	this.swap = function(n1, n2) {
		if (n1 == n1.parent.left) {
			n1.parent.left = n2;
			n2.parent = n1.parent;
		} else {
			n1.parent.right = n2;
			n2.parent = n1.parent;
		}
	}

	this.search = function(node, value) {
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

	this.sibling = function(n) {
		if (n == n.parent.left) {
			return n.parent.right;
		} else {
			return n.parent.left;
		}
	}

	this.leftRotate = function(node) {
		var rChild = node.right;
		if (rChild.value == null) {
			return ;
		}
		var parent = node.parent;
		node.right = rChild.left;
		rChild.left.parent = node;
		rChild.left = node;
		node.parent = rChild;
		if (parent != null) {
			if (parent.left == node) {
				parent.left = rChild;
			} else {
				parent.right = rChild;
			}
			rChild.parent = parent;
		} else {
			rChild.parent = null;
			this.root = rChild;
		}
	}

	this.rightRotate = function(node) {
		var lChild = node.left;
		if (lChild.value == null) {
			return ;
		}
		var parent = node.parent;
		node.left = lChild.right;
		lChild.right.parent = node;
		lChild.right = node;
		node.parent = lChild;
		console.log("------");
		console.log(parent, node, lChild);
		if (parent != null) {
			if (parent.left == node) {
				parent.left = lChild;
			} else {
				parent.right = lChild;
			}
			lChild.parent = parent;
		} else {
			lChild.parent = null;
			this.root = lChild;
		}
		console.log("------");
		this.print(this.root);
	}

	this.isLeaf = function(n) {
		return n.value == null;
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
		if (node.left.value != null) {
			this.preOrder(node.left);
		}
		if (node.right.value != null) {
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

	this.print = function(node) {
		if (null == node) {
			return ;
		}
		node.print();
		this.print(node.left);
		this.print(node.right);
	}
}
