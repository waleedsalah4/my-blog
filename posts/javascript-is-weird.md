---
title: Javascript is weird

excerpt: Javascript is weird Don’t believe me? Try converting an array of strings into integers using map and parseInt.

image: javascript-is-weird.png

isFeatured: true

date: "2023-4-14"
---

# Why ['1', '7', '11'].map(parseInt) returns [1, NaN, 3] in Javascript

![javascript-is-werid](javascript-is-weird.png)

**Javascript is weird.** Don’t believe me? Try converting an array of strings into integers using map and parseInt. Fire up your console (F12 on Chrome), paste in the following, and press enter (or run the pen below).

```js
["1", "7", "11"].map(parseInt);
```

Instead of giving us an array of integers `[1, 7, 11]`, we end up with `[1, NaN, 3]`.
*What?* To find out what on earth is going on, we’ll first have to talk about some Javascript concepts. If you’d like a TLDR, I’ve included a quick summary at the end of this story.

### Truthiness & Falsiness

Here’s a simple if-else statement in Javascript:

```js
if (true) {
  // this always runs
} else {
  // this never runs
}
```

In this case, the condition of the if-else statement is true, so the if-block is always executed and the else-block is ignored. This is a trivial example because true is a boolean. What if we put a non-boolean as the condition?

```js
if ("hello world") {
  // will this run?
  console.log("Condition is truthy");
} else {
  // or this?
  console.log("Condition is falsy");
}
```

Try running this code in your developer’s console (F12 on Chrome). You should find that the if-block runs. This is because the string object `"hello world"` is truthy.

Every Javascript object is either **truthy** or **falsy**. When placed in a boolean context, such as an if-else statement, objects are treated as true or false based on their truthiness. So which objects are truthy and which are falsy? Here’s a simple rule to follow:

All values are truthy except for: `false`, `0`, `""` (empty string), `null`, `undefined`, and `NaN`

Confusingly, this means that the string `false`, the string `0`, an empty object `{}`, and an empty array `[]` are all truthy. You can double check this by passing an object into the Boolean function (e.g. `Boolean("0");`).

For our purposes, it is enough to remember that `0` is falsy.

#### Radix

```js
0 1 2 3 4 5 6 7 8 9 10
```

When we count from zero to nine, we have different symbols for each of the numbers (0–9). However, once we reach ten, we need two different symbols (1 and 0) to represent the number. This is because our decimal counting system has a radix (or base) of ten.

Radix is the smallest number which can only be represented by more than one symbol. **Different counting systems have different radixes, and so, the same digits can refer to different numbers in counting systems.**

| DECIMAL RADIX=10 | BINARY RADIX=2 | HEXADECIMAL RADIX=16 |
| ---------------- | -------------- | -------------------- |
| 0                | 0              | 0                    |
| 1                | 1              | 1                    |
| 2                | 10             | 2                    |
| 3                | **11**         | 3                    |
| 4                | 100            | 4                    |
| 5                | 101            | 5                    |
| 6                | 110            | 6                    |
| 7                | 111            | 7                    |
| 8                | 1000           | 8                    |
| 9                | 1001           | 9                    |
| 10               | 1010           | A                    |
| **11**           | 1011           | B                    |
| 12               | 1100           | C                    |
| 13               | 1101           | D                    |
| 14               | 1110           | E                    |
| 15               | 1111           | F                    |
| 16               | 10000          | 10                   |
| 17               | 10001          | **11**               |

For example, looking at the table above, we see that the same digits 11 can mean different numbers in different counting systems. If the radix is 2, then it refers to the number 3. If the radix is 16, then it refers to the number 17.

# Function argument

Functions in Javascript can be called with any number of arguments, even if they do not equal the number of declared function parameters. Missing arguments are treated as undefined and extra arguments are ignored
(but stored in the array like [arguments object](https://javascriptweblog.wordpress.com/2011/01/18/javascripts-arguments-object-and-beyond/))

```js
function foo(x, y) {
  console.log(x);
  console.log(y);
}
foo(1, 2); // logs 1, 2
foo(1); // logs 1, undefined
foo(1, 2, 3); // logs 1, 2
```

## map()

We’re almost there!

Map is a method in the Array prototype that returns a new array of the results of passing each element of the original array into a function. For example, the following code multiplies each element in the array by 3:

```js
function multiplyBy3(x) {
  return x * 3;
}
const result = [1, 2, 3, 4, 5].map(multiplyBy3);
console.log(result); // logs [3, 6, 9, 12, 15];
```

Now, let’s say I want to log each element using `map()` (with no return statements). I should be able to pass `console.log` as an argument into `map()`… right?

```js
[1, 2, 3, 4, 5].map(console.log);
```

![map-console](log.png)

Something very strange is going on. Instead of logging just the value, each `console.log` call also logged the index and full array.

```js
[1, 2, 3, 4, 5].map(console.log);
// The above is equivalent to
[1, 2, 3, 4, 5].map((val, index, array) => console.log(val, index, array));
// and not equivalent to
[1, 2, 3, 4, 5].map((val) => console.log(val));
```

When a function is passed into `map()`, for each iteration, **three arguments are passed into the function**: `currentValue`, `currentIndex`, and the full `array`. That is why three entries are logged for each iteration.

We now have all the pieces we need to solve this mystery.

# Bringing it together

ParseInt takes two arguments: `string` and `radix`. If the radix provided is falsy, then by default, radix is set to 10.

```js
parseInt('11');                => 11
parseInt('11', 2);             => 3
parseInt('11', 16);            => 17
parseInt('11', undefined);     => 11 (radix is falsy)
parseInt('11', 0);             => 11 (radix is falsy)
```

Now let’s run our example step-by-step.

```js
['1', '7', '11'].map(parseInt);       => [1, NaN, 3]
// First iteration: val = '1', index = 0, array = ['1', '7', '11']
parseInt('1', 0, ['1', '7', '11']);   => 1
```

Since 0 is falsy, the radix is set to the default value 10. `parseInt()` only takes two arguments, so the third argument `['1', '7', '11']` is ignored. The string `'1'` in radix 10 refers to the number 1.

```js
// Second iteration: val = '7', index = 1, array = ['1', '7', '11']
parseInt('7', 1, ['1', '7', '11']);   => NaN
```

In a radix 1 system, the symbol `'7'` does not exist. As with the first iteration, the last argument is ignored. So, `parseInt()` returns `NaN`.

```js
// Third iteration: val = '11', index = 2, array = ['1', '7', '11']
parseInt('11', 2, ['1', '7', '11']);   => 3
```

In a radix 2 (binary) system, the symbol `'11'` refers to the number 3. The last argument is ignored.

# Summary (TLDR)

`['1', '7', '11'].map(parseInt)` doesn’t work as intended because `map` passes three arguments into `parseInt()` on each iteration. The second argument `index` is passed into parseInt as a `radix` parameter. So, each string in the array is parsed using a different radix. `'7'` is parsed as radix 1, which is `NaN`, `'11'` is parsed as radix 2, which is 3. `'1'` is parsed as the default radix 10, because its index 0 is falsy.

And so, the following code will work as intended:

```js
["1", "7", "11"].map((numStr) => parseInt(numStr));
```

---

This article was from Meduim you can find the original article [here](https://medium.com/dailyjs/parseint-mystery-7c4368ef7b21)
