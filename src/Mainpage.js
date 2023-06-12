import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef } from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Counselorbox } from "./Counselorbox";
import "./Mainpage.css";
import jwt_decode from "jwt-decode";

import Navbar from "./Nav";
const main = {
  border: "1px solid black",
  backgroundColor: "grey",
  margin: "auto",
  width: "625px",
  height: "200px",
  position: "relative",
};
const box = {
  border: "1px solid black",
  backgroundColor: "white",
  margin: "auto",
  width: "200px",
  height: "60px",
  borderRadius: "10px",
  position: "relative",
  marginLeft: "5px",
};

const Mainpage = () => {
  //토큰을 가져와서 토큰이 있으면 1번 nav 없으면 2 번 nav

  //const [decoding, setdecoding] = useState([]);
  const rftoken = localStorage.getItem("rftoken");
  const params = new URLSearchParams();
  const [counSelor, setCounselor] = useState([]);
  const [token, settoken] = useState([]);
  const [checkfield, setcheckfield] = useState([]); //checkbox 를 체크하면 해당 feild가 쿼리로 전해짐
  const [filtered, setFiltered] = useState([]); //백엔드에서 필터링되어 반환된 데이터를 담음
  let accesstoken = localStorage.getItem("token");

  const decoding = jwt_decode(accesstoken); //디코딩한 토큰
  //  settoken(accesstoken);

  let decodetoken = jwt_decode(accesstoken);
  const [newtoken, setnewtoken] = useState("");
  const refreshtoken = localStorage.getItem("rftoken");
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
        } else {
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  useEffect(() => {
    if (token != null) {
      //accesstoken 업데이트
      setInterval(() => {
        updatetoken();
        console.log("작업이 실행되었습니다.");
      }, 30000);
    }

    //서버에서 모든 상담사 목록 get
    if (localStorage.getItem("rftoken") === null) {
      window.location.replace("/");
    } else {
      axios
        .get("http://dowajo.run.goorm.site/api/counselor")
        .then((response) => {
          console.log(response.data);
          setCounselor(response.data);
          setFiltered(response.data); //처음 렌더링 되면  filtered 에는 모든 정보가 들어있음
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []); //로컬스토리지가 비어있으면 로그인페이지로 이동

  const Checkbox = (event) => {
    const { value, checked } = event.target; //버튼이 눌리면 value 값과 checked여부를 저장
    if (checked) {
      //체크 되었으면 체크필드에 값을 배열로 저장해줌
      setcheckfield([...checkfield, value]); //체크필드에 값을 배열로 저장해줌
    } else {
      setcheckfield(checkfield.filter((filter) => filter !== value));
    } //체크 취소하면 해당 배열 제외하고 반환
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams();
        for (let i = 0; i < checkfield.length; i++) {
          params.append("field", checkfield[i]);
        }
        if (checkfield.length == 0) {
          setFiltered(counSelor); //checkfield 의 길이가 0 이면 전체 목록
        } else {
          const response = await axios.get(
            `http://dowajo.run.goorm.site/api/counselor/field?${params.toString()}`
          );

          setFiltered(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [checkfield]);

  console.log(checkfield);

  //빈복문을 돌면서 쿼리에 append 해줌

  console.log(params);

  return (
    <div>
      <Navbar />
      <div className="banner1">
        <h2 className="dowajo">Dowajo</h2>

        <h4 className="explain">
          <span name999>{decoding.name}</span> 님, 다양한 분야의 상담사들을 한
          곳에서 만나보세요.
        </h4>
      </div>
      <div className="category">
        <table>
          <tr>
            <td className="td_cate">
              {" "}
              <label htmlFor="checkbox-a">
                <input
                  className="in_check"
                  type="checkbox"
                  id="checkbox-a"
                  onChange={(event) => Checkbox(event)}
                  value="학업"
                />
                학업
              </label>
            </td>{" "}
            <td className="td_cate">
              <label htmlFor="checkbox-b">
                <input
                  className="in_check"
                  type="checkbox"
                  id="checkbox-b"
                  onChange={(event) => Checkbox(event)}
                  value="진로"
                />
                진로
              </label>
            </td>{" "}
            <td className="td_cate">
              {" "}
              <label htmlFor="checkbox-c">
                <input
                  className="in_check"
                  type="checkbox"
                  id="checkbox-c"
                  onChange={(event) => Checkbox(event)}
                  value="건강"
                />
                건강
              </label>
            </td>{" "}
            <td className="td_cate">
              {" "}
              <label htmlFor="checkbox-d">
                <input
                  className="in_check"
                  type="checkbox"
                  id="checkbox-d"
                  onChange={(event) => Checkbox(event)}
                  value="심리"
                />
                심리
              </label>
            </td>{" "}
            <td className="td_cate">
              {" "}
              <label htmlFor="checkbox-e">
                <input
                  className="in_check"
                  type="checkbox"
                  id="checkbox-e"
                  onChange={(event) => Checkbox(event)}
                  value="법률"
                />
                법률
              </label>
            </td>{" "}
            <td className="td_cate">
              {" "}
              <label htmlFor="checkbox-f">
                <input
                  className="in_check"
                  type="checkbox"
                  id="checkbox-f"
                  onChange={(event) => Checkbox(event)}
                  value="투자"
                />
                투자
              </label>
            </td>{" "}
            <td className="td_cate">
              {" "}
              <label htmlFor="checkbox-g">
                <input
                  className="in_check"
                  type="checkbox"
                  id="checkbox-f"
                  onChange={(event) => Checkbox(event)}
                  value="기타"
                />
                기타
              </label>
            </td>
          </tr>
        </table>
      </div>
      <main>
        {" "}
        <div className="c_total">
          {filtered.map((counsel) => {
            return <Counselorbox key={`key-${counsel.id}`} counsel={counsel} />;
          })}
        </div>
      </main>{" "}
    </div>
  );
};
export default Mainpage;
