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

function redirect(endUrl) {
  chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
      const tab = tabs[0]
      const urlChunk = tab.url.split(/uri=/)[0];

      const url = urlChunk + endUrl
      chrome.tabs.update(tab.id, { url });
  })

}

/*
old commands through chrome api

chrome.commands.onCommand.addListener(function(command) {
  switch (command) {
    case "redirect_to_sys_user":
      redirect("uri=%2Fsys_user_list.do");
      break;
    case "redirect_to_sys_user_group":
      redirect("uri=%2Fsys_user_group_list.do");
      break;
    case "redirect_to_tables":
      redirect("uri=%2Fsys_db_object_list.do");
      break;
    default:
      break;
  }
});
*/

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.action) {
    case "redirect_to_sys_user":
      redirect("uri=%2Fsys_user_list.do");
      break;
    case "redirect_to_sys_user_group":
      redirect("uri=%2Fsys_user_group_list.do");
      break;
    case "redirect_to_tables":
        redirect("uri=%2Fsys_db_object_list.do");
        break;
    default:
      break;
  }
})
