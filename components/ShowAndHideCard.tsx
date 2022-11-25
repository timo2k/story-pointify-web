interface ShowAndHideCardProps {
  className?: string;
  onHideButtonClicked: Function;
  onShowButtonClicked: Function;
}

const ShowAndHideCard = ({
  className,
  onHideButtonClicked,
  onShowButtonClicked,
}: ShowAndHideCardProps) => {
  return (
    <div
      className={
        className +
        ' overflow-hidden bg-white shadow sm:rounded-lg sm:mx-auto sm:w-full sm:max-w-md'
      }
    >
      <div className=" border-gray-200 px-4 py-5 sm:p-0">
        <div className="flex justify-between px-4 py-4 sm:px-6">
          <button
            type="button"
            className="rounded-md border border-transparent bg-neutral-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2"
            onClick={() => onHideButtonClicked()}
          >
            Schätzung verbergen
          </button>
          <button
            type="button"
            className="rounded-md border border-transparent bg-neutral-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2"
            onClick={() => onShowButtonClicked()}
          >
            Schätzung aufdecken
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowAndHideCard;
