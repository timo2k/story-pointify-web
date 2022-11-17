import { NextPage } from 'next';
import { ParseOptions } from 'querystring';
import { useState } from 'react';
import RoomCard from '../components/RoomCard';
import UsernameAndRoomForm from '../components/UsernameAndRoomForm';
import VoteCard from '../components/VoteCard';
import { Participant } from '../interfaces';
import {
  getRoomNameState,
  getUserNameState,
  setRoomNameState,
  setUsernameState,
} from '../states';

const Home: NextPage = () => {
  const [webSocket, setWebSocket] = useState<null | WebSocket>(null);
  const [hasUserName, setHasUserName] = useState<boolean>(false);
  const [hasRoomName, setHasRoomName] = useState<boolean>(false);

  const [participants, setParticipants] = useState<any>([]);
  const [rooms, setRooms] = useState<any>([]);

  // useEffect(() => {
  //   return () => {
  //     connectToWebSocket('TRI');
  //   };
  // }, []);

  function handleSubmitUsername(data: { username: string }) {
    setHasUserName(true);
    setUsernameState(data.username);
    connectToWebSocket(data.username);
  }

  function handleSubmitRoomName(data: { username: string }, username: string) {
    setHasRoomName(true);
    setRoomNameState(data.username);
    joinRoom(data.username);
  }

  function handleVoteButtonClick(value: number) {
    console.log('voted value', value);
  }

  function handleRoomJoined(msg: any) {
    const participants: Participant[] = [];
    setParticipants(participants);
  }

  function connectToWebSocket(username: string) {
    const webSocket = new WebSocket(`ws://localhost:1337/ws?name=${username}`);
    webSocket.addEventListener('open', (event) => {
      console.log('Successfully connected', event);
    });
    webSocket.addEventListener('message', (event) => {
      handleNewMessage(event);
    });
    setWebSocket(webSocket);
  }

  function handleListOnlineClients(msg: any) {
    console.log(msg);
    const participant: Participant = {
      displayName: msg.sender.name,
      role: 'Random',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80',
      currentVote: '0',
    };

    setParticipants((prevParticipants: any) => [
      ...prevParticipants,
      participant,
    ]);
  }

  function handleUserJoin(msg: any) {
    const participant: Participant = {
      displayName: msg.sender.name,
      role: 'Random',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80',
      currentVote: '0',
    };

    setParticipants((prevParticipants: any) => [
      ...prevParticipants,
      participant,
    ]);
  }

  function joinRoom(roomName: string) {
    webSocket?.send(JSON.stringify({ event: 'join-room', message: roomName }));
  }

  // OnSendEstimation    = "send-estimation"
  // OnResetEstimations  = "reset-estimations"
  // OnHideEstimations   = "hide-estimations"
  // OnRevealEstimations = "reveal-estimations"
  // OnSendMessage       = "send-message"
  // OnJoinRoom          = "join-room"
  // OnLeaveRoom         = "leave-room"
  // OnUserJoined        = "user-join"
  // OnUserLeft          = "user-left"
  // OnRoomJoined        = "room-joined"

  function handleNewMessage(event: any) {
    console.log(event);
    let data = event.data;
    data = data.split(/\r?\n/);

    for (let i = 0; i < data.length; i++) {
      let msg = JSON.parse(data[i]);
      console.log(msg);
      switch (msg.event) {
        case 'send-message':
          //console.log(msg);
          break;
        case 'user-join':
          handleUserJoin(msg);
          break;
        case 'user-left':
          //console.log(msg);
          break;
        case 'room-joined':
          handleRoomJoined(msg);
          break;
        case 'list-online-clients':
          handleListOnlineClients(msg);
        default:
          break;
      }
    }
  }

  if (hasUserName && !hasRoomName) {
    return (
      <>
        <UsernameAndRoomForm
          onSubmitUsername={handleSubmitRoomName}
          showCheckbox={true}
          label="Gib Raumname"
          description="Wenn der gesuchte Raum nicht existiert, wird ein neuer angelegt!"
        />
      </>
    );
  }

  if (hasRoomName && hasUserName) {
    return (
      <>
        <RoomCard title={'Placeholder'} participants={participants} />
        <VoteCard className="mt-4" onButtonClicked={handleVoteButtonClick} />
      </>
    );
  }

  return (
    <>
      <UsernameAndRoomForm
        onSubmitUsername={handleSubmitUsername}
        showCheckbox={true}
        label="Anzeigename"
        description="Der Nutzername ist nur temporär für eine Session gültig"
      />
    </>
  );
};

export default Home;
