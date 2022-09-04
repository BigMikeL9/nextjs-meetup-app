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

const HomePage = () => {
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch("enter database url here");

      if (!response.ok) throw new Error("Something went wrong!!");

      const data = await response.json();

      // transform fetched data and store it in a variable/state

      const transformedMeetups = data.map((meetup) => {});

      setLoadedMeetups(transformedMeetups);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return <MeetupList meetups={loadedMeetups} />;
};

export default HomePage;
