import { useNavigate } from "react-router-dom";
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
      <h2>원하시는 서비스를 선택해주세요.</h2>
      <button onClick={user}>내담자</button>
      <button onClick={councelor}>상담자</button>
    </div>
  );
};
export default Select;
