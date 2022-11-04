/**
 *
 * @param arr An array of objects
 * @param key The key according to which you want to sort the array
 * @returns A new array sorted by key in descending order
 */
export const sortByKey = (arr: any, key: any): any[] => {
  return arr.sort(function (a: any, b: any) {
    const x = a[key];
    const y = b[key];
    return x > y ? -1 : x < y ? 1 : 0;
  });
};
