import Card from "../ui/Card";
import classes from "./MeetupDetail.module.css";

const MeetupDetail = (props) => {
  //   console.log(classes);
  //   console.log(props);

  return (
    <Card className={classes["detail__container"]}>
      <div className={classes["image__container"]}>
        <img src={props.imgSrc} alt={props.title} />
      </div>

      <div className={classes["content__container"]}>
        <h3>{props.title}</h3>
        <address>{props.address}</address>
      </div>
    </Card>
  );
};

export default MeetupDetail;
