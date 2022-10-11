import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import { useRouter } from "next/router";
import MeetupDetail from "../../components/meetups/MeetupDetail";

// ----- Dynamic page that will be used for different meetup details -----
// www.our-domain.com/[identifier]

const MeetupDetailPage = (props) => {
  console.log(props);

  const router = useRouter();

  // console.log(router);

  const { meetupId } = router.query;

  // fetch data from database using the meetupId -> then pass it to the '<MeetupDetail/>' component

  return (
    <>
      <Head>
        <title>Meetups | {props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>

      <h1>{meetupId}</h1>

      <MeetupDetail
        imgSrc={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </>
  );
};

export default MeetupDetailPage;

// -----------------------------------------------------
// 'getStaticPaths()'  ->  Have to use when we have dynamic pages ([meetupId]) and are pre-generating pages using 'getStaticProps()', so that 'Nextjs' knows what pages to pre-generate during the build process.
export const getStaticPaths = async () => {
  // Dynamically generating Paths array
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

  // create that paths array with each item id as parameter that will be used in the URL
  const paths = meetups.map((meetup) => {
    return { params: { meetupId: meetup._id.toString() } };
  });

  client.close();

  // console.log("PATHS", paths);

  return {
    paths,
    fallback: "blocking",
  };
};

// -----------------------------------------------------
// 'Static-site Generation' -- 'SSG'  ->
export const getStaticProps = async (context) => {
  // fetch data from database using detailId

  // getting access to the detailId parameter in the URL inorder to fetch and pass its data to '<MeetupDetail/>

  console.log("LUL", context);

  const meetupId = context.params.meetupId;

  // connect to database (returns a promise)
  const client = await MongoClient.connect(
    "mongodb+srv://mikelkamel:BaUwmVa400zhRh9R@cluster0.qss2ixr.mongodb.net/?retryWrites=true&w=majority"
  );

  // Get hold of the database to which we are connecting to
  const db = client.db();

  // Get access to our meetups collection (can have any name as an argument)
  const meetupsCollection = db.collection("meetupsDatabase");

  // get ONE meetup detail from mongodb.
  // 'findOne()' -> finds one single document
  const activeMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  console.log("DATAAAAA 👇", activeMeetup);

  client.close();

  return {
    props: {
      meetupData: {
        id: activeMeetup._id.toString(),
        title: activeMeetup.title,
        image: activeMeetup.image,
        address: activeMeetup.address,
        description: activeMeetup.description,
      },
    },
  };
};
