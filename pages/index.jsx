import Layout from "../components/layout/Layout";
import MeetupList from "../components/meetups/MeetupList";

// Since 'MongoClient' package is only being used in 'getStaticProps()', the imported package will NOT be part of the client-side bundle. 'Nextjs' will detect that it is only being used on the server in 'getStaticProps()', same goes for 'gerServerSideProps()'
import { MongoClient } from "mongodb";
import Head from "next/head";

// www.our-domain.com

/*
const DUMMY_MEETUPS = [
  {
    id: "m1",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80",
    title: "First Meetup",
    address: "Paris",
  },

  {
    id: "m2",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80",
    title: "Second Meetup",
    address: "LuL",
  },
];
*/

const HomePage = (props) => {
  console.log(props);

  const { meetups } = props;

  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="A list of meetups created using Nextjs"
        />
      </Head>
      <MeetupList meetups={meetups} />
    </>
  );
};

export default HomePage;

// -----------------------------------------------------
// 'Server-Side Rendering'  -- 'SSR'  -> through 'getServerSideProps()' function
// export const getServerSideProps = async (context) => {
//   // const req = context.req;

//   // code in here ONLY gets executed on the server
//   // so we cant access it on the client
//   console.log(context.req);

//   return {
//     props: { meetups: DUMMY_MEETUPS },
//   };
// };

// -----------------------------------------------------
// 'Static-site Generation' -- 'SSG'  -> through 'getStaticProps()' function
// -- Remember --> can only be used in page components, ie: component files inside the 'pages' folder
export const getStaticProps = async (context) => {
  // console.log(context);

  // --------------------
  // Remember --> Code inside 'getStaticProps', 'getServerSideProps' or an 'api-route' will NOT be available on the client-side/browser, so it is safe to add authentication or database access URL here.
  // This is the standard way of doing it.
  /* 
    1. This code will NOT end up in the Client-side bundle.actions
    2. Credentials will not be exposed
    3. Our App bundle will not be bloated
    4. This code will ONLY execute when this page is pre-generated ('getStaticProps()')
  */
  // --------------------

  // connect to database (returns a promise)
  const client = await MongoClient.connect(
    "mongodb+srv://mikelkamel:BaUwmVa400zhRh9R@cluster0.qss2ixr.mongodb.net/?retryWrites=true&w=majority"
  );

  // Get hold of the database to which we are connecting to
  const db = client.db();

  // Get access to our meetups collection (can have any name as an argument)
  const meetupsCollection = db.collection("meetupsDatabase");

  // get and convert the 'collection' fetched from Mongodb
  const meetups = await meetupsCollection.find().toArray();

  const transformedMeetups = meetups.map((meetup) => {
    return {
      id: meetup._id.toString(),
      title: meetup.title,
      image: meetup.image,
      address: meetup.address,
      description: meetup.description,
    };
  });

  // console.log(transformedMeetups);

  client.close();

  return {
    props: { meetups: transformedMeetups }, // will be passed to the page component as props
    revalidate: 10, // 'Incremental Static Regeneration'
  };
};
