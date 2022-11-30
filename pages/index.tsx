import { NextPage } from 'next';
import { useState } from 'react';
import RoomCard from '../components/RoomCard';
import RoomForm from '../components/RoomForm';
import ShowAndHideCard from '../components/ShowAndHideCard';
import UsernameForm from '../components/UsernameForm';
import VoteCard from '../components/VoteCard';
import { Participant } from '../interfaces';
import { getWebSocket, setWebSocket } from '../socket';

const Home: NextPage = () => {
  const [hasUserName, setHasUserName] = useState<boolean>(false);
  const [hasRoomName, setHasRoomName] = useState<boolean>(false);

  const [participants, setParticipants] = useState<any>([]);
  const [roomName, setRoomName] = useState<string>('');
  const [roomData, setRoomData] = useState<any>({});

  function handleSubmitUsername(data: { formValue: string }) {
    setHasUserName(true);
    connectToWebSocket(data.formValue);
  }

  function handleSubmitRoomName(data: { formValue: string }) {
    setHasRoomName(true);
    setRoomName(data.formValue);
    joinRoom(data.formValue);
  }

  function handleVoteButtonClick(value: number) {
    setRoomData((prevRoomData: any) => {
      getWebSocket()?.send(
        JSON.stringify({
          event: 'send-estimation',
          message: String(value),
          target: prevRoomData,
        })
      );
      return prevRoomData;
    });
  }

  function handleHideButtonClick() {
    setRoomData((prevRoomData: any) => {
      getWebSocket()?.send(
        JSON.stringify({
          event: 'toggle-hide-estimations',
          message: 'hide',
          target: prevRoomData,
        })
      );
      return prevRoomData;
    });
  }

  function handleShowButtonClick() {
    setRoomData((prevRoomData: any) => {
      getWebSocket()?.send(
        JSON.stringify({
          event: 'toggle-hide-estimations',
          message: 'show',
          target: prevRoomData,
        })
      );
      return prevRoomData;
    });
  }

  function toggleHideEstimations(msg: any) {
    setRoomData(msg.target);
  }

  function handleParticipantEstimation(msg: any) {
    setParticipants((prevParticipants: any) => {
      prevParticipants.find(
        (participant: any) => participant.id === msg.sender.id
      ).currentVote = msg.sender['current-estimation'];
      return [...prevParticipants];
    });
  }

  function handleUserRoomJoined(msg: any) {
    const participant: Participant = {
      id: msg.sender.id,
      displayName: msg.sender.name,
      role: msg.sender.title,
      imageUrl: '',
      currentVote: msg.sender['current-estimation'],
    };

    setParticipants((prevParticipants: any) => [
      ...prevParticipants,
      participant,
    ]);
  }

  function connectToWebSocket(username: string) {
    const webSocket = new WebSocket(
      `ws://room-data.story-pointify.app/ws?name=${username}`
    );
    webSocket.addEventListener('message', (event) => {
      handleNewMessage(event);
    });
    setWebSocket(webSocket);
    //setWebSocket(webSocket);
  }

  function handleListOnlineClients(msg: any) {
    const participant: Participant = {
      id: msg.sender.id,
      displayName: msg.sender.name,
      role: msg.sender.title,
      imageUrl: '',
      currentVote: msg.sender['current-estimation'],
    };

    setParticipants((prevParticipants: any) => [
      ...prevParticipants,
      participant,
    ]);
  }

  function handleUserJoin(msg: any) {
    const participant: Participant = {
      id: msg.sender.id,
      displayName: msg.sender.name,
      role: msg.sender.title,
      imageUrl: '',
      currentVote: msg.sender['current-estimation'],
    };

    setParticipants((prevParticipants: any) => [
      ...prevParticipants,
      participant,
    ]);
  }

  const handleUserRoomLeft = (msg: any) => {
    setParticipants((prevParticipants: any) => {
      const participantsWithRemovedUser = prevParticipants.filter(
        (el: Participant) => el.displayName != msg.sender.name
      );
      return participantsWithRemovedUser;
    });
  };

  function joinRoom(roomName: string) {
    getWebSocket()?.send(
      JSON.stringify({ event: 'join-room', message: roomName })
    );
  }

  function handleNewMessage(event: any) {
    let data = event.data;
    data = data.split(/\r?\n/);

    for (let i = 0; i < data.length; i++) {
      let msg = JSON.parse(data[i]);
      switch (msg.event) {
        case 'user-join':
          handleUserJoin(msg);
          break;
        case 'user-room-joined':
          handleUserRoomJoined(msg);
          break;
        case 'user-room-left':
          handleUserRoomLeft(msg);
          break;
        case 'list-online-clients':
          handleListOnlineClients(msg);
          break;
        case 'room-joined':
          setRoomData(msg.target);
          break;
        case 'send-estimation':
          handleParticipantEstimation(msg);
          break;
        case 'toggle-hide-estimations':
          toggleHideEstimations(msg);
          break;
        default:
          break;
      }
    }
  }

  if (hasUserName && !hasRoomName) {
    return (
      <>
        <RoomForm onSubmitFormValue={handleSubmitRoomName} />
      </>
    );
  }

  if (hasRoomName && hasUserName) {
    return (
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md mb-4">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-neutral-900">
            Story Pointify
          </h2>
          <p className="mt-2 text-center text-sm text-neutral-600">
            Weiß nicht mehr was ich hier schreiben wollte
          </p>
        </div>
        <ShowAndHideCard
          onHideButtonClicked={handleHideButtonClick}
          onShowButtonClicked={handleShowButtonClick}
        />
        <RoomCard
          hasHiddenEstimations={roomData['has-hidden-estimations']}
          className="mt-4"
          title={roomName}
          participants={participants}
        />
        <VoteCard className="mt-4" onButtonClicked={handleVoteButtonClick} />
      </div>
    );
  }

  return (
    <>
      <UsernameForm onSubmitFormValue={handleSubmitUsername} />
    </>
  );
};

export default Home;
