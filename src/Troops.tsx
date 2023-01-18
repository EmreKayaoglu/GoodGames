export default function getTroops(types: number, total: number) {
  let result = [];
  let subsum = 0;
  for (let i = 0; i < types - 1; i++) {
    let ith = Math.floor(Math.random() * (total - subsum - (types - i))) + 1;
    subsum += ith;
    result[i] = ith;
  }
  result[types - 1] = total - subsum;

  // shift the array to prevent biases
  const shiftCount = Math.floor(Math.random() * (types - 1));
  result = result.slice(shiftCount).concat(result.slice(0, shiftCount));

  return result;
}
