import { executeScript } from '@popup/helpers';

const updatePRMessage = (title: string, template: string) => {
  return executeScript(
    (template, title) => {
      const element = document.querySelector<HTMLTextAreaElement>(
        '#merge_message_field'
      );
      const titleElement =
        document.querySelector<HTMLInputElement>('#merge_title_field');

      titleElement.value = title;
      element.value = template;
    },
    [template, title]
  );
};

export default updatePRMessage;
