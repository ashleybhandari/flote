const { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://jamie:aBeSEVyN1FYDYvvm@flotedbcluster.qq2og.mongodb.net/?retryWrites=true&w=majority&appName=flotEdbCluster";
  
const client = new MongoClient(uri);

// function getUser(email: string): User
// function getRegatta(id: number): Regatta
// function getRace(id: number): Race
// function getBoat(id: number): Boat
// function updateUser(email: string, user: User): void 
// function updateRegatta(id: number, regatta: Regatta): void
// function updateRace(id: number, race: Race): void
// function updateBoat(id: number, boat: Boat): void

async function run() {
  try {
    await client.connect();

    async function getUser(userEmail) {
      // database and collection code
      const db = client.db("flotE").collection("users");
        
      // find code
      const cursor = db.find({ email: userEmail});
    
      // see found data
      await cursor.forEach(console.log);
    }
    
    async function createUser(userEmail, userPassword, userName) {
      // database and collection code
      const db = client.db("flotE").collection("users");
        
      // insert data code
      const docs = [{email: userEmail, password: userPassword, name: userName}];
      const result = await db.insertMany(docs);
      
      // see created data
      console.log(result.insertedIds);
    }

    async function updateUser(userEmail, updateArea, updatedData) {
      // database and collection code
      const db = client.db("flotE").collection("users");
        
      // update code
      const filter = {email: userEmail};
      const updateDoc = {$set: { updateArea: updatedData}};
      const result = await db.updateOne(filter, updateDoc);
      
      // see # of updated data
      console.log("Number of documents updated: " + result.modifiedCount);
    }

    async function deleteUser(userEmail) {
      // database and collection code
      const db = client.db("flotE").collection("users");
        
      // update code
      const filter = {email: userEmail};
      const result = await db.deleteOne(filter);
      
      // see # of deleted data
      console.log("Number of documents deleted: " + result.deletedCount);
    }

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);