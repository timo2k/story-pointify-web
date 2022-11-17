let username = '';
let roomName = '';

export const setUsernameState = (username: string) => {
  username = username;
};

export const setRoomNameState = (roomName: string) => {
  roomName = roomName;
};

export const getUserNameState = () => {
  return username;
};

export const getRoomNameState = () => {
  return roomName;
};
