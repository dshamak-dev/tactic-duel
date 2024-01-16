const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;
let client = new MongoClient(uri);
const databaseName = process.env.MONGODB_DATABASE_NAME;

export const connect = async (collectionName: string) => {
  try {
    const database = client.db(databaseName);
    const collection = database.collection(collectionName);

    return collection;
  } catch (err) {
    console.error(err);
    await client?.close();
  }
};

export const findOne = async (collectionName: string, query: any) => {
  try {
    return connect(collectionName).then((collection) =>
      collection.findOne(query)
    );
  } catch (err) {
    console.error(err);
    return null;
  } finally {
    // await client?.close();
  }
};

export const findAll = async (collectionName: string, query: any) => {
  try {
    return connect(collectionName).then((collection) =>
      collection.findAll(query)
    );
  } catch (err) {
    console.error(err);
    return null;
  } finally {
    // await client?.close();
  }
};

export const insertOne = async (collection: string, record: any) => {
  try {
    return connect(collection).then((collection) =>
      collection.insertOne(record)
    );
  } catch (err) {
    console.error(err);
    return null;
  }
};
