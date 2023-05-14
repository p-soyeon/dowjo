import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Record2 } from "./mypage2record.js";

const MyPage1 = () => {
  const navigate = useNavigate();

  const accesstoken = localStorage.getItem("token");
  const [reservelist, setreservelist] = useState([]);
  const [detail, setdetail] = useState([]);
  useEffect(() => {
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

  //reservelist.sort(function (a, b) {
  // return b.start_time - a.start_time;
  //});

  return (
    <div>
      {" "}
      {reservelist.map((list) => {
        return <Record2 key={`key-${list.id}`} list={list} />;
      })}
    </div>
  );
};
export default MyPage1;
