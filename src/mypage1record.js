import { useNavigate } from "react-router-dom";
import Reserve from "./Reserve";
import Videoroom from "./videoroom";
import jwt_decode from "jwt-decode";
import { useState } from "react";
import { useEffect } from "react";
export const Record1 = ({ list }) => {
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

  return (
    <div>
      <div className="ReserComp">
        {list.Counselor.name} 상담사님<br></br> 상담 예약 시간:<br></br> {month}
        월 {day}일<br></br>
        {hours}:{minutes} ~ {hours + 1}:{minutes}
        <br></br>
        <button value={list.id} name={list.Counselor.name} onClick={entrance}>
          입장
        </button>
      </div>
    </div>
  );
};
