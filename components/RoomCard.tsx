import Image from 'next/image';
import { Participant } from '../interfaces';

interface RoomCardProps {
  className?: string;
  title: string;
  hasHiddenEstimations: boolean;
  participants: Participant[];
}

const RoomCard = ({
  className,
  title,
  participants,
  hasHiddenEstimations,
}: RoomCardProps) => {
  return (
    <div
      className={
        className +
        ' overflow-hidden bg-white shadow sm:rounded-lg sm:mx-auto sm:w-full sm:max-w-md'
      }
    >
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">{title}</h3>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <div className="px-4 py-4 sm:px-6">
          <ol className="mt-4 space-y-1 text-sm leading-6 text-neutral-500">
            {participants.map((participant, index) => (
              <div key={index} className="flex justify-between items-center">
                <li className="group flex items-center space-x-4 rounded-xl">
                  <Image
                    src={participant.imageUrl}
                    width={40}
                    height={40}
                    alt="dino avatar"
                    className="h-10 w-10 flex-none rounded-full"
                  />
                  <div className="flex-auto">
                    <p className="text-gray-900">{participant.displayName}</p>
                    <p className="mt-0.5">{participant.role}</p>
                  </div>
                </li>
                <span
                  className={
                    participant.hasChangedEstimation
                      ? 'bg-green-200 ' +
                        ' inline-flex items-center rounded-full px-3 py-0.5 text-sm font-medium text-gray-800'
                      : 'bg-gray-100' +
                        ' inline-flex items-center rounded-full px-3 py-0.5 text-sm font-medium text-gray-800'
                  }
                >
                  {hasHiddenEstimations ? '???' : participant.currentVote}
                </span>
              </div>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
