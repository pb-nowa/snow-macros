if (window.location.origin.includes("service-now")) {
    console.log("*******CONTENT SCRIPT IS RUN********")
    console.log("DocumentState: " + document.readyState);
    
    function init() {
        const filterNav = document.getElementById("editing-view-port");
        const newBtn = document.getElementById("sysverb_new");
        const mainWindow = document.getElementById("gsft_main")
        console.log(mainWindow);
    }
    
    window.onload = () => {
        console.log("DocumentState: " + document.readyState);
        init();
    }

    document.addEventListener('keydown', e => {
        if (e.ctrlKey && e.shiftKey) {
            switch (e.keyCode) {
                case 85:
                    chrome.runtime.sendMessage({action: "redirect_to_sys_user", key: "U"}, res => {
                        console.log("redirect_to_sys_user");
                    })
                    break;
                default:
                case 71:
                    chrome.runtime.sendMessage({action: "redirect_to_sys_user_group", key: "G"}, res => {
                        console.log("redirect_to_sys_user_group");
                    })
                    break;
                case 84:
                    chrome.runtime.sendMessage({action: "redirect_to_tables", key: "T"}, res => {
                        console.log("redirect_to_tables");
                    })
                    break;
                default:
                    break;
            }
        }
        console.log(e.keyCode);
    });
    


    //ctrlKey
    //shiftKey
}



//cmd: 91
//opt: 18
//ctl: 17
//shift: 16

//C: 67

