import { executeScript } from '@popup/helpers';

const getPageMetadata = (): Promise<{
  jiraTicket: string;
  prNumber: string;
  title: string;
}> => {
  return executeScript(() => {
    const getJiraTicket = () => {
      const jiraTicket = document
        ?.querySelector('task-lists')
        ?.querySelector('a').innerText;

      if (!jiraTicket?.match(/^[A-Z]+-\d+$/)) {
        return;
      }

      return jiraTicket;
    };

    const getPRNumber = () => {
      const prNumber = window.location.pathname.split('/').pop();

      if (!prNumber.match(/^\d+$/)) {
        return;
      }

      return prNumber;
    };

    const getTitle = () => {
      const titleNode = document.querySelector<HTMLElement>('.js-issue-title');
      const title = titleNode?.innerText;

      if (!title) {
        return;
      }

      return title;
    };

    return {
      jiraTicket: getJiraTicket(),
      prNumber: getPRNumber(),
      title: getTitle(),
    };
  });
};

export default getPageMetadata;
