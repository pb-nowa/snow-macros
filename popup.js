'use strict'

const root = document.getElementById('root');
const search = document.getElementById('search');
const keyContainer = document.getElementById("keybindings-container");

const MACROS = {
    do_new: {  
        value: "Create New:",
        command: "cntl+shift+N"
    },
    do_save: {
        value: "Save:",
        command: "cntl+shift+S"
    },
    dir_groups: {
        value: "Redirect to Groups Table:",
        command: "cntl+shift+G"
    },
    dir_tables: {
        value: "Redirect to sys_tables Table:",
        command: "cntl+shift+T"
    },
    dir_users: {
        value: "Rediret to Users Table:",
        command: "cntl+shift+U"
    },
    open_workspace: {
        value: "Open Workspace:",
        command: "cntl+shift+W"
    },
    open_studio: {
        value: "Open Studio(Editor):",
        command: "cntl+shift+E"
    }
}

Object.freeze(MACROS)




const state = {};
state.macros = Object.values(MACROS);

for (let macro of state.macros) {
    let listElement = document.createElement("LI");
    
    let name = document.createElement("DIV");
    name.className = "keybinding-label";
    name.textContent = macro.value;

    let command = document.createElement("DIV");
    command.className = "keybinding";
    command.textContent = macro.command;
    
    
    listElement.className = "keybinding-item";
    listElement.appendChild(name)
    listElement.appendChild(command)
    
    keyContainer.appendChild(listElement)
}

search.addEventListener('input', e => {
    console.log(e.target.value)
})



//sender  #id, #tab, #url