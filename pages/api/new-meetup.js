import { MongoClient } from "mongodb";

// ---------------- This is an 'API Route' ----------------
// API Routes only run on the server and are not available on the client-side/browser
// route for incoming requests  -->  /api/[API Route file name]  -->  /api/new-meetup
// sending a request to this API Route will trigger the server-side function

// This 'API Route' will be endpoint for creating a new meetup

const handler = async (req, res) => {
  // console.log(req);
  // console.log(res);

  // checking the type of request sent to this 'API Route'
  if (req.method === "POST") {
    // getting the request data through 'body' property in 'req' object
    const data = req.body;

    // console.log(data);

    // store data from http request to a MongoDB Database
    // Sending queries to the MongoDB Cluster
    // 1. 'npm i mongodb'  ->  driver that allows us to connect to the Mongodb cluster and then insert or fetch data from the database.

    // 🛑🚏⛔ NEVER run this 👇 code on the client/browser because we would be exposing our database credentials to the users which is a security problem. 🛑🚏⛔
    // Adding the database credentials here in this api file is fine, because code here will NEVER end up on the client-side. This is a secure place to store credentials.

    // 2. connect to database (returns a promise)
    const client = await MongoClient.connect(
      "mongodb+srv://mikelkamel:BaUwmVa400zhRh9R@cluster0.qss2ixr.mongodb.net/?retryWrites=true&w=majority"
    );

    // console.log(client);

    // 3. Get hold of the database to which we are connecting to
    const db = client.db();

    // 4. Get access to our meetups collection (can have any name as an argument)
    const meetupsCollection = db.collection("meetupsDatabase");

    // 5. 'insertOne()' method inserts one new 'document' into the 'meetupsCollection'.  [A collection contains multiple 'documents'. And a 'document' in MongoDb is just a JavaScript Object]
    // This returns a promise as well
    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    // 6. close the database connection
    client.close();

    // 7. sending back a response using 'res' (simlar to node express)
    // '201' status code means that something was inserted in the database successfully
    res.status(201).json({ message: "Meetup inserted to Database 💃" });
  }
};

export default handler;
