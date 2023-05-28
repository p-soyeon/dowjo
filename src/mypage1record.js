import { useNavigate } from "react-router-dom";
import Reserve from "./Reserve";
import Videoroom from "./videoroom";
import jwt_decode from "jwt-decode";
import { useState } from "react";
import { useEffect } from "react";
export const Record1 = ({ isPast, list }) => {
  const navigate = useNavigate();
  const utctime = new Date(list.start_time);
  const date = new Date(list.start_time);
  const year = utctime.getFullYear();
  const month = utctime.getMonth() + 1;
  const day = utctime.getDate();
  const hours = utctime.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0"); // padStart()를 사용하여 두 자리 수로 맞춥니다.
  const [ReserveId, setResereveID] = useState("");
  const [decoding, setdecoding] = useState([]);
  const [token, accesttoken] = useState("");
  const [cname, setName] = useState("");
  const accesstoken = localStorage.getItem("token");
  const refreshtoken = localStorage.getItem("rftoken");
  var today = new Date();
  const todaytime = today.getTime();

  useEffect(() => {
    const decodetoken = jwt_decode(accesstoken);
    console.log(decodetoken);
    setdecoding(decodetoken);
  }, []);
  console.log(decoding);
  const entrance = (event) => {
    //ReserveId = event.currentTarget.value;
    window.location.href = `/videoroom?id=${
      event.currentTarget.value
    }&name=${encodeURIComponent(decoding.name)}&token=${encodeURIComponent(
      localStorage.getItem("token")
    )}&counselorId=${event.currentTarget.name}`;
    /*navigate("/videoroom", {
      state: {
        id: event.currentTarget.value,
        name: decoding.name,
        token: localStorage.getItem("token"),
      },
    });*/
  };
  const entrance1 = (event) => {
    window.location.href = `/videoroom?roomid=${
      event.currentTarget.value
    }&name=${encodeURIComponent(decoding.name)}&token=${encodeURIComponent(
      localStorage.getItem("token")
    )}&UserId=${event.currentTarget.name}&profileimg=${
      event.target.dataset.url
    }&myid=${encodeURIComponent(decoding.id)}&email=${encodeURIComponent(
      decoding.email
    )}`;
  };
  if (decoding.type === "counselors") {
    return (
      <div className="past">
        <div className="ReserComp">
          {list.User.name} 고객님 <br></br> 상담 예약 시간:<br></br> {month}월{" "}
          {day}일<br></br>
          {hours}:{minutes} ~ {hours + 1}:{minutes}
          <br></br>
          <button
            className={isPast ? "disable-button" : ""}
            disabled={isPast}
            value={list.id}
            name={list.User.name}
            onClick={entrance1}
          >
            입장
          </button>
        </div>
      </div>
    );
  } else if (decoding.type === "users") {
    return (
      <div className="past">
        <div className="ReserComp">
          {list.Counselor.name} 상담사님 <br></br> 상담 예약 시간:<br></br>{" "}
          {month}월 {day}일<br></br>
          {hours}:{minutes} ~ {hours + 1}:{minutes}
          <br></br>
          <button
            className={isPast ? "disable-button" : ""}
            disabled={isPast}
            value={list.id}
            name={list.Counselor.name}
            onClick={entrance1}
          >
            {" "}
            <span data-url={list.Counselor.img}>입장</span>
          </button>
        </div>
      </div>
    );
  }
};
