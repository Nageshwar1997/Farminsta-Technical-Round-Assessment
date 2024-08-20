const LoadingHome = () => {
  const creators = Array(10).fill({});
  const socialMediaLinks = Array(3).fill({});
  const specializations = Array(2).fill({});
  const texts = Array(3).fill({});

  return (
    <div className="w-full h-full max-h-screen px-4 sm:px-6 md:px-8 lg:px-10 overflow-y-auto scrollbar-none">
      <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-5">
        {creators?.map((_, index) => (
          <div
            key={index}
            className="w-full h-full grid items-center p-4 sm:p-5 md:p-6 shadow-lg rounded-lg bg-slate-100 dark:bg-gray-800 transition-transform transform hover:scale-105 hover:shadow-xl duration-300 ease-in-out animate-pulse"
          >
            <div className="w-full h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden rounded-t-lg bg-gray-300 dark:bg-gray-600">
              <div className="w-[calc(full-4)] h-[calc(100%-32px)] m-4 bg-gray-200 dark:bg-gray-500"></div>
            </div>
            <div className="w-full h-auto p-4 flex flex-col gap-3 bg-white dark:bg-gray-900 rounded-b-lg shadow-inner">
              {texts.map((_, i) => (
                <p
                  key={i}
                  className=" p-4 bg-gray-300 dark:bg-gray-600 rounded-md animate-pulse"
                ></p>
              ))}
              <div className="p-4 transition-colors duration-300 mt-1 bg-gray-300 dark:bg-gray-600 rounded-md animate-pulse"></div>

              <div className="w-full p-4 flex flex-wrap items-center gap-2 mt-1 py-1 bg-gray-200 dark:bg-gray-700 px-2 rounded-md">
                {specializations.map((_, index) => (
                  <p
                    key={index}
                    className="p-4 rounded-md w-1/3 bg-blue-200 dark:bg-blue-600 animate-pulse"
                  ></p>
                ))}
              </div>
              <div className="w-full flex flex-wrap items-center justify-around gap-3 mt-2 py-1 bg-gray-200 dark:bg-gray-700 px-2 rounded-md">
                {socialMediaLinks.map((_, index) => (
                  <div
                    key={index}
                    className="bg-slate-300 dark:bg-gray-800 p-2 sm:p-4 md:p-6 rounded-full transition-colors duration-300 animate-pulse"
                  ></div>
                ))}
              </div>
              <div className="w-full mt-2"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingHome;
