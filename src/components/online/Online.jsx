import "./online.css";
const Online = ({user}) => {
  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <img src={user.profile} alt="" className="rightbarProfileImg" />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUsername">{user.name}</span>
    </li>
  );
};
export default Online;
