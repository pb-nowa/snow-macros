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
                window.parent.postMessage({ 
                    keyCode: e.keyCode, 
                    type: e.type,
                    ctrlKey: e.ctrlKey,
                    shiftKey: e.shiftKey,
                }, window.location.origin);
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
        if (!window.location.pathname.includes("workspace")){
            ctx.updateDOM()
        }
    }
    
    window.onload = init;

    function decodeKeyRes(res) {
        if (res.status) {
            console.log(res.action)
        } else {
            console.log(`Keydown Error ${res.keyCode}`)
        }
    }

    function toggleDarkMode() {
        ctx.updateDOM()
        
        const root = ctx.MAIN.children[0].children[1];
        const queue = Array.from(root.children);
        
        while (queue.length) {
            let node = queue.shift();
            let children = node.children;
            if (node.tagName != "SCRIPT") {
                if (children) {
                    for (let child of children) queue.push(child)
                }
                if (!!node.style.backgroundColor) {
                    node.style.backgroundColor = '#FFFFFF';
                } else {
                    node.style.backgroundColor = '#243447';
                }

                node.style.color = "#87ceeb"
            }
        }
    }

    function handleKeydown(e) {
        if (e.ctrlKey && e.shiftKey) {
            switch (e.keyCode) {
                case 68:
                    //('D') dark mode
                    toggleDarkMode()
                    break;
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
            console.log(e.keyCode)
        }
    }

    document.addEventListener('keydown', e => handleKeydown(e));
  
    window.addEventListener('message', e => {
        const { type } = e.data;
        //DON'T HANDLE MESSAGES FROM OTHER SOURCES!
        if (e.origin !== window.location.origin) {
            return;
        }

        switch (type) {
            case "keydown":
                handleKeydown(e.data)
                break;        
            default:
                break;
        }
    }, false)
}