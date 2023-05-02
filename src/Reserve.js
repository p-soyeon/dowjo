import { useNavigate } from "react-router-dom";
import MyPage1 from "./MyPage1";
const Reserve = () => {
  const navigate = useNavigate();
  const Finish = () => {
    navigate("/MyPage1");
  };
  return (
    <div>
      <h2>상담예약</h2>
      <br></br>
      <label>날짜</label>
      <input id="date" type="date"></input>
      <label>시간</label>
      <input id="time" type="time"></input>
      <br></br>
      <br></br>
      <label>Q1</label>
      <input
        id="q1"
        type="text"
        style={{ height: "100px", width: "250px" }}
      ></input>
      <br></br>
      <br></br>
      <label>Q2</label>
      <input
        id="q1"
        type="text"
        style={{ height: "100px", width: "250px" }}
      ></input>
      <br></br>

      <br></br>
      <button onClick={Finish}>예약 완료</button>
    </div>
  );
};
export default Reserve;
