interface TreeNode {
  val: number
  left?: TreeNode
  right?: TreeNode
}

const root: TreeNode = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 4,
      left: {
        val: 8
      },
      right: {
        val: 9
      }
    },
    right: {
      val: 5
    }
  },
  right: {
    val: 3,
    left: {
      val: 6,
      left: {
        val: 10
      },
      right: {
        val: 11,
        left: {
          val: 12
        },
        right: {
          val: 13
        }
      }
    },
    right: {
      val: 7
    }
  }
}

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
