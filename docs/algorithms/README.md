---
sidebar: auto
---

# 算法与数据结构

## 常用排序算法

### 插入排序

插入排序（Insertion-Sort）的算法描述是一种简单直观的排序算法。它的工作原理是通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。插入排序在实现上，通常采用 in-place 排序（即只需用到O(1)的额外空间的排序），因而在从后向前扫描过程中，需要反复把已排序元素逐步向后挪位，为最新元素提供插入空间。

算法描述如下：

```
从第一个元素开始，该元素可以认为已经被排序；
取出下一个元素，在已经排序的元素序列中从后向前扫描；
如果该元素（已排序）大于新元素，将该元素移到下一位置；
重复步骤3，直到找到已排序的元素小于或者等于新元素的位置；
将新元素插入到该位置后；
重复步骤2~5。
```

JavaScript 代码实现：

```javascript
function insertionSort(array) {
  if (Object.prototype.toString.call(array).slice(8, -1) === 'Array') {
    const array = [...originalArray];
    const len = array.length;

    // Go through all array elements...
    for (let i = 0; i < len; i += 1) {
      let currentIndex = i;

      // Go and check if previous elements and greater then current one.
      // If this is the case then swap that elements.
      while (
        currentIndex >= 1
        && array[currentIndex - 1] !== undefined
        && array[currentIndex] < array[currentIndex - 1]
      ) {
        // Swap the elements.
        const tmp = array[currentIndex - 1];
        array[currentIndex - 1] = array[currentIndex];
        array[currentIndex] = tmp;

        // Shift current index left.
        currentIndex -= 1;
      }
    }

    return array;
  } else {
    return 'array is not an Array!';
  }
}
```

算法分析：

```
最佳情况：输入数组按升序排列。T(n) = O(n)
最坏情况：输入数组按降序排列。T(n) = O(n2)
平均情况：T(n) = O(n2)
```

### 选择排序

选择排序(Selection-sort)是一种简单直观的排序算法。它的工作原理：首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置，然后，再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。以此类推，直到所有元素均排序完毕。

算法描述如下：

```
初始状态：无序区为R[1..n]，有序区为空；
第i趟排序(i=1,2,3…n-1)开始时，当前有序区和无序区分别为R[1..i-1]和R(i..n）。该趟排序从当前无序区中选出关键字最小的记录 R[k]，将它与无序区的第1个记录R交换，使R[1..i]和R[i+1..n)分别变为记录个数增加1个的新有序区和记录个数减少1个的新无序区；
n-1趟结束，数组有序化了。
```

JavaScript 代码实现：

```javascript
function selectionSort(originalArray) {
  if (Object.prototype.toString.call(array).slice(8, -1) === 'Array') {
    // Clone original array to prevent its modification.
    const array = [...originalArray];
    const len = array.length;

    for (let i = 0; i < len - 1; i += 1) {
      let minIndex = i;

      // Find minimum element in the rest of array.
      for (let j = i + 1; j < len; j += 1) {
        if (array[j] < array[minIndex]) {
          minIndex = j;
        }
      }

      // If new minimum element has been found then swap it with current i-th element.
      if (minIndex !== i) {
        const tmp = array[i];
        array[i] = array[minIndex];
        array[minIndex] = tmp;
      }
    }

    return array;
  } else {
    return 'array is not an Array!';
  }
}
```

算法分析：

```
最佳情况：T(n) = O(n2)
最差情况：T(n) = O(n2)
平均情况：T(n) = O(n2)
```

### 冒泡排序

冒泡排序是一种简单的排序算法。它重复地走访过要排序的数列，一次比较两个元素，如果它们的顺序错误就把它们交换过来。走访数列的工作是重复地进行直到没有再需要交换，也就是说该数列已经排序完成。这个算法的名字由来是因为越小的元素会经由交换慢慢“浮”到数列的顶端。

算法描述如下：

```
比较相邻的元素。如果第一个比第二个大，就交换它们两个；
对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对，这样在最后的元素应该会是最大的数；
针对所有的元素重复以上的步骤，除了最后一个；
重复步骤1~3，直到排序完成。
```

JavaScript 代码实现：

```javascript
function bubbleSort(originalArray){
  // Flag that holds info about whether the swap has occur or not.
  let swapped = false;
  // Clone original array to prevent its modification.
  const array = [...originalArray];
  const len = array.length;

  for (let i = 1; i < len; i += 1) {
    swapped = false;

    for (let j = 0; j < len - i; j += 1) {
      // Swap elements if they are in wrong order.
      if (array[j + 1] < array[j]) {
        const tmp = array[j + 1];
        array[j + 1] = array[j];
        array[j] = tmp;

        // Register the swap.
        swapped = true;
      }
    }

    // If there were no swaps then array is already sorted and there is
    // no need to proceed.
    if (!swapped) {
      return array;
    }
  }

  return array;
}
```

算法分析：

```
最佳情况：T(n) = O(n)
最差情况：T(n) = O(n2)
平均情况：T(n) = O(n2)
```

### 快速排序

快速排序的基本思想：通过一趟排序将待排记录分隔成独立的两部分，其中一部分记录的关键字均比另一部分的关键字小，则可分别对这两部分记录继续进行排序，以达到整个序列有序。

算法描述如下：

```
从数列中挑出一个元素，称为 "基准"（pivot）；
重新排序数列，所有元素比基准值小的摆放在基准前面，所有元素比基准值大的摆在基准的后面（相同的数可以到任一边）。在这个分区退出之后，该基准就处于数列的中间位置。这个称为分区（partition）操作；
递归地（recursive）把小于基准值元素的子数列和大于基准值元素的子数列排序。
```

JavaScript 代码实现：

```javascript
function quickSort(originalArray) {
  // Clone original array to prevent it from modification.
  const array = [...originalArray];

  // If array has less than or equal to one elements then it is already sorted.
  if (array.length <= 1) {
    return array;
  }

  // Init left and right arrays.
  const leftArray = [];
  const rightArray = [];

  // Take the first element of array as a pivot.
  const pivotElement = array.shift();
  const centerArray = [pivotElement];

  // Split all array elements between left, center and right arrays.
  while (array.length) {
    const currentElement = array.shift();

    if (currentElement < pivotElement) {
      leftArray.push(currentElement);
    } else {
      rightArray.push(currentElement);
    }
  }

  // Let's now join sorted left array with center array and with sorted right array.
  return quickSort(leftArray).concat(centerArray, quickSort(rightArray));
}
```

算法分析：

```
最佳情况：T(n) = O(nlog(n))
最差情况：T(n) = O(n2)
平均情况：T(n) = O(nlog(n))
```

### 堆排序

堆排序（Heapsort）是指利用堆这种数据结构所设计的一种排序算法。堆积是一个近似完全二叉树的结构，并同时满足堆积的性质：即子结点的键值或索引总是小于（或者大于）它的父节点。

算法描述如下：

```
将初始待排序关键字序列(R1,R2....Rn)构建成大顶堆，此堆为初始的无序区；
将堆顶元素R[1]与最后一个元素R[n]交换，此时得到新的无序区(R1,R2,......Rn-1)和新的有序区(Rn),且满足R[1,2...n-1]<=R[n]；
由于交换后新的堆顶R[1]可能违反堆的性质，因此需要对当前无序区(R1,R2,......Rn-1)调整为新堆，然后再次将R[1]与无序区最后一个元素交换，得到新的无序区(R1,R2....Rn-2)和新的有序区(Rn-1,Rn)。不断重复此过程直到有序区的元素个数为n-1，则整个排序过程完成。
```

JavaScript 代码实现：

```javascript
function heapify(arr, x, len) {
  if (Object.prototype.toString.call(arr).slice(8, -1) === 'Array' && typeof x === 'number') {
    var l = 2 * x, r = 2 * x + 1, largest = x, temp;
    if (l < len && arr[l] > arr[largest]) {
      largest = l;
    }
    if (r < len && arr[r] > arr[largest]) {
      largest = r;
    }
    if (largest != x) {
      temp = arr[x];
      arr[x] = arr[largest];
      arr[largest] = temp;
      heapify(arr, largest, len);
    }
  } else {
    return 'arr is not an Array or x is not a number!';
  }
}

function heapSort(originalArray) {
  if (Object.prototype.toString.call(array).slice(8, -1) === 'Array') {
    //建堆
    var heapSize = array.length, temp;
    for (var i = Math.floor(heapSize / 2); i >= 0; i--) {
      heapify(array, i, heapSize);
    }

    //堆排序
    for (var j = heapSize - 1; j >= 1; j--) {
      temp = array[0];
      array[0] = array[j];
      array[j] = temp;
      heapify(array, 0, --heapSize);
    }
  } else {
    return 'array is not an Array!';
  }
}
```

算法分析：

```
最佳情况：T(n) = O(nlogn)
最差情况：T(n) = O(nlogn)
平均情况：T(n) = O(nlogn)
```

### 归并排序

归并排序是建立在归并操作上的一种有效的排序算法。该算法是采用分治法（Divide and Conquer）的一个非常典型的应用。归并排序是一种稳定的排序方法。将已有序的子序列合并，得到完全有序的序列；即先使每个子序列有序，再使子序列段间有序。若将两个有序表合并成一个有序表，称为2-路归并。

算法描述如下：

```
把长度为n的输入序列分成两个长度为n/2的子序列；
对这两个子序列分别采用归并排序；
将两个排序好的子序列合并成一个最终的排序序列。
```

JavaScript 代码实现：

```javascript
let mergeSort = (arr) => {

  if (arr.length < 2) return arr;

  let middle = parseInt(arr.length / 2),
  left = arr.slice(0, middle),
  right = arr.slice(middle);

  return merge(mergeSort(left), mergeSort(right));
}

let merge = (left, right) => {
  let result = [];

  while (left.length && right.length) {
    left[0] <= right[0] ?
    result.push(left.shift()) :
    result.push(right.shift());
  }

  while (left.length) result.push(left.shift());
  while (right.length) result.push(right.shift());

  return result;
}
```

算法分析：

```
最佳情况：T(n) = O(n)
最差情况：T(n) = O(nlogn)
平均情况：T(n) = O(nlogn)
```

## Fibonacci 斐波那契数列求和

### 缓存方案

```javascript
var fibonacci = (function () {
  var memory = {}
  return function(n) {
    if(n === 0 || n == 1) {
      return n
    }
    if(memory[n-2] === undefined) {
      memory[n-2] = fibonacci(n-2)
    }
    if(memory[n-1] === undefined) {
      memory[n-1] = fibonacci(n-1)
    }
    return memory[n] = memory[n-1] + memory[n-2]
  }
})()
```

### 动态规划解决方案

动态规划方案通常会使用一个数组来建立一张表，用于存放被分解成众多子问题的解。当算法执行完 毕，最终的解将会在这个表中很明显的地方被找到

```javascript
/**
 * Calculate fibonacci number at specific position using Dynamic Programming approach.
 *
 * @param n
 * @return {number}
 */
function fibonacciNth(n) {
  let currentValue = 1;
  let previousValue = 0;

  if (n === 1) {
    return 1;
  }

  let iterationsCounter = n - 1;

  while (iterationsCounter) {
    // 类比 val[i] = val[i-1] + val[i-2];
    currentValue += previousValue;
    previousValue = currentValue - previousValue;

    iterationsCounter -= 1;
  }

  return currentValue;
}
```

### 尾递归方案

尾调用由于是函数的最后一步操作，所以不需要保留外层函数的调用帧，因为调用位置、内部变量等信息都不会再用到了，只要直接用内层函数的调用帧，取代外层函数的调用帧就可以了。这就叫做 `尾调用优化（Tail call optimization）`，即只保留内层函数的调用帧。如果所有函数都是尾调用，那么完全可以做到每次执行时，调用帧只有一项，这将大大节省内存。这就是“尾调用优化”的意义。

```javascript
function Fibonacci (n , ac1 = 1 , ac2 = 1) {
  if( n <= 1 ) {return ac2};

  return Fibonacci (n - 1, ac2, ac1 + ac2);
}
```

### 通项公式方案

```javascript
function fibonacci(n){
  var sum = 0
  for(let i = 1; i <= n; i += 1) {
      sum += fib(i)
  }
  return sum

  function fib(n) {
    const SQRT_FIVE = Math.sqrt(5);
    return Math.round(1/SQRT_FIVE * (Math.pow(0.5 + SQRT_FIVE/2, n) - Math.pow(0.5 - SQRT_FIVE/2, n)));
  }
}
```


## 参考资料

- [javascript-algorithms](https://github.com/trekhleb/javascript-algorithms)
