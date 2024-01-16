import { Collection, MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "";
let client = new MongoClient(uri);
const databaseName = process.env.MONGODB_DATABASE_NAME;

export const connect = async (
  collectionName: string
): Promise<Collection | null> => {
  // await client?.connect();

  try {
    const database = client.db(databaseName);
    const collection = database.collection(collectionName);

    if (!collection) {
      throw new Error("failed to connect");
    }

    return collection;
  } catch (err) {
    console.error(err);
    await client?.close();

    return null;
  }
};

export const findOne = async (collectionName: string, query: any) => {
  try {
    return connect(collectionName).then((collection) =>
      collection?.findOne(query)
    );
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const findAll = async (collectionName: string, query: any) => {
  try {
    return connect(collectionName).then((collection) =>
      collection?.find(query).toArray()
    );
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const insertOne = async (collection: string, record: any) => {
  try {
    return connect(collection).then((collection) =>
      collection?.insertOne(record)
    );
  } catch (err) {
    console.error(err);
    return null;
  }
};
