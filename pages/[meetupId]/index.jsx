import { useRouter } from "next/router";
import MeetupDetail from "../../components/meetups/MeetupDetail";

// ----- Dynamic page that will be used for different meetup details -----
// www.our-domain.com/[identifier]

const MeetupDetailPage = (props) => {
  console.log(props);

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

// -----------------------------------------------------
// 'getStaticPaths()'  ->  Have to use when we have dynamic pages ([meetupId]) and are pre-generating pages using 'getStaticProps()', so that 'Nextjs' knows what pages to pre-generate during the build process.
export const getStaticPaths = async () => {
  return {
    paths: [{ params: { meetupId: "m1" } }, { params: { meetupId: "m2" } }],
    fallback: false,
  };
};

// -----------------------------------------------------
// 'Static-site Generation' -- 'SSG'  ->
export const getStaticProps = (context) => {
  // fetch data from database using detailId

  // getting access to the detailId parameter in the URL inorder to fetch and pass its data to '<MeetupDetail/>

  console.log("LUL", context);

  const meetupId = context.params.meetupId;

  console.log(meetupId);

  return {
    props: {
      id: meetupId,
      imgSrc:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80",
      title: "First Meetup",
      address: "Paris",
      description: "This is the description",
    },
  };
};
