import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database

// GET function for the data to be seen on screen
export const getDb = async (value) => {

  const jateDb = await openDB("jate", 1);
  const tx = jateDb.transaction("jate", "readwrite");
  const objStore = tx.objectStore("jate");
  const req = objStore.getAll();
  const res = await req;
  console.log("data saved to the database", res);
};

// PUT function so when you update/add text it will be added to the DB for the next time you load the application
export const putDb = async (id, value) => {

  const jateDb = await openDB("jate", 1);
  const tx = jateDb.transaction("jate", "readwrite");
  const objStore = tx.objectStore("jate");
  const req = objStore.put({ id: id, value: value });
  const res = await req;
  console.log("data saved to the database", res);
};

initdb();
