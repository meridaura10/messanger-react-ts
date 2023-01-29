export const setDataToLoacalSorage = (key: string, data: string) => {
  localStorage.setItem(key, data);
};
export const getDataFromLocalStorage = (key: string) => {
  const data = localStorage.getItem(key);
  if (data) {
    return JSON.parse(data)
  } else {
    return null 
  }
};
