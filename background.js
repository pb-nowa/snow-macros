chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostContains: '.service-now.com'},
      })
    ],
    actions: [new chrome.declarativeContent.ShowPageAction()]
  }]);
});  
});

// chrome.tabs.executeScript(undefined, {
//   code: 'console.log("this script is working")'
// })



chrome.commands.onCommand.addListener(function(command) {
  console.log('Command:', command);
});
