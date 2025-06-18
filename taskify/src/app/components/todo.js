export default function blue_todo() {
  return (
    <div className="w-64 border px-2 py-4 border-gray-200 border-t-4 border-t-blue-500 rounded-lg shadow-1 bg-gray-50">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between mb-5">
          <p className="font-semibold">To Do (2)</p>
          <div className="text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
            </svg>
          </div>
        </div>

        <Innerbox
          heading="Research competitors"
          P="P1"
          text="Analyze top 5 competitors in the market"
          color="red"
        />
        <Innerbox
          heading="Design homepage mockup"
          P="P2"
          text="Create wireframes for the new homepage"
          color="yellow"
        />
      </div>
    </div>
  );
}

function Innerbox({ heading, P, text, color }) {
  return (
    <div className="border border-gray-300 p-3 rounded-lg shadow-1 bg-white">
      <div className="w-full grid grid-cols-20 mb-2">
        <p className="col-span-15 font-bold">{heading}</p>
        <p className={`col-span-3 font-bold text-${color}-700 w-7 h-7 text-sm bg-${color}-300 flex justify-center items-center rounded-full`}>
          {P}
        </p>
        <div className="col-span-2 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>
        </div>
      </div>

      <p className="text-gray-600 mb-5">{text}</p>
      <div className="flex justify-between">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-3">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-3">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
      </div>
    </div>
  );
}
