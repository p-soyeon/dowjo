/*내담자 마이페이지*/
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Record1 } from "./mypage1record.js";
import jwt_decode from "jwt-decode";

const MyPage1 = () => {
  const navigate = useNavigate();
  const [decoding, setdecoding] = useState([]);
  const accesstoken = localStorage.getItem("token");
  const [reservelist, setreservelist] = useState([]);
  const [detail, setdetail] = useState([]);
  const refreshtoken = localStorage.getItem("rftoken");
  const decodetoken = jwt_decode(accesstoken);
  console.log(decodetoken);
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
  useEffect(() => {
    setInterval(() => {
      updatetoken();
      console.log("작업이 실행되었습니다.");
    }, 90 * 60 * 1000);

    setdecoding(decodetoken);

    axios
      .get("http://dowajo.run.goorm.site/api/reservation", {
        headers: {
          Authorization: accesstoken,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status == 200) {
          console.log("목록반환성공");

          console.log(response.data);

          setreservelist(response.data);
          console.log(reservelist);
        } else {
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  console.log(decoding);
  // reservelist.sort(function (a, b) {
  //   return b.id - a.id;
  // });
  var today = new Date();
  const sorteddata = [...reservelist].sort((a, b) => {
    const timeA = new Date(a.start_time);
    const timeB = new Date(b.start_time);
    const diffA = Math.abs(timeA - new Date());
    const diffB = Math.abs(timeB - new Date());
    return diffB - diffA;
  });
  console.log(sorteddata);
  const closeDate = null;
  function counselormypagetype() {
    const type = decoding.type;
    let result = [];
    if ((type = "counselor")) {
      result = [decoding.url, decoding.name, decoding.email, decoding.nick];
    } else {
      result = [decoding.name, decoding.email, decoding.nick];
    }
  }
  return (
    <div>
      <div>
        <div>{decoding.type}</div>
        <div>총 예약내역:{reservelist.length} 건</div> <br></br>
        {decoding.name}님 안녕하세요<br></br>
        이메일: {decoding.email}
        <br></br>
        닉네임: {decoding.nickname}
        <hr></hr>
      </div>
      {sorteddata.map((list) => (
        <Record1 key={`key-${list.id}`} list={list} />
      ))}
    </div>
  );
};
export default MyPage1;
