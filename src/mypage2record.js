export const Record2 = ({ list }) => {
  return (
    <div>
      <div>
        {list.user_id}.{list.User.name}
      </div>

      <div>예약시간:{list.start_time}</div>
      <button> 입장 </button>
    </div>
  );
};
