/*회원가입 이후 상담사 화면*/
import { useNavigate } from "react-router-dom";
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

const Upage = () => {
  const navigate = useNavigate();
  const Login = () => {
    navigate("/Loginpage");
  };
  const Register = () => {
    navigate("/Select");
  };
  const M1 = () => {
    navigate("/MyPage2");
  };
  const M2 = () => {
    navigate("/MyPage2");
  };
  return (
    <div style={main}>
      <button onClick={M2}>상담사 마이페이지</button>

      <hr></hr>
      <button style={box}>
        <button
          style={{
            width: "50px",
            height: "50px",
            marginRight: "50px",
            borderRadius: "50%",
          }}
        >
          사진
        </button>
        상담사a
      </button>
      <button style={box}>
        {" "}
        <button
          style={{
            width: "50px",
            height: "50px",
            marginRight: "50px",
            borderRadius: "50%",
          }}
        >
          사진
        </button>
        상담사b
      </button>
      <button style={box}>
        {" "}
        <button
          style={{
            width: "50px",
            height: "50px",
            marginRight: "50px",
            borderRadius: "50%",
          }}
        >
          사진
        </button>
        상담사c
      </button>
      <button style={box}>
        {" "}
        <button
          style={{
            width: "50px",
            height: "50px",
            marginRight: "50px",
            borderRadius: "50%",
          }}
        >
          사진
        </button>
        상담사d
      </button>
      <button style={box}>
        {" "}
        <button
          style={{
            width: "50px",
            height: "50px",
            marginRight: "50px",
            borderRadius: "50%",
          }}
        >
          사진
        </button>
        상담사e
      </button>
      <button style={box}>
        {" "}
        <button
          style={{
            width: "50px",
            height: "50px",
            marginRight: "50px",
            borderRadius: "50%",
          }}
        >
          사진
        </button>
        상담사f
      </button>
    </div>
  );
};
export default Upage;
