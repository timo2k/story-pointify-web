import { Participant } from '../interfaces';

interface RoomCardProps {
  className?: string;
  title: string;
  participants: Participant[];
}

const RoomCard = ({ className, title, participants }: RoomCardProps) => {
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
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                    alt=""
                    className="h-10 w-10 flex-none rounded-full"
                  />
                  <div className="flex-auto">
                    <p className="text-gray-900">{participant.displayName}</p>
                    <p className="mt-0.5">{participant.role}</p>
                  </div>
                </li>
                <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-0.5 text-sm font-medium text-gray-800">
                  {participant.currentVote || '???'}
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
