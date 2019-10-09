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
            //this should be called anytime a function redirects the virtualDOM
            ctx.MAIN = ctx.getDOM()
        }

        ctx.handleCreateNew = function() {
            ctx.updateDOM();
            ctx._createNew = ctx.MAIN.getElementById("sysverb_new");
            ctx._createNew.click();
            
        }
        
        ctx.getContextMenuButton = function() {
            ctx._navbar = ctx.MAIN.getElementsByClassName('navbar-header')[0];
            ctx._contextMenu = ctx._navbar.children[2];
        }

        ctx.openContextMenu = function() {
            ctx._contextMenu.click();
        };

        ctx.handleSave = function() {    
            ctx.updateDOM();        
            ctx.getContextMenuButton()
            ctx.openContextMenu()

            //context_1 is only available on the DOM after calling openContextMenu
            let menuOptions = ctx.MAIN.getElementById('context_1');            
            const saveButton = menuOptions.getElementsByClassName('context_item')[0]
            saveButton.click()
        };
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
                    ctx.handleCreateNew()
                    console.log("redirect_to_new")
                    break;
                case 83:
                    ctx.handleSave()
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