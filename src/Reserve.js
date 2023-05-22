import { useNavigate } from "react-router-dom";
import MyPage1 from "./MyPage1";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import "./reserve.css";
import { useState } from "react";
import axios from "axios";
import { parseISO } from "date-fns";
import { useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ko } from "date-fns/esm/locale";
import { Counselorbox } from "./Counselorbox";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
const refreshtoken = localStorage.getItem("rftoken");
const accesstoken = localStorage.getItem("token");
const Reserve = ({}) => {
  const updatetoken = () => {
    axios
      .get("http://dowajo.run.goorm.site/api/updateToken", {
        headers: {
          Authorization: refreshtoken,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status == 200) {
          console.log("콘솔 업데이트");

          console.log(response.data);

          localStorage.setItem(
            "token",
            JSON.stringify(response.data.accessToken)
          );
        } else {
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const accesstoken = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation(); //mypage 에서 넘어온 id 받기
  const id = location.state.id;
  useEffect(() => {
    //accesstoken 업데이트
    setInterval(() => {
      updatetoken();
      console.log("작업이 실행되었습니다.");
    }, 90 * 60 * 1000);

    console.log(id);
  });

  const [time, setTime] = useState([]);
  const [imgurl, seturl] = useState("");
  // const [intro,setintro] =useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [name, setName] = useState("");
  const [intro, setintro] = useState("");
  //setId("1");
  useEffect(() => {
    axios
      .get(`http://dowajo.run.goorm.site/api/counselor/${id}`)
      .then((response) => {
        console.log(response.data);
        seturl(response.data.img);
        setName(response.data.name);
        setintro(response.data.intro);
      });
  }, []);

  useEffect(() => {
    console.log(startDate);
    console.log(typeof startDate);
    //console.log(startDate);
    //startDate.setHours(startDate.getHours() + 9);
    console.log(startDate);
    axios
      .get(
        `http://dowajo.run.goorm.site/api/reservation/time?id=${id}&day=${startDate}` //getyear
      )
      .then((response) => {
        console.log(response.data);
        setTime(response.data);

        //예약완료된 시간
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, [startDate]); //렌더링될때 한번,start date 가 바뀔때 한번 실행됨
  console.log(time);
  const reservedtime = time.map((item) => item.start_time);
  console.log(reservedtime);
  console.log(typeof reservedtime);
  let parseddate = reservedtime.map((time) => parseISO(time));
  console.log(parseddate);
  const submit = () => {
    const year = startDate.getFullYear();
    const month = startDate.getMonth() + 1;
    const day = startDate.getDate();
    const utcTime = startDate;
    const krtime = format(
      utcToZonedTime(new Date(utcTime), "Asia/Seoul"),
      "yyyy-MM-dd HH:mm:ss"
    );
    axios
      .post(
        "https://dowajo.run.goorm.site/api/reservation",
        {
          counselor_id: id,
          start_time: krtime, // literal 로 getyear()-getmonth()-gettime()
        },
        {
          headers: {
            Authorization: accesstoken,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("123");
        console.log(response.data);
        if (response.status == 200) {
          console.log("예약성공");
          navigate("/Mainpage");
          console.log(response.data);
        } else {
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  const filterTimes = (time) => {
    const hours = time.getHours();
    return hours < 0 || (hours > 8 && hours < 19);
  };
  return (
    <div>
      <div>상담사 id: {id}</div>

      <div>{intro}y</div>
      <div>{name}</div>
      <div>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={60}
          timeCaption="time"
          //minDate={new Date()}
          dateFormat="MMMM d, yyyy h:mm aa"
          excludeTimes={parseddate}
          filterTime={filterTimes}
          inline
        />{" "}
      </div>
      <button onClick={submit}>제출</button>
    </div>
  );
};
export default Reserve;
