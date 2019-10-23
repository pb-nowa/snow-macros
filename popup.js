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
        value: "Rediret to Users Table:",
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

Object.freeze(MACROS)




const state = {};
state.current = Object.values(MACROS);
state.previous = [];

function populate(list, prevState) {
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

populate(state.current, state.previous)

function depopulate(list) {
    const ids = list.map(macro => macro.id);

    for (let listElement of keyContainer.children) {
        if (ids.includes(listElement.id)) {
            keyContainer.removeChild(listElement);
        }
    }
}

function searchFilter(str) {
    const macros = Object.values(MACROS);    
    
    let macroState = macros.filter(macro => {
        const isSubstring = macro.value.toLowerCase().includes(str);
        return isSubstring;
    });
    
    return macroState;
}

function toBeDeleted(str) {
    const macros = Object.values(MACROS);

    let macroState = macros.filter(macro => {
        const isNotSubstring = !macro.value.toLowerCase().includes(str);
        return isNotSubstring;
    });

    return macroState;
}

search.addEventListener('input', e => {
    state.previous = Array.from(state.current);
    state.current = searchFilter(e.target.value);
    const deleteList = toBeDeleted(e.target.value);

    depopulate(deleteList);
    // populate(state.current, state.previous)
})

//sender  #id, #tab, #url