if (window.location.origin.includes("service-now")) {
    console.log("*******CONTENT SCRIPT IS RUN********")
    const shadowBreakerScript = document.createElement('script');
    shadowBreakerScript.src = chrome.extension.getURL('shadowBreaker.js');
    (document.head ||  document.documentElement).prepend(shadowBreakerScript);



    function init() {
        const mainWindow = document.getElementById("gsft_main");
        // console.log(mainWindow.shadowRoot);
        //main = document.getElementById('gsft_main').contentDocument.defaultView;
        //                                           .contentWindow
    }
    
    window.onload = init;

    document.addEventListener('keydown', e => {
        if (e.ctrlKey && e.shiftKey) {
            switch (e.keyCode) {
                case 71:
                    chrome.runtime.sendMessage({action: "redirect_to_sys_user_group", key: "G"}, res => {
                        console.log("redirect_to_sys_user_group");
                    })
                    break;
                case 78:
                    chrome.runtime.sendMessage({action: "redirect_to_sys_user_list", key: "N"}, res => {
                        console.log("redirect_to_sys_user_list");
                    })
                    break;
                case 84:
                    chrome.runtime.sendMessage({action: "redirect_to_tables", key: "T"}, res => {
                        console.log("redirect_to_tables");
                    })
                    break;
                case 85:
                    chrome.runtime.sendMessage({action: "redirect_to_new", key: "U"}, res => {
                        console.log("redirect_to_new");
                    })
                    break;
                default:
                    break;
            }
        }
        console.log(e.keyCode);
    });
    
       // "%3Fsys_id%3D-1%26sys_is_list%3Dtrue%26sys_target%3D" + name +   "%26sysparm_checked_items%3D%26sysparm_fixed_query%3D%26sysparm_group_sort%3D%26sysparm_list_css%3D%26sysparm_query%3D%26sysparm_referring_url%3D" + name + "_list.do%26sysparm_target%3D%26sysparm_view%3D"
    //   %3Fsys_id%3D-1%26sys_is_list%3Dtrue%26sys_target%3Dsys_user_group%26sysparm_checked_items%3D%26sysparm_fixed_query%3D%26sysparm_group_sort%3D%26sysparm_list_css%3D%26sysparm_query%3D%26sysparm_referring_url%3Dsys_user_group_list.do%26sysparm_target%3D%26sysparm_view%3D
    //ctrlKey
    //shiftKey
}



//cmd: 91
//opt: 18


//C: 67

