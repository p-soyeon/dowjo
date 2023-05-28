import { useNavigate, Link } from "react-router-dom";
import "./Select.css";
const Select = () => {
  const navigate = useNavigate();
  const user = () => {
    navigate("/UserRegister");
  };
  const councelor = () => {
    navigate("/CRegister");
  };
  return (
    <div>
      <div className="center_block">
        {" "}
        <Link to="/">
          <img
            className="logo_img"
            alt="logo_img"
            src={require("./logo.png")}
          />
        </Link>
        <h2>원하시는 서비스를 선택해주세요.</h2>
      </div>

      <table className="twoBtn">
        <tr>
          <td className="td_btn">
            <button className="counsel_btn" onClick={councelor}>
              <h5>상담해주고 싶어요</h5>

              <h1>상담자</h1>
            </button>
          </td>
          <td className="td_btn">
            {" "}
            <button className="client_btn" onClick={user}>
              <h5>상담 받고 싶어요</h5>
              <h1>내담자</h1>
            </button>
          </td>
        </tr>
      </table>
    </div>
  );
};
export default Select;
