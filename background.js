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

function redirectToList() {
  chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
    const tab = tabs[0]

    //TODO fix 'name' split so that it grabs the table name from the url
    const name = tab.url.split(/uri=/)[0];
    const urlChunk = tab.url.split(/uri=/)[0];
    const  url = urlChunk + "uri=%2F"+name+".do%3Fsys_id%3D-1%26sys_is_list%3Dtrue%26sys_target%3D"+name+"%26sysparm_checked_items%3D%26sysparm_fixed_query%3D%26sysparm_group_sort%3D%26sysparm_list_css%3D%26sysparm_query%3D%26sysparm_referring_url%3D"+name+"_list.do%26sysparm_target%3D%26sysparm_view%3D";
    
    chrome.tabs.update(tab.id, { url });
  })
}

function redirectToWorkspace() {
  chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
    const tab = tabs[0]

    const urlChunk = tab.url.split(/.com/)[0];
    const  url = urlChunk + ".com/workspace";
    
    chrome.tabs.create({ url });
  })
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const { action, keyCode, origin } = request; 

  switch (action) {
    case "popup":
      console.log("this sent from the popup")
      break;
    case "open_studio":
      const url = origin + "/$studio.do?sysparm_transaction_scope=global&sysparm_nostack=true";
      chrome.tabs.create({ url })
      sendResponse({ action, keyCode, status: true })
      break;

    case "redirect_to_sys_user":
      redirect("uri=%2Fsys_user_list.do")
      sendResponse({ action, keyCode, status: true })
      break;

    case "redirect_to_sys_user_group":
      redirect("uri=%2Fsys_user_group_list.do");
      sendResponse({ action, keyCode, status: true })
      break;
       
    case "redirect_to_tables":
      redirect("uri=%2Fsys_db_object_list.do");
      sendResponse({ action, keyCode, status: true })
      break;

    case "redirect_to_new":
      redirectToNew();
      sendResponse({ action, keyCode, status: true })
      break;

    case "redirect_to_workspace":
      redirectToWorkspace();
      sendResponse({ action, keyCode, status: true })
      break;

    default:
        sendResponse({ action, keyCode, status: false })
      break;
  }
})