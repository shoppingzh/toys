export interface TreeNode {
  val: number
  left?: TreeNode
  right?: TreeNode
}


export default {
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
} as TreeNode

