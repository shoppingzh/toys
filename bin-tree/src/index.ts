interface TreeNode {
  left?: TreeNode
  right?: TreeNode
  val: number
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
          val: 12,
        },
        right: {
          val: 13,
        }
      }
    },
    right: {
      val: 7
    }
  }
}

interface Item {
  val: number
  type: 'before' | 'middle' | 'after'
}

const items: Item[] = []

function travelsal(root: TreeNode) {
  if (!root) return
  items.push({ val: root.val, type: 'before' })
  console.log(`--before ${root.val}`)
  travelsal(root.left)
  items.push({ val: root.val, type: 'middle' })
  console.log(`--middle ${root.val}`)
  travelsal(root.right)
  items.push({ val: root.val, type: 'after' })
  console.log(`--after ${root.val}`)
}

travelsal(root)

const doc = document.createDocumentFragment()
const els = items.forEach(o => {
  const el = document.createElement('div')
  el.classList.add('item')
  el.classList.add(o.type)
  el.innerText = `${o.val}`
  doc.appendChild(el)
})

document.body.appendChild(doc)
