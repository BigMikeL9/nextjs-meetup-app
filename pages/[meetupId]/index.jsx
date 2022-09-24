import { useRouter } from "next/router";
import MeetupDetail from "../../components/meetups/MeetupDetail";

// ----- Dynamic page that will be used for different meetup details -----
// www.our-domain.com/[identifier]

const MeetupDetailPage = () => {
  const router = useRouter();

  console.log(router);

  const { meetupId } = router.query;

  // fetch data from database using the meetupId -> then pass it to the '<MeetupDetail/>' component

  return (
    <>
      <h1>{meetupId}</h1>

      <MeetupDetail
        imgSrc="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80"
        title="First Meetup"
        address="Paris"
        description="This is the description"
      />
    </>
  );
};

export default MeetupDetailPage;

export const getStaticProps = (context) => {
  // fetch data from database using detailId

  // getting access to the detailId parameter in the URL inorder to fetch and pass its data to '<MeetupDetail/>

  console.log(context);

  const meetupId = context.params.meetupid;

  console.log(meetupId);

  return {
    props: {
      imgSrc:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80",
      title: "First Meetup",
      address: "Paris",
      description: "This is the description",
    },
  };
};
