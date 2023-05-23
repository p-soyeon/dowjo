import "./Videos.scss";
import { BsFillMicFill, BsFillMicMuteFill } from "react-icons/bs";
import jwt_decode from "jwt-decode";
import { useState } from "react";
import { useEffect } from "react";
const Videos = ({
  myVideoRef,
  remoteVideoRef,
  myMic,
  oppMic,
  myname,
  cname,
  uname,
}) => {
  const [decoding, setdecoding] = useState([]);
  const accesstoken = localStorage.getItem("token");
  const refreshtoken = localStorage.getItem("rftoken");
  useEffect(() => {
    const decodetoken = jwt_decode(accesstoken);
    console.log(decodetoken);
    setdecoding(decodetoken);
  }, []);

  const counselorName = myname;
  console.log(myname);
  console.log(counselorName);
  console.log(cname);
  if (decoding.type === "counselors") {
    return (
      <div className="Videos">
        <div className="video">
          <video autoPlay ref={remoteVideoRef} />
          <div className="info">
            <div className="name">{uname}</div> <div className="null" />
            {oppMic ? <BsFillMicFill /> : <BsFillMicMuteFill />}
          </div>
        </div>
        <div className="video">
          <video autoPlay ref={myVideoRef} />
          <div className="info">
            <div className="name">{decoding.name}</div> <div className="null" />
            {myMic ? <BsFillMicFill /> : <BsFillMicMuteFill />}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="Videos">
        <div className="video">
          <video autoPlay ref={remoteVideoRef} />
          <div className="info">
            <div className="name">{cname}</div> <div className="null" />
            {oppMic ? <BsFillMicFill /> : <BsFillMicMuteFill />}
          </div>
        </div>
        <div className="video">
          <video autoPlay ref={myVideoRef} />
          <div className="info">
            <div className="name">{decoding.name}</div> <div className="null" />
            {myMic ? <BsFillMicFill /> : <BsFillMicMuteFill />}
          </div>
        </div>
      </div>
    );
  }
};

export default Videos;
