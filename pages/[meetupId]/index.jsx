import { useRouter } from "next/router";

// ----- Dynamic page that will be used for different meetup details -----
// www.our-domain.com/[identifier]

const MeetupDetailPage = () => {
  const router = useRouter();

  console.log(router);

  const { meetupId } = router.query;

  return <h1>{meetupId}</h1>;
};

export default MeetupDetailPage;
