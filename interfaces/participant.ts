export interface Participant {
  id: string;
  displayName: string;
  role: string;
  imageUrl: string;
  currentVote?: string;
  hasChangedEstimation: boolean;
  isSpectator: boolean;
}
