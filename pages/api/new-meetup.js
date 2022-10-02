// This is an 'API Route'
// API Routes only run on the server and are not available on the client-side/browser
// route for incoming requests  -->  /api/[API Route file name]  -->  /api/new-meetup
// sending a request to this API Route will trigger the server-side function

// This 'API Route' will be endpoint for creating a new meetup

const handler = (req, res) => {
  console.log(req);
  console.log(res);

  // checking the type of request sent to this 'API Route'
  if (req.method === "POST") {
    // getting the request data through 'body' property in 'req' object
    const data = req.body;

    console.log(data);

    const { title, image, address, description } = data;

    // store data from http request to a Database
  }
};

export default handler;
