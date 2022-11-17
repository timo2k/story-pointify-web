interface VoteCardProps {
  className?: string;
  onButtonClicked: Function;
}

const VoteCard = ({ className, onButtonClicked }: VoteCardProps) => {
  const voteButtons = [
    { value: '0' },
    { value: '1' },
    { value: '2' },
    { value: '3' },
    { value: '5' },
    { value: '8' },
    { value: '13' },
    { value: '20' },
    { value: '40' },
    { value: '100' },
  ];

  return (
    <div
      className={
        className +
        ' overflow-hidden bg-white shadow sm:rounded-lg sm:mx-auto sm:w-full sm:max-w-md'
      }
    >
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-neutral-900">
          Wähle deine Zahl!
        </h3>
      </div>

      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <div className="px-4 py-4 sm:px-6">
          <div className="grid grid-cols-5 gap-4">
            {voteButtons.map((voteButton, index) => (
              <button
                key={index}
                type="button"
                className="inline-flex items-center justify-center rounded-full w-16 h-16 border border-transparent bg-neutral-600 p-3 text-white shadow-sm hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2"
                onClick={() => onButtonClicked(voteButton.value)}
              >
                {voteButton.value}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoteCard;
