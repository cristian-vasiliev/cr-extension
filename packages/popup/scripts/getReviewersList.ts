import { executeScript } from '@popup/helpers';

const getReviewersList = () => {
  return executeScript(() => {
    const element = document.querySelector(
      '.js-issue-sidebar-form .css-truncate'
    );
    return Array.from(element.children)
      .filter((reviewerParagraph) =>
        Boolean(reviewerParagraph.querySelector('.octicon-check'))
      )
      .map((reviewerParagraph) => {
        const reviewerNode = reviewerParagraph.querySelector<HTMLElement>(
          '[data-assignee-name]'
        );

        return reviewerNode.innerText;
      });
  });
};

export default getReviewersList;
