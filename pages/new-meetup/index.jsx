import Layout from "../../components/layout/Layout";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
// www.our-domain.com/new-meetup

const NewMeetup = () => {
  const addMeetupHandler = async (meetupData) => {
    console.log(meetupData);

    // send new meetup data as 'POST' request to 'API Routes' endpoint in 'pages/api/new-meetup.js' file  -->  /api/new-meetup

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

  return <NewMeetupForm onAddMeetup={addMeetupHandler} />;
};

export default NewMeetup;
