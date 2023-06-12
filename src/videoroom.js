import axios from "axios";
import { useState, useRef, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import ChatTemplate from "./components/ChatTemplate";
import ChatLog from "./components/ChatLog";
import TextInput from "./components/TextInput";
import Overlay from "./components/Overlay";
import VideoCallTemplate from "./components/VideoCallTemplate";
import SettingBar from "./components/SettingBar";
import Videos from "./components/Videos";
import { AiOutlineUser } from "react-icons/ai";
import jwt_decode from "jwt-decode";
import { useParams } from "react-router-dom";
const searchParams = new URLSearchParams(window.location.search);
const profileimg = searchParams.get("profileimg1"); //상담사 프로필 이미지
const profileimg2 = searchParams.get("profileimg2");
console.log(profileimg);
const cname = searchParams.get("counselorId"); //상담사 이름
const list = searchParams.get("list");
const name = searchParams.get("name"); //자기 이름
const email = searchParams.get("email");
const roomid = searchParams.get("roomid");
const refreshtoken = localStorage.getItem("rftoken");
const myid = searchParams.get("myid");
const oppname = searchParams.get("oppname"); //상대방이름
console.log(cname);

//const token = searchParams.get("token");
console.log("videoroom.js 로드");

const token = localStorage.getItem("token");
const accessToken1 = { token };

const myname1 = { name };
const myname = myname1.name;
const roomId1 = { roomid };
const roomId = JSON.stringify(roomId1);

console.log(typeof myname);
console.log(typeof roomId);

//테스트용 constant 값들
let accessToken = localStorage.getItem("token");

const myInfo1 = {
  id: myid,
  name: name,
  email: email,
};
const myInfo2 = {
  id: myid,
  name: name,
  email: email,
  url: profileimg2,
};

// myname = "장승훈";
//const roomId = 1;
//const cname = "강성태";
//const uname = myname;
//합칠때 지워주세요

const socket = io("https://dowajo.run.goorm.site", {
  auth: {
    Authorization: accessToken,
  },
  autoConnect: false,
});

function App() {
  const navigate = useNavigate();
  const decodetoken = jwt_decode(accessToken);

  const updatetoken = () => {
    axios
      .get("http://dowajo.run.goorm.site/api/updateToken", {
        headers: {
          Authorization: refreshtoken,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status == 200) {
          console.log("콘솔 업데이트");

          console.log(response.data);

          localStorage.setItem("token", response.data.accessToken);
          accessToken = response.data.accessToken;

          decodetoken = jwt_decode(accessToken);
          console.log(decodetoken);
        } else {
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  useEffect(() => {
    setInterval(() => {
      updatetoken();
      console.log("작업이 실행되었습니다.");
    }, 30000);
  });
  const [messages, setMessages] = useState([]);

  const [settings, setSettings] = useState({
    mikeOn: true,
    mikeOption: false,
    videoOn: true,
    videoOption: false,
    speakerOn: true,
    speakerOption: false,
  });
  const [oppSettings, setOppSettings] = useState({
    mikeOn: true,
    videoOn: false,
    speakerOn: true,
  });
  const [ableVideos, setAbleVideos] = useState([]);
  const [ableMikes, setAbleMikes] = useState([]);
  const [ableSpeakers, setAbleSpeakers] = useState([]);
  const [cameraLable, setCameraLable] = useState();
  const [mikeLable, setMikeLable] = useState();
  const [speakerLable, setSpeakerLable] = useState();
  const [oppConnected, setOppConnected] = useState(false);
  const nextId = useRef(1);
  const myStream = useRef();
  const oppStream = useRef();
  const myVideoRef = useRef();
  const remoteVideoRef = useRef();
  const peerRef = useRef();
  const videoSender = useRef();
  const mikeSender = useRef();
  const initialized = useRef(false);
  const ioSocket = useRef(socket);

  const onExit = useCallback(() => {
    navigate(-1);
    console.log("퇴장 이벤트");
  }, []);

  //처음 로드 시 사용가능한 Device들 등록
  const setDevices = useCallback(async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      console.log(devices);
      let ableVideoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );
      setAbleVideos(ableVideoDevices);
      let ableMikeDevices = devices.filter(
        (device) => device.kind === "audioinput"
      );
      setAbleMikes(ableMikeDevices);
      let ableSpeakerDevices = devices.filter(
        (device) => device.kind === "audiooutput"
      );
      setAbleSpeakers(ableSpeakerDevices);
    } catch (e) {
      console.log(e);
    }
  }, []);

  //채팅 전송
  const sendMessage = useCallback((msg) => {
    if (!msg) {
      return;
    }
    socket.emit("new_message", msg);
  });

  //새로운 채팅 수신 시
  const addMessage = useCallback(
    (user, msg) => {
      let now = new Date();
      let ampm = now.getHours() < 12 ? "오전" : "오후";
      setMessages(
        messages.concat({
          id: nextId.current++,
          sysMsg: false,
          name: user.name,
          text: msg,
          yourMessage: user.name === myname ? true : false,
          url: user.url,
          time: `${ampm} ${now.getHours() % 12}:${
            now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes()
          }`,
        })
      );
    },
    [messages]
  );

  //새로운 이벤트 수신 시
  const addEvent = useCallback(
    (userName, event) => {
      setMessages(
        messages.concat({
          id: nextId.current++,
          name: userName,
          sysMsg: true,
          type: event,
        })
      );
    },
    [messages]
  );

  const getMedia = useCallback(async (cameraID, mikeID) => {
    try {
      console.log(ableVideos.filter((video) => video.label === cameraLable));
      const exCameraID = ableVideos.filter(
        (video) => video.label === cameraLable
      )[0]?.deviceId;
      const exMikeID = ableMikes.filter((mike) => mike.label === mikeLable)[0]
        ?.deviceId;
      console.log(cameraID || true);
      // 자신이 원하는 자신의 스트림정보
      const stream = await navigator.mediaDevices.getUserMedia({
        video: cameraID ? { deviceId: cameraID } : { deviceId: exCameraID },
        audio: mikeID ? { deviceId: mikeID } : { deviceId: exMikeID },
      });

      if (!settings.videoOn) {
        stream
          .getVideoTracks()
          .forEach((track) => (track.enabled = !track.enabled));
      }
      if (!settings.mikeOn) {
        stream
          .getAudioTracks()
          .forEach((track) => (track.enabled = !track.enabled));
      }
      myStream.current = stream;
      console.log(stream.getVideoTracks()[0]);
      setCameraLable(stream.getVideoTracks()[0].label);
      setMikeLable(stream.getAudioTracks()[0].label);
      if (myVideoRef.current) {
        myVideoRef.current.srcObject = stream;
      }

      // 스트림을 peerConnection에 등록
      console.log(peerRef.current.getSenders());
      if (peerRef.current.getSenders().length === 0) {
        console.log("스트림 등록");
        stream.getTracks().forEach((track) => {
          console.log(stream.getTracks());
          if (!peerRef.current) {
            return;
          }
          peerRef.current.addTrack(track, stream);
        });

        videoSender.current = peerRef.current
          .getSenders()
          .find((sender) => sender.track.kind === "video");
        mikeSender.current = peerRef.current
          .getSenders()
          .find((sender) => sender.track.kind === "audio");
      }
      console.log(peerRef.current.getSenders());
      if (videoSender.current) {
        videoSender.current.replaceTrack(stream.getVideoTracks()[0]);
        console.log(stream.getAudioTracks()[0]);
        mikeSender.current.replaceTrack(stream.getAudioTracks()[0]);
      }

      console.log(videoSender.current);
      console.log(mikeSender.current);
      console.log(peerRef.current);

      // iceCandidate 이벤트
      peerRef.current.onicecandidate = (e) => {
        if (e.candidate) {
          if (!socket) {
            console.log("소켓이 없습니다.");
            return;
          }
          console.log("recv candidate");
          socket.emit("ice", e.candidate, roomId, "컴퓨터");
        }
      };

      // 구 addStream 현 track 이벤트
      peerRef.current.ontrack = (e) => {
        console.log("ontrack 이벤트" + e.streams);
        oppStream.current = e.streams[0];
        console.log(oppStream);
        if (remoteVideoRef.current)
          remoteVideoRef.current.srcObject = e.streams[0];
      };
    } catch (e) {
      console.error(e);
    }
  });

  const initialize = useCallback(async () => {
    try {
      if (!initialized.current) {
        initialized.current = true;
        await getMedia();
        socket.emit("join_room", roomId);
      }
    } catch (e) {
      console.log("에러 이벤트");
      console.error(e);
    }
  });
  //webRTC 오퍼 생성
  const createOffer = async () => {
    console.log("create Offer");
    if (!(peerRef.current && socket)) {
      return;
    }
    try {
      const sdp = await peerRef.current.createOffer();
      peerRef.current.setLocalDescription(sdp);
      console.log("sent the offer");
      socket.emit("offer", sdp, roomId);
    } catch (e) {
      console.error(e);
    }
  };
  //webRTC Answer 생성
  const createAnswer = async (sdp) => {
    console.log("createAnswer");
    if (!(peerRef.current && socket)) {
      return;
    }

    try {
      peerRef.current.setRemoteDescription(sdp);
      const answerSdp = await peerRef.current.createAnswer();
      peerRef.current.setLocalDescription(answerSdp);

      console.log("sent the answer");
      socket.emit("answer", answerSdp, roomId);
    } catch (e) {
      console.error(e);
    }
  };
  //소켓 세팅
  useEffect(() => {
    function onConnect() {
      console.log("소켓 연결 성공");
    }
    function onConnectError(err) {
      if (err.message === "auth 프로퍼티에 Authorization 토큰이 없습니다.") {
        console.log("토큰 업데이트 로직");
        let updatedToken = localStorage.getItem("token");

        /*
        updatedToken에 토큰값 불러오는 로직
        */
        socket.auth.Authorization = updatedToken;
        socket.connect();
        return;
      }
      console.log(err);
      alert("연결 오류. 로그인 페이지로 돌아갑니다.");
      navigate("/");
    }
    function onWelcome(userName) {
      console.log("welcome 이벤트");
      addEvent(userName, "welcome");
    }
    function onBye(userName) {
      console.log("bye 이벤트");
      addEvent(userName, "bye");
      setOppConnected(false);
      if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
    }

    function onNewMsg(user, msg) {
      console.log("new_message 이벤트");
      addMessage(user, msg);
    }

    function onChangeSetting(settings) {
      console.log("setting 받음");
      console.log(settings);
      setOppSettings(settings);
    }

    socket.on("changeSettings", onChangeSetting);
    socket.on("connect", onConnect);
    socket.on("connect_error", onConnectError);
    socket.on("welcome", onWelcome);
    socket.on("bye", onBye);
    socket.on("new_message", onNewMsg);

    return () => {
      socket.off("changeSettings", onChangeSetting);
      socket.off("connect", onConnect);
      socket.off("connect_error", onConnectError);
      socket.off("welcome", onWelcome);
      socket.off("bye", onBye);
      socket.off("new_message", onNewMsg);
    };
  }, [addEvent, addMessage]);

  //webRTC 세팅
  useEffect(() => {
    socket.connect();
    setDevices();
    function onGetOffer(sdp) {
      console.log("recieve offer");
      socket.emit("changeSettings", settings);
      createAnswer(sdp);
      setOppConnected(true);
    }

    function onGetAnswer(sdp) {
      try {
        console.log("recieve Answer");
        if (!peerRef.current) {
          return;
        }
        console.log("setRemote 시작");
        peerRef.current.setRemoteDescription(sdp);
      } catch (err) {
        console.error(err);
      }
    }

    function onGetIce(ice) {
      console.log("ice 받음");
      if (!peerRef.current) {
        return;
      }
      console.log("add Ice");
      peerRef.current.addIceCandidate(ice);
    }
    function onNewClient() {
      console.log("새친구 접속");
      setOppConnected(true);
      createOffer();
      socket.emit("changeSettings", settings);
    }
    peerRef.current = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            "stun:stun.l.google.com:19302",
            "stun:stun1.l.google.com:19302",
            "stun:stun2.l.google.com:19302",
            "stun:stun3.l.google.com:19302",
            "stun:stun4.l.google.com:19302",
          ],
        },
      ],
    });
    function onClose() {
      socket.disconnect();
      peerRef.current.close();
    }
    socket.on("getOffer", onGetOffer);
    socket.on("getAnswer", onGetAnswer);
    socket.on("getIce", onGetIce);
    socket.on("newClient", onNewClient);
    window.addEventListener("beforeunload", onClose);
    initialize();

    return () => {
      socket.disconnect();
      socket.off("getOffer", onGetOffer);
      socket.off("getAnswer", onGetAnswer);
      socket.off("getIce", onGetIce);
      socket.off("newClient", onNewClient);
      peerRef.current.close();
      window.removeEventListener("beforeunload", onClose);
    };
  }, []);

  useEffect(() => {
    console.log("setting보내기");
    socket.emit("changeSettings", settings);
  }, [settings]);
  const oppInfo = {
    //상대방이 상담사일때
    name: oppname,
    url: profileimg,
  };
  const oppInfo2 = {
    //상대방이 사용자일때
    name: oppname,
  };
  console.log(decodetoken);
  return (
    <Overlay>
      <VideoCallTemplate>
        <Videos
          myVideoRef={myVideoRef}
          remoteVideoRef={remoteVideoRef}
          settings={settings}
          oppSettings={oppSettings}
          myInfo={decodetoken.type === "users" ? myInfo1 : myInfo2}
          oppInfo={decodetoken.type == "users" ? oppInfo : oppInfo2} //decoding type 이 user 이면 상대방이 상담사 아니면 상대방이 user
          myMic={settings.mikeOn}
          oppMic={true}
          myname={myname}
          cname={oppname}
          uname={myname} // 해당 유저이름
          myStream={myStream}
          oppStream={oppStream}
          oppConnected={oppConnected}
        />
        <SettingBar
          settings={settings}
          setSettings={setSettings}
          cameraLable={cameraLable}
          mikeLable={mikeLable}
          speakerLable={speakerLable}
          setSpeakerLable={setSpeakerLable}
          myVideoRef={myVideoRef}
          remoteVideoRef={remoteVideoRef}
          myStream={myStream}
          ableVideos={ableVideos}
          ableMikes={ableMikes}
          ableSpeakers={ableSpeakers}
          getMedia={getMedia}
          onExit={onExit}
        />
      </VideoCallTemplate>
      <ChatTemplate>
        <ChatLog messages={messages} />
        <TextInput
          sendMessage={sendMessage}
          ioSocket={ioSocket}
          oppConnected={oppConnected}
        />
      </ChatTemplate>
    </Overlay>
  );
}

export default App;
