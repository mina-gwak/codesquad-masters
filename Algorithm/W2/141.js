/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */

var hasCycle = function(head) {
  const values = [];
  let cur = head;
  while (cur) {
    if (values.includes(cur)) return true;
    values.push(cur);
    cur = cur.next;
  }
  return false;
};