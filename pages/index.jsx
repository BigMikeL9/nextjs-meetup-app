import Layout from "../components/layout/Layout";
import MeetupList from "../components/meetups/MeetupList";

// www.our-domain.com

const DUMMY_MEETUPS = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80",
    title: "DUMMY",
    address: "1 Canvass ct",
  },
];

const HomePage = () => {
  return (
    <Layout>
      <MeetupList meetups={DUMMY_MEETUPS} />
    </Layout>
  );
};

export default HomePage;
