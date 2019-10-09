if (window.location.origin.includes("service-now")) {
    console.log("*******CONTENT SCRIPT IS RUN********")
    const shadowBreakerScript = document.createElement('script');
    shadowBreakerScript.src = chrome.extension.getURL('shadowBreaker.js');
    (document.head ||  document.documentElement).prepend(shadowBreakerScript);

    const ctx = {};

    // const rightClick = new Event();
    
    
    function init() {
        ctx.MAIN = document.getElementById("gsft_main").contentDocument.defaultView.document;
        ctx.createNew = ctx.MAIN.getElementById("sysverb_new");
        const submit = ctx.MAIN.getElementById("sysverb_insert");
        console.log(submit);
        //main = document.getElementById('gsft_main').contentDocument.defaultView;
        //                                           .contentWindow
        ctx.MAIN.addEventListener('click', e => {
            console.log(e)
        });

        // const button = document.getElementById('gsft_main').contentDocument.defaultView.document.getElementById("sysverb_insert")
        //const c_1 = GSFT_MAIN.getElementById('context_1');
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
                    // chrome.runtime.sendMessage({action: "redirect_to_new", key: "N"}, res => {
                    //     console.log("redirect_to_new");
                    // })
                    ctx.createNew.click();
                    console.log("redirect_to_new")
                    break;
                case 83:
                    //gsftSubmit(gel('sysverb_update_and_stay')).call(GSFT_MAIN);
                    console.log("save");
                    break;
                case 84:
                    chrome.runtime.sendMessage({action: "redirect_to_tables", key: "T"}, res => {
                        console.log("redirect_to_tables");
                    })
                    break;
                case 85:
                    chrome.runtime.sendMessage({action: "redirect_to_sys_user", key: "U"}, res => {
                        console.log("redirect_to_sys_user");
                    })
                    break;
                case 87:
                    chrome.runtime.sendMessage({action:"redirect_to_workspace", key: "W"}, res => {
                        console.log("redirect_to_workspace");
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

