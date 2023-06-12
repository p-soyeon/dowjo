import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Record1 } from "./mypage1record.js";
import { Record2 } from "./mypage1record.js";
import jwt_decode from "jwt-decode";
import Navbar from "./Nav";
import { FaRegUserCircle } from "react-icons/fa";
import "./mypage1.css";
const MyPage1 = () => {
  const navigate = useNavigate();

  const [decoding, setdecoding] = useState([]);
  let accesstoken = localStorage.getItem("token");
  const [reservelist, setreservelist] = useState([]);
  const [detail, setdetail] = useState([]);
  const refreshtoken = localStorage.getItem("rftoken");
  let decodetoken = jwt_decode(accesstoken);
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

          localStorage.setItem("token", response.data.accessToken);
          accesstoken = response.data.accessToken;

          decodetoken = jwt_decode(accesstoken);
          console.log(decodetoken);
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
    }, 30000);

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
  console.log(reservelist);
  console.log(decoding);
  const type = decoding.type;

  // reservelist.sort(function (a, b) {
  //   return b.id - a.id;
  // });

  const sorteddata = [...reservelist].sort((a, b) => {
    const timeA = new Date(a.start_time);
    const timeB = new Date(b.start_time);
    const diffA = Math.abs(timeA - new Date());
    const diffB = Math.abs(timeB - new Date());
    return diffB - diffA;
  });
  console.log(sorteddata);
  const closeDate = null;
  var today = new Date();
  const todaytime = today.getTime();

  const past = sorteddata.filter((item) => {
    const itemTime = new Date(item.start_time).getTime();
    return itemTime < todaytime;
  });
  const futureData = sorteddata.filter((item) => {
    const itemTime = new Date(item.start_time).getTime(); // 객체의 시간을 밀리초로 변환
    return itemTime >= todaytime;
  });
  console.log("과거" + past);
  console.log("미래" + futureData);

  let imgsrc;
  if (decodetoken.type === "users") {
    return (
      <div>
        <Navbar />
        <div className="banner">
          <div className="iconbox">
            <FaRegUserCircle className="icon" />
          </div>
          <div className="myInfo">
            <table className="informtable">
              <tr>
                <td className="name">
                  {" "}
                  {decodetoken.name} 님<span class="welcome"> 환영합니다.</span>
                </td>
                <td className="td"></td>
              </tr>
              <br></br>
              <br></br>
              <tr className="tr1">
                <td className="td">이메일</td>
                <td className="td">{decodetoken.email}</td>
              </tr>
              <br></br>
              <tr className="tr1">
                <td className="td">닉네임</td>
                <td className="td">{decoding.nickname}</td>
              </tr>
              <br></br>
              <tr className="tr1">
                <td className="td">총 예약내역</td>
                <td className="td"> {reservelist.length}건 </td>
              </tr>
            </table>
          </div>
          <div className="planbox">
            {" "}
            <div className="pastreserve">
              <div className="pastbox">
                {" "}
                <span className="futrer"> 상담 예정</span>
                {futureData.length}
              </div>
            </div>{" "}
            <div className="pastreserve">
              <div className="pastbox">
                {" "}
                <span className="pastr"> 지난상담</span> {past.length}
              </div>
            </div>
          </div>
        </div>{" "}
        <h3 className="title">상담 예약 목록</h3>
        <div className="entire">
          <div className="bg">
            <div className="Reserlist">
              <span className="text12">상담예정</span>
              {futureData.map((list) => (
                <Record1 key={`key-${list.id}`} list={list} />
              ))}
              <hr class="line"></hr> <span className="text12">지난상담</span>
              {past.map((list) => (
                <div className="different-design">
                  <Record1 key={`key-${list.id}`} list={list} isPast={true} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Navbar />
        <div className="banner">
          <img
            className="imgsize"
            src={"https://dowajo.run.goorm.site" + decoding.url}
          />
          <div className="myInfo">
            <table className="informtable">
              <tr>
                <td className="name">
                  {" "}
                  {decoding.name} 님<span class="welcome"> 환영합니다.</span>
                </td>
                <td className="td"></td>
              </tr>
              <br></br>
              <br></br>
              <tr className="tr1">
                <td className="td">이메일</td>
                <td className="td">{decoding.email}</td>
              </tr>
              <br></br>
              <tr className="tr1">
                <td className="td">닉네임</td>
                <td className="td">{decoding.nickname}</td>
              </tr>
              <br></br>
              <tr className="tr1">
                <td className="td">총 예약내역</td>
                <td className="td"> {reservelist.length}건 </td>
              </tr>
            </table>
          </div>
          <div className="planbox">
            {" "}
            <div className="pastreserve">
              <div className="pastbox">
                {" "}
                <span className="futrer"> 상담 예정</span>
                {futureData.length}
              </div>
            </div>{" "}
            <div className="pastreserve">
              <div className="pastbox">
                {" "}
                <span className="pastr"> 지난상담</span> {past.length}
              </div>
            </div>
          </div>
        </div>{" "}
        <h3 className="title">상담 예약 목록</h3>
        <div className="entire">
          <div className="bg">
            <div className="Reserlist">
              <span className="text12">상담예정</span>
              {futureData.map((list) => (
                <Record1 key={`key-${list.id}`} list={list} />
              ))}
              <hr class="line"></hr> <span className="text12">지난상담</span>
              {past.map((list) => (
                <div className="different-design">
                  <Record1 key={`key-${list.id}`} list={list} isPast={true} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
};
export default MyPage1;
