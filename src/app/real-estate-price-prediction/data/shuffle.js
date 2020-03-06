/**
 * Shuffles data and target (maintaining alignment) using Fisher-Yates
 * algorithm.flab
 */
export default (data, target) => {
  let counter = data.length
  let temp = 0
  let index = 0
  while (counter > 0) {
    index = (Math.random() * counter) | 0
    counter--
    // data:
    temp = data[counter]
    data[counter] = data[index]
    data[index] = temp
    // target:
    temp = target[counter]
    target[counter] = target[index]
    target[index] = temp
  }
}
