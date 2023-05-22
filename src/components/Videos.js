import "./Videos.scss";
import { BsFillMicFill, BsFillMicMuteFill } from "react-icons/bs";

const Videos = ({
  myVideoRef,
  remoteVideoRef,
  myMic,
  oppMic,
  myname,
  cname,
}) => {
  const counselorName = myname;
  console.log(myname);
  console.log(counselorName);
  console.log(cname);
  return (
    <div className="Videos">
      <div className="video">
        <video autoPlay ref={remoteVideoRef} />
        <div className="info">
          <div className="name">{counselorName.name}</div>{" "}
          <div className="null" />
          {oppMic ? <BsFillMicFill /> : <BsFillMicMuteFill />}
        </div>
      </div>
      <div className="video">
        <video autoPlay ref={myVideoRef} />
        <div className="info">
          <div className="name">{cname}</div> <div className="null" />
          {myMic ? <BsFillMicFill /> : <BsFillMicMuteFill />}
        </div>
      </div>
    </div>
  );
};

export default Videos;
