import { useNavigate } from "react-router-dom";
import Reserve from "./Reserve";
import Videoroom from "./videoroom";
import jwt_decode from "jwt-decode";
import { useState } from "react";
import { useEffect } from "react";
export const Record1 = ({ list }) => {
  const navigate = useNavigate();
  const utctime = new Date(list.start_time);
  const year = utctime.getFullYear();
  const month = utctime.getMonth() + 1;
  const day = utctime.getDate();
  const hours = utctime.getHours();
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
    setResereveID(event.currentTarget.value);
    navigate("/videoroom", {
      state: {
        id: event.currentTarget.value,
        name: decoding.name,
        token: localStorage.getItem("token"),
      },
    });
  };

  return (
    <div>
      <div>
        {" "}
        이름 : {list.id} // 예약id {list.id} 상담사 id:
        {list.Counselor.id}.{list.Counselor.name} 상담사님
      </div>

      <div>
        예약시간:{year}년 {month}월 {day}일 {hours} 시
      </div>
      <button value={list.id} onClick={entrance}>
        {" "}
        입장{" "}
      </button>
    </div>
  );
};
