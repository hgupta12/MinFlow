class MinHeap {
    constructor() {
      this.heap = [];
    }
  
    add(obj) {
      this.heap.push(obj);
      this.bubbleUp(this.heap.length - 1);
    }
  
    bubbleUp(index) {
      if (index <= 0) {
        return;
      }
  
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[parentIndex].netBalance > this.heap[index].netBalance) {
        [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
        this.bubbleUp(parentIndex);
      }
    }
  
    extractMin() {
      if (this.heap.length === 0) {
        return null;
      }
  
      const min = this.heap[0];
      const lastElement = this.heap.pop();
  
      if (this.heap.length > 0) {
        this.heap[0] = lastElement;
        this.sinkDown(0);
      }
  
      return min;
    }
  
    sinkDown(index) {
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = 2 * index + 2;
      let smallestIndex = index;
  
      if (
        leftChildIndex < this.heap.length &&
        this.heap[leftChildIndex].netBalance < this.heap[smallestIndex].netBalance
      ) {
        smallestIndex = leftChildIndex;
      }
  
      if (
        rightChildIndex < this.heap.length &&
        this.heap[rightChildIndex].netBalance < this.heap[smallestIndex].netBalance
      ) {
        smallestIndex = rightChildIndex;
      }
  
      if (smallestIndex !== index) {
        [this.heap[index], this.heap[smallestIndex]] = [this.heap[smallestIndex], this.heap[index]];
        this.sinkDown(smallestIndex);
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
  
  export default MinHeap;
  