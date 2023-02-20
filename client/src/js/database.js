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

// GET function
export const getDb = async (value) => {
  // console.log("Getting data from the jateDB");
  const jateDb = await openDB("jate", 1);
  const tx = jateDb.transaction("jate", "readwrite");
  const objStore = tx.objectStore("jate");
  const req = objStore.getAll();
  const res = await req;
  console.log("data saved to the database", res);
};

// PUT function
export const putDb = async (id, value) => {
  // console.log("PUT request to update the jateDB");
  const jateDb = await openDB("jate", 1);
  const tx = jateDb.transaction("jate", "readwrite");
  const objStore = tx.objectStore("jate");
  const req = objStore.put({ id: id, value: value });
  const res = await req;
  console.log("data saved to the database", res);
};

initdb();
