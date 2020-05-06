export function getFromStorage(key) {
    if (!key) {
      return null;
    }
    try {
      const valueStr = localStorage.getItem(key);
    //   if (valueStr) {
    //     return JSON.parse(valueStr);
    //   }
      console.log('valueStr', valueStr);
      return valueStr;
    } catch (err) {
      return null;
    }
  }
  export function setInStorage(key, value) {
    if (!key) {
      console.error('Error: Key is missing');
    }
    try {
      localStorage.setItem(key, value);
    } catch (err) {
      console.error(err);
    }
  }