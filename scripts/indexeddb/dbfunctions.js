/* eslint-disable linebreak-style */
export const DB_NAME = "dice_poker";
export const PLAYERS_TABLE = "players";
export const SETTINGS_TABLE = "settings";
export const PLAYS_TABLE = "plays";
export const KEY_FIELD = "playerName";

export function checkCapability() {
  if (!window.indexedDB) {
    return false;
  }
  return true;
}

export function connectDB(dbDefinition) {
  return new Promise(() => {
    dbDefinition.connection = null;
    let openRequest = indexedDB.open(dbDefinition.name, dbDefinition.version);
    openRequest.onupgradeneeded = function upgrade(event) {
      dbDefinition.connection = event.target.result;
      if (!dbDefinition.connection.objectStoreNames.contains(PLAYERS_TABLE)) {
        dbDefinition.connection.createObjectStore(PLAYERS_TABLE, { keyPath: KEY_FIELD });
      }
      if (!dbDefinition.connection.objectStoreNames.contains(SETTINGS_TABLE)) {
        dbDefinition.connection.createObjectStore(SETTINGS_TABLE, { keyPath: KEY_FIELD });
      }
      if (!dbDefinition.connection.objectStoreNames.contains(PLAYS_TABLE)) {
        dbDefinition.connection.createObjectStore(PLAYS_TABLE, { keyPath: KEY_FIELD });
      }
    };

    openRequest.onsuccess = function connect(event) {
      dbDefinition.connection = event.target.result;
    };

    openRequest.onerror = function error(event) {
      dbDefinition.connection = event.target.error;
    };
  });
}

export function saveData(dbDefinition, table, data) {
  return new Promise(() => {
    let openRequest = indexedDB.open(dbDefinition.name);
    openRequest.onsuccess = function connect() {
      let database = openRequest.result;
      let curTransaction = database.transaction(table.name, "readwrite");
      let store = curTransaction.objectStore(table.name);
      store.put(data);
    };

    openRequest.onerror = function error(event) {
      let reqerror = event.target.error;
      return reqerror;
    };
  });
}

export function loadData(dbDefinition, table, key) {
  return new Promise((resolve, reject) => {
    let openRequest = indexedDB.open(dbDefinition.name);
    openRequest.onsuccess = function connect() {
      let database = openRequest.result;
      let curTransaction = database.transaction(table.name, "readonly");
      let store = curTransaction.objectStore(table.name);
      let getRequest = store.get(key);
      getRequest.onsuccess = function success(event) {
        resolve(event.target.result);
      };

      getRequest.onabort = function abort() {
        reject(new Error("Ошибка чтения"));
      };
    };

    openRequest.onerror = function error(event) {
      let reqerror = event.target.error;
      return reqerror;
    };
  });
}
