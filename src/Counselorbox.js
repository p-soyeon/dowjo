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
      navigate("/Reserve", { state: { id: Id } }); //id 를 넘겨서 해당하는 id 의
    }
  }, [Id]);
  //Id 가 변경되면 useEffect 문 실행됨
  return (
    <button
      key={counsel.id}
      className="c_box"
      onClick={onSetId}
      value={counsel.id}
    >
      <span>
        <div className="c_field">
          <span>
            <pre>
              {" "}
              {counsel.field} {counsel.name}
            </pre>
          </span>
        </div>
      </span>
      <hr></hr>
      <div className="c_im_in">
        <img
          className="c_img"
          alt="profile_img"
          src={"https://dowajo.run.goorm.site" + counsel.img}
        />
        <span className="c_intro">{counsel.intro}</span>
      </div>
    </button>
  );
};
