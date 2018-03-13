// index.js

const a = 30;
const Dx = 1;
const Dy = 2;
const root_x_default = 450 + a / 2;
const root_y_default = 10;
var root_x = root_x_default - 100;
var root_y = root_y_default;

var tree;

$(document).ready(function() {
	tree = init1();
	// show(tree, tree.root);
	// tree.preOrder(tree.root);
	// tree.inOrder(tree.root);
	// tree.postOrder(tree.root);
	// tree.BFS();
	// tree.leftRotate(tree.root.right.right);
	// tree.rightRotate(tree.root.right);
	show(tree.root, root_x, root_y);
	// var n = tree.search(tree.root, 9);
	// console.log(n);
});

function init0() {
	var tree = new Tree();
	tree.insert(tree.root, 6);
	tree.insert(tree.root, 4);
	tree.insert(tree.root, 7);
	tree.insert(tree.root, 1);
	tree.insert(tree.root, 5);
	tree.insert(tree.root, 8);
	tree.insert(tree.root, 7);
	tree.insert(tree.root, 10);
	tree.insert(tree.root, 2);
	tree.insert(tree.root, 11);
	tree.insert(tree.root, 12);
	tree.insert(tree.root, 9);
	return tree;
}

function init1() {
	var tree = new Tree();
	// var a = [13,1,8,11,6,15,17,22,25,27];
	var a = [1,2,3,4,5,6,7,8,9,10,11,12,13,];
	for (var i in a) {
		tree.insert(tree.root, a[i]);
	}
	return tree;
}

var container = $('.container');

function createNode(x, y, v, color) {
	container.append('<div class="node '+color+'" style="left:'+x+'px;top: '+y+'px;z-index:100;">'+v+'</div>');
}

function createNilNode(x, y) {
	container.append('<div class="leaf black" style="left:'+x+'px;top: '+y+'px;z-index:100;">nil</div>');
}

function createArrow(x0, y0, x1, y1) {
	var width = Math.sqrt((y1-y0)*(y1-y0) + (x1-x0)*(x1-x0));
	var left = (x0 + x1 + a - width) / 2;
	var top  = (y0 + y1 + a) / 2;
	var atan = Math.atan((y1 - y0) / (x1 - x0));
	container.append('<div class="arrow" style="left:'+left+'px;top:'+top+'px;width:'+width+'px;transform:rotate('+atan+'rad);"></div>');
}

function show(node, x0, y0) {
	var x = x0, y = y0;
	if (node.parent != null) {
		if (node == node.parent.left) {
			x = x0 - tree.height(node) * Dx * a;
		} else if (node == node.parent.right) {
			x = x0 + tree.height(node) * Dx * a;
		}
		y = y0 + Dy * a;
	}
	if (node.value == null) {
		createNilNode(x, y);
	} else {
		createNode(x, y, node.value, node.color);
	}
	createArrow(x, y, x0, y0);
	if (node.left != null) {
		show(node.left, x, y);
	}
	if (node.right != null) {
		show(node.right, x, y);
	}
}