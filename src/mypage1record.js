export const Record1 = ({ list }) => {
  const utctime = new Date(list.start_time);
  const year = utctime.getFullYear();
  const month = utctime.getMonth() + 1;
  const day = utctime.getDate();
  const hours = utctime.getHours();

  return (
    <div>
      <div>
        {list.Counselor.id}.{list.Counselor.name}
      </div>

      <div>
        예약시간:{year}년 {month}월 {day}일 {hours} 시
      </div>
      <button> 입장 </button>
    </div>
  );
};
