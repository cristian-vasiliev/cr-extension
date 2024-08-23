import { useEffect, useState } from 'react';
import GithubReviewers from '@popup/components/GithubReviewers';
import { getCurrentTab } from '@popup/helpers';

const App = () => {
  const [isGithubPRPage, setIsGithubPRPage] = useState(false);

  useEffect(() => {
    getCurrentTab().then((tab) => {
      const isGithubPRPageMatch = tab.url.match(
        /https:\/\/github.com\/crunchyroll\/.*\/pull\/\d+/
      );

      setIsGithubPRPage(Boolean(isGithubPRPageMatch));
    });
  }, []);

  return (
    <div className="h-full flex flex-col justify-between p-8">
      <div className="h-full absolute inset-0 left-auto -z-10">
        <img className="h-full" src="/popup-bg.png" alt="" />
      </div>
      {isGithubPRPage && <GithubReviewers />}
    </div>
  );
};

export default App;
