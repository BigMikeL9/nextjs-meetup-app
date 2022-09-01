import Layout from "../../components/layout/Layout";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
// www.our-domain.com/new-meetup

const NewMeetup = () => {
  const addMeetupHandler = (meetupData) => {
    console.log(meetupData);
  };

  return (
    <Layout>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Layout>
  );
};

export default NewMeetup;
