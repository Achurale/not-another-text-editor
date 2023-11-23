import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try{
    if (content===null) {
      console.log('There is nothing to be saved')
    } else {
      console.log('Saving now: ', content);
      const jateDB = await openDB('jate', 1)
      const tx = jateDB.transaction('jate', 'readwrite')
      const store = tx.objectStore('jate')
      const request = store.put({Value: content})
      const result = await request
      console.log(`${result} saved to database!`)
    }
  } catch {
    console.error(error)
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    console.log('Grabbing from database');
    console.log('. . .')
    const jateDb = await openDB('jate', 1);
    const tx = jateDb.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const request = store.getAll();
    const result = await request;

    if(result.length === 0){
      console.log("No data has been found");
    } else{
    console.log('Retrieved Data', result);
    return result
    }

    return result;
  } catch (error) {
    console.log(error)
    throw error
  }
}

initdb();
