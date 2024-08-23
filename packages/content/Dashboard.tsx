import Header from '@content/Header';

const Dashboard = () => {
  const iconUrl = chrome.runtime.getURL('hime.png');
  const bgUrl = chrome.runtime.getURL('bg.png');

  return (
    <div className="h-screen flex flex-col">
      <Header />

      {/* <div className="absolute inset-0 -z-10"> */}
      {/*   <img src={bgUrl} className="w-full h-full object-cover" alt="" /> */}
      {/* </div> */}

      <div className="h-full px-6 py-4 flex flex-col gap-24 justify-center items-center text-gray-900">
        <div className="flex flex-col text-center items-center gap-8">
          <img className="w-96 rounded-full" src={iconUrl} alt="" />
          <h1 className="text font-bold text-4xl leading-normal">
            Welcome to the Community
            <br />
            Support CRTools!
          </h1>
        </div>
        <div className="flex flex-col text-center items-center gap-4 text-gray-400">
          <small className="text-sm">
            Powered by
            <br />
            <span className="font-bold">Growth Team</span>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
