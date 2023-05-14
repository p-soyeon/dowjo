export const Record1 = ({ list }) => {
  return (
    <div>
      <div>
        {list.Counselor.id}.{list.Counselor.name}
      </div>

      <div>예약시간:{list.start_time}</div>
      <button> 입장 </button>
    </div>
  );
};
