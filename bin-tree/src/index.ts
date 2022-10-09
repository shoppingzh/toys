import root, { TreeNode } from './data'

function iterate(root: TreeNode) {
  const queue: TreeNode[] = [root]
  while (queue.length) {
    const node = queue.shift()
    console.log(node.val)
    for (let child of [node.left, node.right]) {
      child && queue.push(child)
    }
  }
}

// 前序遍历 - 递归
function iterate2(node: TreeNode) {
  if (!node) return
  console.log(node.val)
  iterate2(node.left)
  iterate2(node.right)
}


// 前序遍历 - 非递归
function iterate3(node: TreeNode) {
  
}

iterate2(root)
