export async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

type Fn<Args> = (...args: Args[]) => any;

export function executeScript<T, Args = never>(
  func: Fn<Args>,
  args?: Args[]
): Promise<T> {
  return new Promise((resolve) => {
    getCurrentTab().then((tab) => {
      chrome.scripting
        .executeScript({
          target: { tabId: tab.id },
          func,
          args,
        })
        .then((result) => {
          resolve(result[0].result);
        });
    });
  });
}

export async function writeToClipboard(text) {
  await navigator.clipboard.writeText(text);
}

export async function getReviewerData(reviewer: string) {
  return fetch(`https://api.github.com/users/${reviewer}`).then((result) =>
    result.json()
  );
}

export function closePopup() {
  window.close();
}
