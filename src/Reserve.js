import { useNavigate } from "react-router-dom";
import MyPage1 from "./MyPage1";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import DatePicker from "react-datepicker";
import { useState } from "react";
import axios from "axios";

import { useLocation } from "react-router-dom";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ko } from "date-fns/esm/locale";
import { Counselorbox } from "./Counselorbox";
import "react-datepicker/dist/react-datepicker.css";
const Reserve = ({}) => {
  const accesstoken = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();

  const id = location.state.id;
  useEffect(() => {
    console.log(id);
  });

  const [time, setTime] = useState("");
  const [imgurl, seturl] = useState("");
  // const [intro,setintro] =useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [name, setName] = useState("");
  //setId("1");
  useEffect(() => {
    axios
      .get(`http://dowajo.run.goorm.site/api/counselor/${id}`)
      .then((response) => {
        console.log(response.data);
        seturl(response.data.img);
        setName(response.data.name);
      });
  });
  useEffect(() => {
    console.log(startDate);
    console.log(typeof startDate);
    //console.log(startDate);
    //startDate.setHours(startDate.getHours() + 9);
    console.log(startDate);
    axios
      .get(
        `http://dowajo.run.goorm.site/api/counselor/${id}` //getyear
      )
      .then((response) => {
        console.log(response.data);
        //예약완료된 시간들
        const infoimg = response.data.img;
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, [startDate]); //렌더링될때 한번,start date 가 바뀔때 한번 실행됨

  const submit = () => {
    axios
      .post(
        "http://dowajo.run.goorm.site/api/reservation",
        {
          counselor_id: id,
          start_time: startDate, // literal 로 getyear()-getmonth()-gettime()
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

  return (
    <div>
      <div>상담사 id: {id}</div>
      <img src={"https://dowajo.run.goorm.site" + imgurl} />
      <div>{name}</div>
      <div>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={60}
          timeCaption="time"
          dateFormat="MMMM d, yyyy h:mm aa"
          excludeTimes={time}
          inline
        />{" "}
      </div>
      <button onClick={submit}>제출</button>
    </div>
  );
};
export default Reserve;
//DB에 시간 넣고 실행해보기
