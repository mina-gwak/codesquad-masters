/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */

var deleteDuplicates = function(head) {
  let prevNode = head;
  let cur = head ?? null;
  while (cur) {
    if (cur.val === prevNode.val) prevNode.next = cur.next;
    else prevNode = cur;
    cur = cur.next;
  }
  return head;
};