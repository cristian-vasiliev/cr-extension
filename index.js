import {MetadataReader} from './lib/MetadataReader';
import {CommitMessageTemplate} from './lib/CommitMessageTemplate';
import {PageController} from './lib/PageController';
import config from './config';

chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.getSelected(null, function (tab) {
    const controller = new PageController(chrome.tabs, tab.id);
    const reader = new MetadataReader(controller);

    reader.collect({
      reviewers: {
        strategy: 'dom-query',
        selector: '.js-issue-sidebar-form .css-truncate',
        mapper: function (element) {
          return Array.from(element.children)
            .filter(reviewerParagraph => Boolean(reviewerParagraph.querySelector('.octicon-check')))
            .map(reviewerParagraph => reviewerParagraph.innerText.trim());
        }
      },
      jiraTicket: {
        strategy: 'dom-query',
        selector: 'a[href*="atlassian.net/"]',
        mapper: e => e.innerHTML.trim(),
      },
      prNumber: {
        strategy: 'js-eval',
        code: 'document.location.pathname.split("/").pop()',
      },
      mergeTitle: {
        strategy: 'dom-query',
        selector: '#merge_title_field',
        mapper: e => e.value,
      }
    }).then(data => {
      data.reviewers = data.reviewers.map(reviewer => {
        return config.users[reviewer] || reviewer.toLowerCase();
      }).join(', ');

      const commitMessage = new CommitMessageTemplate().render(data);

      return Promise.all([
        controller.updateInputValue('#merge_message_field', commitMessage),
        controller.updateInputValue('#merge_title_field', data.mergeTitle.replace(/\s*\(#\d+\)\s*$/, '')),
      ]);
    });
  });
});
