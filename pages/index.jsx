import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import MeetupList from "../components/meetups/MeetupList";

// www.our-domain.com

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

const HomePage = (props) => {
  console.log(props);

  const { meetups } = props;

  return <MeetupList meetups={meetups} />;
};

export default HomePage;

// -----------------------------------------------------
// 'Server-Side Rendering'  -- 'SSR'  -> through 'getServerSideProps()' function
export const getServerSideProps = async (context) => {
  // const req = context.req;

  // code in here ONLY gets executed on the server
  // so we cant access it on the client
  console.log(context.req);

  return {
    props: { meetups: DUMMY_MEETUPS },
  };
};

// -----------------------------------------------------
// 'Static-site Generation' -- 'SSG'  -> through 'getStaticProps()' function
// -- Remember --> can only be used in page components, ie: component files inside the 'pages' folder
// export const getStaticProps = async (context) => {
//   console.log(context);

//   return {
//     props: { meetups: DUMMY_MEETUPS }, // will be passed to the page component as props
//     revalidate: 10,
//   };
// };

// export default HomePage;
