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
  const decodetoken = jwt_decode(accesstoken);
  console.log(decodetoken);

  useEffect(() => {
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
  //reservelist.sort(function (a, b) {
  // return b.start_time - a.start_time;
  //});

  return (
    <div>
      <div>
        내정보:<br></br>
        회원 아이디 {decoding.id}
        <br></br>
        이름:{decoding.name};<br></br>
        이메일:{decoding.email};<br></br>
        닉네임:{decoding.nickname}
        <hr></hr>
      </div>
      {reservelist.map((list) => (
        <Record1 key={`key-${list.id}`} list={list} />
      ))}
    </div>
  );
};
export default MyPage1;
//console.log(response.data[0].Counselor);
//console.log(response.data[1].Counselor);
// for (let i = 0; i < response.data.length; i++) {
//  setdetail((prevItems) => [
//   ...prevItems,
//  response.data[i].Counselor,
//]);
// }
//console.log(detail);
