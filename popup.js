'use strict'

const root = document.getElementById('root');
const search = document.getElementById('search');
const keyContainer = document.getElementById("keybindings-container");

const MACROS = {
    do_new: {  
        id: "do_new",
        value: "Create New:",
        command: "cntl+shift+N"
    },
    do_save: {
        id: "do_save",
        value: "Save:",
        command: "cntl+shift+S"
    },
    dir_groups: {
        id: "dir_groups",
        value: "Redirect to Groups Table:",
        command: "cntl+shift+G"
    },
    dir_tables: {
        id: "dir_tables",
        value: "Redirect to sys_tables Table:",
        command: "cntl+shift+T"
    },
    dir_users: {
        id: "dir_users",
        value: "Redirect to Users Table:",
        command: "cntl+shift+U"
    },
    open_workspace: {
        id: "open_workspace",
        value: "Open Workspace:",
        command: "cntl+shift+W"
    },
    open_studio: {
        id: "open_studio",
        value: "Open Studio(Editor):",
        command: "cntl+shift+E"
    }
}

const MACRO_LIST = Object.values(MACROS);

Object.freeze(MACROS)
Object.freeze(MACRO_LIST)





const state = {};

function populate(list) {
    depopulate()

    for (let item of list) {
        const { id, value, command } = item;

        const listElement = document.createElement("LI");
        
        const name = document.createElement("DIV");
        name.className = "keybinding-label";
        name.textContent = value;

        const keyBinding = document.createElement("DIV");
        keyBinding.className = "keybinding";
        keyBinding.textContent = command;
        
        listElement.id = id;
        listElement.className = "keybinding-item";
        listElement.appendChild(name)
        listElement.appendChild(keyBinding)
        
        keyContainer.appendChild(listElement)
    }
}

populate(MACRO_LIST)

function depopulate() {
    let containerHasChildren = keyContainer.children.length - 1;

    while (containerHasChildren) {
        let listElement = keyContainer.children[1]
        keyContainer.removeChild(listElement);

        containerHasChildren--;
    }
}

function searchFilter(str) {
    const macros = MACRO_LIST;    
    
    let macroState = macros.filter(macro => {
        const isSubstring = macro.value.toLowerCase().includes(str);
        return isSubstring;
    });
    
    return macroState
}


search.addEventListener('input', ({ target }) => {
    const filteredList = searchFilter(target.value);
    populate(filteredList)
})

//sender  #id, #tab, #url