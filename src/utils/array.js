// 删除数组中指定的值  let myArray = ['a', 'b', 'c', 'a', 'b', 'c']; pull(myArray, 'a', 'c'); // myArray = [ 'b', 'b' ]
export const pull = (arr, ...args) => {
  const argState = Array.isArray(args[0]) ? args[0] : args
  const pulled = arr.filter((v, i) => !argState.includes(v))
  arr.length = 0
  pulled.forEach(v => arr.push(v))
}

// 提取 pick({ a: 1, b: '2', c: 3 }, ['a', 'c']); // { 'a': 1, 'c': 3 }
export const pick = (obj, arr) => arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {})

// 移除数组中的元素 remove([1, 2, 3, 4], n => n % 2 == 0); // [2, 4]
export const remove = (arr, func) =>
  Array.isArray(arr)
    ? arr.filter(func).reduce((acc, val) => {
      arr.splice(arr.indexOf(val), 1)
      return acc.concat(val)
    }, [])
    : []
