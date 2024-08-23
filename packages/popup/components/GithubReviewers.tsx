import { closePopup, getReviewerData, writeToClipboard } from '@popup/helpers';
import getPageMetadata from '@popup/scripts/getPageMetaData';
import getReviewersList from '@popup/scripts/getReviewersList';
import updatePRMessage from '@popup/scripts/updatePRMessage';
import { Fragment, useEffect, useState } from 'react';

const GithubReviewers = () => {
  const [state, setState] = useState<string[]>();
  const [error, setError] = useState<string>();

  const handleError = (error: Error) => {
    setError(error.message);
  };

  const formatReviewer = (reviewer) => {
    return reviewer.replace(/[ -]/g, '.').toLowerCase();
  };

  async function getPRMessage() {
    const { jiraTicket, prNumber, title } = await getPageMetadata();

    // TODO: Add validation
    if (!jiraTicket) {
      setError('Jira ticket not found');
    }
    if (!prNumber) {
      setError('PR number not found');
    }
    if (!title) {
      setError('Title not found');
    }

    const reviewers = state.map(formatReviewer).join(', ');
    const template = `Jira: ${jiraTicket}\nReviewers: ${reviewers}\nPR: GH-${prNumber}`;

    return { title, template };
  }

  async function handleUpdateClick() {
    const { title, template } = await getPRMessage();

    updatePRMessage(title, template).catch(handleError);
  }

  async function copyToClipboard() {
    try {
      const { template } = await getPRMessage();

      await writeToClipboard(template);

      closePopup();
    } catch (error) {
      handleError(error);
    }
  }

  useEffect(() => {
    getReviewersList()
      .then((reviewers: string[]) => {
        Promise.all(reviewers.map(getReviewerData)).then((results) => {
          const reviewers = results.map(
            (reviewer) => reviewer.name || reviewer.login
          );
          setState(reviewers);
        });
      })
      .catch(handleError);
  }, []);

  return (
    <Fragment>
      <div className="flex gap-4 flex-col w-4/6">
        {/* <h1 className="text text-lg font-bold">Crunchyroll IT Helper</h1> */}

        <h2 className="text text-lg font-bold mb-2">Reviewers</h2>
        <ul className="space-y-0.5 max-w-md list-disc list-inside text-gray-700">
          {state?.map((reviewer) => (
            <li key={reviewer}>
              {reviewer} ({formatReviewer(reviewer)})
            </li>
          ))}
        </ul>
      </div>

      {/* <label className="flex items-center"> */}
      {/*   <input type="checkbox" defaultChecked className="mr-2" /> */}
      {/*   <span className="text-gray-500 dark:text-gray-400"> */}
      {/*     Move ticket in <b className="text-orange-500">Dev Complete</b> */}
      {/*   </span> */}
      {/* </label> */}

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="flex gap-2 mt-4">
        <button
          className="bg-gradient-to-br from-orange-500 to-orange-600 w-28 font-bold py-2 px-4 rounded hover:opacity-90 text-white"
          onClick={handleUpdateClick}
        >
          Update
        </button>
        <button
          onClick={copyToClipboard}
          className="py-2 px-3 rounded hover:bg-gray-100 border border-gray-200 font-bold flex items-center justify-center gap-1"
        >
          <svg
            className="text-lg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="1em"
          >
            <path
              fill="currentColor"
              d="M5.75 21.3q-.75 0-1.275-.525-.525-.525-.525-1.275V6.8h1.5v12.7q0 .125.087.212.088.088.213.088h9.7v1.5Zm3.5-3.5q-.75 0-1.275-.525Q7.45 16.75 7.45 16V4.625q0-.775.525-1.3T9.25 2.8h8.375q.775 0 1.3.525t.525 1.3V16q0 .75-.525 1.275-.525.525-1.3.525Zm0-1.5h8.375q.125 0 .225-.088.1-.087.1-.212V4.625q0-.125-.1-.225t-.225-.1H9.25q-.125 0-.212.1-.088.1-.088.225V16q0 .125.088.212.087.088.212.088Zm-.3 0v-12V16.3Z"
            />
          </svg>
        </button>
      </div>
    </Fragment>
  );
};

export default GithubReviewers;
