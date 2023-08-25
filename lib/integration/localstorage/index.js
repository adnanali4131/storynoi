export default class LocalStorage {
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
    const fetchStoreItem = JSON.parse(localStorage.getItem(key));
    if (!fetchStoreItem) return;
    return fetchStoreItem;
  }

  get(key) {
    if (localStorage.getItem(key)) {
      const fetchStoreItem = JSON.parse(localStorage.getItem(key));
      if (!fetchStoreItem) return;
      return fetchStoreItem;
    }
  }
}
