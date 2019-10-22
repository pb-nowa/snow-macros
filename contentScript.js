if (window.location.origin.includes("service-now")) {
    console.log("*******CONTENT SCRIPT IS RUN********")
    const shadowBreakerScript = document.createElement('script');
    shadowBreakerScript.src = chrome.extension.getURL('shadowBreaker.js');
    (document.head || document.documentElement).prepend(shadowBreakerScript);
    
    const currentLocation = {};
    const previousLocation = {};
    const isStudioEditor = false;
    const isWorkspace = false;

    const ctx = { currentLocation, previousLocation, isStudioEditor, isWorkspace }; 
    
    function init() {
        ctx.getDOM = function() {
            const element = document.getElementById('gsft_main');
            
            if (!element) {
                return null;
            }
            
            ctx.window = element.contentWindow;

            ctx.previousLocation = ctx.currentLocation; 
            ctx.currentLocation = element.contentWindow.location.pathname;
            return element.contentDocument.defaultView.document;
        }

        function isWorkspace() {
            const paths = window.location.pathname.split('/');
            const isWorkspacePath = paths.includes('workspace');
            return isWorkspacePath;
        }

        ctx.updateDOM = function() {
            //this should be called anytime a function traverses the iframeDOM
            ctx.MAIN = ctx.getDOM()
            ctx.isStudioEditor = false;
            ctx.isWorkspace = false;

            if (!ctx.MAIN) {
                if (window.location.pathname == '/$studio.do') ctx.isStudioEditor = true;
                if (isWorkspace()) ctx.isWorkspace = true;
                return;
            }

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
            const button = ctx.MAIN.getElementById('sysverb_new');
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
        if (!window.location.pathname.includes('workspace')){
            ctx.updateDOM()
        }
    }
    
    window.onload = init;




    function toggleDarkMode() {
        //TODO: persist darkMode accross sessions and iframe location changes
        // create a more robust color scheme
        //
        ctx.updateDOM()
        
        const root = ctx.MAIN.children[0].children[1];
        const queue = Array.from(root.children);
        
        while (queue.length) {
            //update git
            let node = queue.shift();
            let children = node.children;
            if (node.tagName != "SCRIPT") {
                if (children.length) for (let child of children) queue.push(child)

                if (!!node.style.backgroundColor) {
                    //this isnt working for some reason!?!?!?
                    node.style.backgroundColor = '#FFFFFF';
                } else {
                    node.style.backgroundColor = '#243447';
                }

                node.style.color = "#87ceeb"
            }
        }
    }

    function getPathType(pathname) {
        //TODO: test this and add cases for more path types
        const pathSegments = pathname.split("_");
       
        for (let seg in pathSegments) {
            switch (seg) {
                case 'list.do': return 'list';
            }
        }
        return 'form'
    }

    function toggleLeftNav() {
        if (!ctx.isStudioEditor) {
            return;
        }

        const appExplorer = document.getElementById('app-explorer-pane');
        const sideButton = appExplorer.children[0].children[0].children[0]
        sideButton.click();
    }

    function decodeKeyRes(res) {
        if (res.status) {
            return;
        } else {
            console.log(`Keydown Error ${res.keyCode}`)
        }
    }

    function handleKeydown(e) {
        if (e.ctrlKey && e.shiftKey) {
            switch (e.keyCode) {
                case 67: 
                    //C: copy all fields
                    break;
                case 68:
                    //D: toggle dark mode
                    toggleDarkMode()
                    break;
                case 69: 
                    //E: Open Editor (studio)
                    chrome.runtime.sendMessage({
                        action: "open_studio",
                        key: "C",
                        keyCode: 69,
                        origin: window.location.origin
                    })
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
                    break;
                case 80:
                    // P: log path
                    console.log(ctx.window.location);
                    break;
                case 83:
                    ctx.handleSave()
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

        if (e.ctrlKey && e.altKey) {
            switch (e.keyCode) {
                case 67:
                    //C: toggle side pannel
                    toggleLeftNav()
                    break;
                default:
                    break;
            }
        }
    }




    document.addEventListener('keydown', e => handleKeydown(e));
  
    window.addEventListener('message', e => {
        const { type } = e.data;
        //DON'T HANDLE MESSAGES FROM OTHER SOURCES!
        if (e.origin != window.location.origin) {
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