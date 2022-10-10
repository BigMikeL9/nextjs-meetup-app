import Head from "next/head";
import Layout from "../../components/layout/Layout";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
// www.our-domain.com/new-meetup

const NewMeetup = () => {
  const addMeetupHandler = async (meetupData) => {
    console.log(meetupData);

    // send new meetup data as 'POST' request to 'API Route' endpoint in 'pages/api/new-meetup.js' file, inorder to trigger the backend code there and send the data to be stored in a MongoDB database  -->  /api/new-meetup

    try {
      const response = await fetch("/api/new-meetup", {
        method: "POST",
        body: JSON.stringify(meetupData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Something Wrong happened!!!");

      const data = await response.json();

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>Add new Meetups</title>
        <meta
          name="description"
          content="Add new reactive meetups and create new amazing opportunities"
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  );
};

export default NewMeetup;
