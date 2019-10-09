if (window.location.origin.includes("service-now")) {
    console.log("*******CONTENT SCRIPT IS RUN********")
    const shadowBreakerScript = document.createElement('script');
    shadowBreakerScript.src = chrome.extension.getURL('shadowBreaker.js');
    (document.head || document.documentElement).prepend(shadowBreakerScript);

    const ctx = {};    
    
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
    }
    
    window.onload = init;

    document.addEventListener('keydown', e => {
        if (e.ctrlKey && e.shiftKey) {
            switch (e.keyCode) {
                case 71:
                    chrome.runtime.sendMessage({action: "redirect_to_sys_user_group", key: "G"}, res => {
                        if (res.status) {
                            console.log("redirect_to_sys_user_group")
                        } else {
                            console.log("Keydown Error 71")
                        }
                    })
                    break;
                case 78:
                    ctx.createNew.click()
                    console.log("redirect_to_new")
                    break;
                case 83:
                    console.log("save")
                    break;
                case 84:
                    chrome.runtime.sendMessage({action: "redirect_to_tables", key: "T"}, res => {
                        if (res.status) {
                            console.log("redirect_to_tables")
                        } else {
                            console.log("Keydown Error 84")
                        }
                    })
                    break;
                case 85:
                    chrome.runtime.sendMessage({action: "redirect_to_sys_user", key: "U"}, res => {
                        if (res.status) {
                            console.log("redirect_to_sys_user")
                        } else {
                            console.log("Keydown Error 85")
                        }
                    })
                    break;
                case 87:
                    chrome.runtime.sendMessage({action:"redirect_to_workspace", key: "W"}, res => {
                        if (res.status) {
                            console.log("redirect_to_workspace")
                        } else {
                            console.log("Keydown Error 87")
                        }
                    })
                    break;
                default:
                    break;
            }
        }
        console.log(e.keyCode);
    });
}