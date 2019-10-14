if (window.location.origin.includes("service-now")) {
    console.log("*******CONTENT SCRIPT IS RUN********")
    const shadowBreakerScript = document.createElement('script');
    shadowBreakerScript.src = chrome.extension.getURL('shadowBreaker.js');
    (document.head || document.documentElement).prepend(shadowBreakerScript);
    
    const currentLocation = {};
    const previousLocation = {};
    const ctx = { currentLocation, previousLocation }; 
    
    function init() {
        ctx.getDOM = function() {
            const element = document.getElementById("gsft_main");
            
            ctx.previousLocation = ctx.currentLocation; 
            ctx.currentLocation = element.contentWindow.location.pathname;
            return element.contentDocument.defaultView.document;
        }

        ctx.updateDOM = function() {
            //this should be called anytime a function traverses the iframeDOM
            ctx.MAIN = ctx.getDOM()

            ctx.MAIN.addEventListener('keydown', e => {
                window.parent.postMessage({ keyCode: e.keyCode }, window.location.origin);
            })
        }

        ctx.handleCreateNew = function() {
            ctx.updateDOM();
            const button = ctx.MAIN.getElementById("sysverb_new");
            button.click();
        }
        
        ctx.getContextMenuButton = function() {
            const navbar = ctx.MAIN.getElementsByClassName('navbar-header')[0];
            return navbar.children[2];
        }


        ctx.openContextMenu = function() {
            const button = ctx.getContextMenuButton()
            button.click();
        };

        ctx.handleSave = function() {    
            ctx.updateDOM();        
            ctx.openContextMenu()

            //context_1 is only available on the DOM after calling openContextMenu
            let contextMenu = ctx.MAIN.getElementById('context_1');            
            const button = contextMenu.getElementsByClassName('context_item')[0]
            button.click()
        };

        //call updateDOM so that the iframe keylistener is active
        ctx.updateDOM()
    }
    
    window.onload = init;

    window.addEventListener("message", e => {
        //DON'T HANDLE MESSAGES FROM OTHER SOURCES!
        if (e.origin !== window.location.origin) {
            return;
        }
        console.log(e.data.keyCode);
    }, false)

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
                    ctx.handleCreateNew()
                    console.log("Click New")
                    break;
                case 83:
                    ctx.handleSave()
                    console.log("Click Save")
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
        // console.log(e.keyCode);
    });
}