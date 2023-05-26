
export const setLocalStorageItemWithExpiration = (key, value, expirationTime) => {
    localStorage.setItem(key, JSON.stringify({ value, expirationTime: Date.now() + expirationTime }));
  };
  
  export const getLocalStorageItem = (key) => {
    const item = localStorage.getItem(key);
  
    if (item) {
      const { value, expirationTime } = JSON.parse(item);
  
      if (expirationTime && Date.now() > expirationTime) {
        localStorage.removeItem(key);
        return null;
      }
  
      return value;
    }
  
    return null;
  };
  
  export const deleteLocalStorageItem = (key) => {
    localStorage.removeItem(key);
  };
  