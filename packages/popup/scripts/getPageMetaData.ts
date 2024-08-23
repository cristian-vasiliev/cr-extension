import { executeScript } from '@popup/helpers';
import { z, ZodError } from 'zod';

const metaData = z.object({
  jiraTicket: z.string().regex(/^[A-Z]+-\d+$/),
  prNumber: z.string().regex(/^\d+$/),
  title: z.string(),
});

const getPageMetadata = async () => {
  const result = await executeScript<{
    jiraTicket?: string;
    prNumber?: string;
    title?: string;
  }>(() => {
    const getJiraTicket = () => {
      const jiraTicketNode = document
        .querySelector<HTMLElement>('task-lists')
        ?.querySelector('a');

      return jiraTicketNode?.innerText;
    };

    const getPRNumber = () => {
      return window.location.pathname.split('/').pop();
    };

    const getTitle = () => {
      const titleNode = document.querySelector<HTMLElement>('.js-issue-title');
      return titleNode?.innerText;
    };

    return {
      jiraTicket: getJiraTicket(),
      prNumber: getPRNumber(),
      title: getTitle(),
    };
  });

  const parsedResult = metaData.safeParse(result);

  if (!parsedResult.success) {
    const error = parsedResult.error.issues[0];
    const formattedError = `${error.message}: ${error.path.join()}`;

    throw new Error(formattedError);
  }

  return parsedResult.data;
};

export default getPageMetadata;
