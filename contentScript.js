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

    function decodeKeyRes(res) {
        if (res.status) {
            console.log(res.action)
        } else {
            console.log(`Keydown Error ${res.keyCode}`)
        }
    }

    document.addEventListener('keydown', e => {
        if (e.ctrlKey && e.shiftKey) {
            switch (e.keyCode) {
                case 71:
                    chrome.runtime.sendMessage({ 
                        action: "redirect_to_sys_user_group", 
                        key: "G", 
                        keyCode: 71
                    }, res => decodeKeyRes(res))
                    break;
                case 78:
                    ctx.createNew.click()
                    console.log("redirect_to_new")
                    break;
                case 83:
                    console.log("save")
                    break;
                case 84:
                    chrome.runtime.sendMessage({ 
                        action: "redirect_to_tables", 
                        key: "T",
                        keyCode: 84
                    }, res => decodeKeyRes(res))
                    break;
                case 85:
                    chrome.runtime.sendMessage({
                        action: "redirect_to_sys_user", 
                        key: "U",
                        keyCode: 85 
                    }, res => decodeKeyRes(res))
                    break;
                case 87:
                    chrome.runtime.sendMessage({
                        action:"redirect_to_workspace", 
                        key: "W",
                        keyCode: 87 
                    }, res => decodeKeyRes(res))
                    break;
                default:
                    break;
            }
        }
        console.log(e.keyCode);
    });
}