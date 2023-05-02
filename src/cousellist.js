/**컴포넌트 */
export const Counselorbox = ({ counsel }) => {
  return (
    <div>
      <div>
        <img src={"https://dowajo.run.goorm.site" + counsel.img} />
      </div>

      <div>
        <span>{counsel.field}</span>
      </div>

      <div>
        <span>{counsel.name}</span>
      </div>
    </div>
  );
};
