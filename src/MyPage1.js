/*내담자 마이페이지*/
import { useNavigate } from "react-router-dom";
const MyPage1 = () => {
  const navigate = useNavigate();
  const later = {
    border: "1px solid black",
    backgroundColor: "	#ffc0cb",
    margin: "auto",
    width: "500px",
    height: "70px",
    position: "relative",
  };
  const mypage = {
    border: "1px solid black",
    backgroundColor: "grey",
    margin: "auto",
    width: "500px",
    height: "70px",
    position: "relative",
  };
  const Room = () => {
    navigate("/Net");
  };
  return (
    <div>
      <h2 style={{ textAlign: "center" }}> 내담자 상담일정 </h2>
      <br></br>
      <p style={later}>
        3/30 <br></br> 상담이 예약되어 있습니다.
        <button
          onClick={Room}
          style={{ marginTop: "10px", marginLeft: "110px" }}
        >
          입장
        </button>
      </p>
      <br></br>
      <br></br>
      <br></br>
      <p style={mypage}>
        4/3 <br></br>
        상담이 예약되어 있습니다.
        <button
          disabled={true}
          style={{ marginTop: "10px", marginLeft: "140px" }}
        >
          입장불가
        </button>
      </p>
      <br></br>
      <p style={mypage}>
        4/15<br></br>
        상담이 예약되어 있습니다.
        <button
          disabled={true}
          style={{ marginTop: "10px", marginLeft: "140px" }}
        >
          {" "}
          입장불가
        </button>
      </p>
    </div>
  );
};
export default MyPage1;
