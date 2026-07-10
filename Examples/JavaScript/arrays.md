# JavaScript Array Methods

## `push()`

**Purpose:** Adds one or more elements to the end of an array.

**Returns:** The new length of the array.

**Modifies the original array?** ✅ Yes

### Example

```javascript
const numbers = [1, 2, 3];

numbers.push(4);

console.log(numbers); // [1, 2, 3, 4]
```

---

## `pop()`

**Purpose:** Removes the last element from an array.

**Returns:** The removed element.

**Modifies the original array?** ✅ Yes

### Example

```javascript
const numbers = [1, 2, 3];

const last = numbers.pop();

console.log(last);    // 3
console.log(numbers); // [1, 2]
```

---

## `slice()`

**Purpose:** Creates a new array containing a portion of an existing array.

**Returns:** A new array.

**Modifies the original array?** ❌ No

### Syntax

```javascript
array.slice(start, end)
```

- `start` is inclusive.
- `end` is exclusive.

### Example

```javascript
const numbers = [10, 20, 30, 40];

const result = numbers.slice(1, 3);

console.log(result);  // [20, 30]
console.log(numbers); // [10, 20, 30, 40]
```

---

## `sort()`

**Purpose:** Sorts the elements of an array.

**Returns:** The sorted array.

**Modifies the original array?** ✅ Yes

### Ascending

```javascript
const numbers = [5, 2, 8, 1];

numbers.sort((a, b) => a - b);

console.log(numbers); // [1, 2, 5, 8]
```

### Descending

```javascript
const numbers = [5, 2, 8, 1];

numbers.sort((a, b) => b - a);

console.log(numbers); // [8, 5, 2, 1]
```

---

## `values()`

**Purpose:** Returns an iterator containing the array's values.

**Returns:** An Array Iterator.

**Modifies the original array?** ❌ No

### Example

```javascript
const numbers = [10, 20, 30];

const iterator = numbers.values();

for (const value of iterator) {
    console.log(value);
}
```

Output:

```
10
20
30
```

---

## `find()`

**Purpose:** Returns the first element that matches a condition.

**Returns:** The matching element or `undefined`.

**Modifies the original array?** ❌ No

### Example

```javascript
const numbers = [3, 8, 12, 5];

const result = numbers.find(n => n > 10);

console.log(result); // 12
```

---

## `forEach()`

**Purpose:** Executes a function once for each element.

**Returns:** `undefined`

**Modifies the original array?** ❌ No (unless your callback changes it)

### Example

```javascript
const numbers = [1, 2, 3];

numbers.forEach(n => {
    console.log(n);
});
```

Output:

```
1
2
3
```

---

## `reduce()`

**Purpose:** Combines all elements into a single value.

**Returns:** A single value.

**Modifies the original array?** ❌ No

### Example

```javascript
const numbers = [1, 2, 3, 4];

const sum = numbers.reduce((total, current) => total + current);

console.log(sum); // 10
```

### How it works

| Iteration | Accumulator | Current | Result |
|-----------|------------:|--------:|-------:|
| 1 | 1 | 2 | 3 |
| 2 | 3 | 3 | 6 |
| 3 | 6 | 4 | 10 |

---

## `map()`

**Purpose:** Creates a new array by transforming every element.

**Returns:** A new array.

**Modifies the original array?** ❌ No

### Example

```javascript
const numbers = [1, 2, 3];

const doubled = numbers.map(n => n * 2);

console.log(doubled); // [2, 4, 6]
console.log(numbers); // [1, 2, 3]
```

---

## `filter()`

**Purpose:** Creates a new array containing only elements that satisfy a condition.

**Returns:** A new array.

**Modifies the original array?** ❌ No

### Example

```javascript
const numbers = [1, 2, 3, 4, 5];

const evens = numbers.filter(n => n % 2 === 0);

console.log(evens); // [2, 4]
```

---

## `every()`

**Purpose:** Tests whether every element satisfies a condition.

**Returns:** `true` or `false`.

**Modifies the original array?** ❌ No

### Example

```javascript
const numbers = [2, 4, 6];

const allEven = numbers.every(n => n % 2 === 0);

console.log(allEven); // true
```

Another example:

```javascript
const numbers = [2, 4, 5];

const allEven = numbers.every(n => n % 2 === 0);

console.log(allEven); // false
```

---

## `some()`

**Purpose:** Tests whether at least one element satisfies a condition.

**Returns:** `true` or `false`.

**Modifies the original array?** ❌ No

### Example

```javascript
const numbers = [1, 3, 4, 7];

const hasEven = numbers.some(n => n % 2 === 0);

console.log(hasEven); // true
```

Another example:

```javascript
const numbers = [1, 3, 5];

const hasEven = numbers.some(n => n % 2 === 0);

console.log(hasEven); // false
```

---

# Summary

| Method | Purpose | Returns | Modifies Original? |
|---------|---------|---------|--------------------|
| `push()` | Add element(s) to the end | New length | ✅ Yes |
| `pop()` | Remove the last element | Removed element | ✅ Yes |
| `slice()` | Copy part of an array | New array | ❌ No |
| `sort()` | Sort the array | Sorted array | ✅ Yes |
| `values()` | Get an iterator of values | Array Iterator | ❌ No |
| `find()` | Find the first matching element | Element or `undefined` | ❌ No |
| `forEach()` | Execute a function for each element | `undefined` | ❌ No* |
| `reduce()` | Combine elements into one value | Single value | ❌ No |
| `map()` | Transform every element | New array | ❌ No |
| `filter()` | Keep elements matching a condition | New array | ❌ No |
| `every()` | Check if all elements match | `true` / `false` | ❌ No |
| `some()` | Check if any element matches | `true` / `false` | ❌ No |

> **Note:** Although `forEach()` does not modify the array itself, the callback function can modify the array or its elements if you choose to do so.