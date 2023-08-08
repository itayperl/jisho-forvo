async function fetch_forvo(word)
{
    let resp = await fetch('https://forvo.com/search/' + word + '/ja');
    return await resp.text();
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  fetch_forvo(message.word).then(sendResponse);
  return true;
});
