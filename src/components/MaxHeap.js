class MaxHeap {
    constructor() {
      this.heap = [];
    }
  
    add(value) {
      this.heap.push(value);
      this.bubbleUp(this.heap.length - 1);
    }
  
    bubbleUp(index) {
      if (index <= 0) {
        return;
      }
  
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[parentIndex].netBalance < this.heap[index].netBalance) {
        [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
        this.bubbleUp(parentIndex);
      }
    }
  
    extractMax() {
      if (this.heap.length === 0) {
        return null;
      }
  
      const max = this.heap[0];
      const lastElement = this.heap.pop();
  
      if (this.heap.length > 0) {
        this.heap[0] = lastElement;
        this.sinkDown(0);
      }
  
      return max;
    }
  
    sinkDown(index) {
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = 2 * index + 2;
      let largestIndex = index;
  
      if (leftChildIndex < this.heap.length && this.heap[leftChildIndex].netBalance > this.heap[largestIndex].netBalance) {
        largestIndex = leftChildIndex;
      }
  
      if (rightChildIndex < this.heap.length && this.heap[rightChildIndex].netBalance > this.heap[largestIndex].netBalance) {
        largestIndex = rightChildIndex;
      }
  
      if (largestIndex !== index) {
        [this.heap[index], this.heap[largestIndex]] = [this.heap[largestIndex], this.heap[index]];
        this.sinkDown(largestIndex);
      }
    }
  
    size() {
      return this.heap.length;
    }
  
    isEmpty() {
      return this.heap.length === 0;
    }
  
    clear() {
      this.heap = [];
    }
  
    toArray() {
      return [...this.heap];
    }
  }
  
export default MaxHeap

