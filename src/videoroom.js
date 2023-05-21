import { useLocation } from "react-router-dom"; /*
import { useState, useRef, useCallback, useEffect } from "react";
import { io } from "socket.io-client";
import ChatTemplate from "./components/ChatTemplate";
import ChatLog from "./components/ChatLog";
import TextInput from "./components/TextInput";
import Overlay from "./components/Overlay";
import VideoCallTemplate from "./components/VideoCallTemplate";
import SettingBar from "./components/SettingBar";
import Videos from "./components/Videos";

*/

function Videoroom() {
  const location = useLocation();
  const state = location.state;
  const id = state.id;
  const name = state.name;
  const token = state.token;
  console.log(name);
  console.log(id);
  console.log(token);
  const accessToken = token;
  const myname = name;
  const roomId = id;

  //const socket = io("https://dowajo.run.goorm.site", {
  //  auth: {
  //   Authorization: accessToken,
  // },
  //});

  return (
    <div>
      예약번호:{id} 토큰:{accessToken}
      // roomId= {roomId}
    </div>
  );
  /*const [messages, setMessages] = useState([]);

  const [settings, setSettings] = useState({
    mikeOn: true,
    videoOn: true,
    speakerOn: true,
  });

  const nextId = useRef(4);
  const myVideoRef = useRef();
  const remoteVideoRef = useRef();
  const peerRef = useRef();
  const sender = useRef();

  //세팅바 변경 이벤트
  const changeSettings = useCallback(
    (e) => {
      console.log(e);
      setSettings({ ...settings, [e]: !settings[e] });
    },
    [settings]
  );

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

  const getMedia = async () => {
    try {
      // 자신이 원하는 자신의 스트림정보
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (myVideoRef.current) {
        myVideoRef.current.srcObject = stream;
      }

      // 스트림을 peerConnection에 등록
      stream.getTracks().forEach((track) => {
        if (!peerRef.current) {
          return;
        }
        sender.current = peerRef.current.addTrack(track, stream);
      });

      // iceCandidate 이벤트
      peerRef.current.onicecandidate = (e) => {
        if (e.candidate) {
          if (!socket) {
            return;
          }
          console.log("recv candidate");
          socket.emit("ice", e.candidate, roomId, "컴퓨터");
        }
      };

      // 구 addStream 현 track 이벤트
      peerRef.current.ontrack = (e) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = e.streams[0];
        }
      };
    } catch (e) {
      console.error(e);
    }
  };
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
      socket.emit("join_room", roomId);
    }
    function onConnectError(err) {
      console.log(err);
      alert("연결 오류. 로그인 페이지로 돌아갑니다.");
    }
    function onWelcome(userName) {
      console.log("welcome 이벤트");
      addEvent(userName, "welcome");
    }
    function onBye(userName) {
      console.log("bye 이벤트");
      addEvent(userName, "bye");
      remoteVideoRef.current.srcObject = null;
    }

    function onNewMsg(user, msg) {
      console.log("new_message 이벤트");
      addMessage(user, msg);
    }
    socket.on("connect", onConnect);
    socket.on("connect_error", onConnectError);
    socket.on("welcome", onWelcome);
    socket.on("bye", onBye);
    socket.on("new_message", onNewMsg);

    return () => {
      socket.off("connect", onConnect);
      socket.off("connect_error", onConnectError);
      socket.off("welcome", onWelcome);
      socket.off("bye", onBye);
      socket.off("new_message", onNewMsg);
    };
  }, [addEvent, addMessage]);

  //webRTC 세팅
  useEffect(() => {
    function onGetOffer(sdp) {
      console.log("recieve offer");
      createAnswer(sdp);
    }

    function onGetAnswer(sdp) {
      console.log("recieve Answer");
      if (!peerRef.current) {
        return;
      }
      console.log("setRemote 시작");
      peerRef.current.setRemoteDescription(sdp);
    }

    async function onGetIce(ice) {
      console.log("ice 받음");
      if (!peerRef.current) {
        return;
      }
      console.log("add Ice");
      peerRef.current.addIceCandidate(ice);
    }
    function onNewClient() {
      console.log("새친구 접속");
      createOffer();
    }
    peerRef.current = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    });

    getMedia();
    socket.on("getOffer", onGetOffer);
    socket.on("getAnswer", onGetAnswer);
    socket.on("getIce", onGetIce);
    socket.on("newClient", onNewClient);
    return () => {
      socket.off("getOffer", onGetOffer);
      socket.off("getAnswer", onGetAnswer);
      socket.off("getIce", onGetIce);
      socket.off("newClient", onNewClient);
      peerRef.current.close();
    };
  }, []);

  return (
    <Overlay>
      <VideoCallTemplate>
        <Videos
          myVideoRef={myVideoRef}
          remoteVideoRef={remoteVideoRef}
          myMic={settings.mikeOn}
          oppMic={true}
        />
        <SettingBar settings={settings} changeSettings={changeSettings} />
      </VideoCallTemplate>
      <ChatTemplate>
        <ChatLog messages={messages} />
        <TextInput sendMessage={sendMessage} />
      </ChatTemplate>
    </Overlay>
  );*/
}

export default Videoroom;
