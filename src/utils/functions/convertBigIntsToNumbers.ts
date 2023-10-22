function convertBigIntsToNumbers(obj: any) {
  if (typeof obj === 'object' && obj !== null) {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        obj[key] = convertBigIntsToNumbers(obj[key]);
      }
    }
  } else if (typeof obj === 'bigint') {
    obj = Number(obj);
  }
  return obj;
}

export { convertBigIntsToNumbers }