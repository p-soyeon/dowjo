/**컴포넌트 */
import react, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
import { useParmas } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./cousellist.css";
let rftoken = localStorage.getItem("rftoken");
let accessToken = localStorage.getItem("token");
console.log(accessToken);
export const Counselorbox = ({ counsel }) => {
  const navigate = useNavigate();
  const [Id, setId] = useState("");

  const onSetId = (event) => {
    setId(event.currentTarget.value);
  };
  useEffect(() => {
    console.log(Id);
    if (Id >= 1) {
      navigate("/Reserve", { state: { id: Id } });
    }
  }, [Id]);
  //Id 가 변경되면 useEffect 문 실행됨
  return (
    <div className="c_box">
      <div className="c_field">
        <span>{counsel.field}</span>
      </div>
      <div className="c_name">
        <span>{counsel.name}</span>
      </div>{" "}
      <div>
        <button onClick={onSetId} value={counsel.id}>
          예약
        </button>
      </div>
      <hr></hr>
      <div className="c_im_in">
        <img
          className="c_img"
          alt="profile_img"
          src={"https://dowajo.run.goorm.site" + counsel.img}
        />
        <span className="c_intro">{counsel.intro}</span>
      </div>
    </div>
  );
};
