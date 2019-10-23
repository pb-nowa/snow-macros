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
state.current = Object.values(MACROS);
state.previous = [];

function populate(list, prevState) {
    for (let item of list) {
        const listElement = document.createElement("LI");
        
        const name = document.createElement("DIV");
        name.className = "keybinding-label";
        name.textContent = item.value;

        const command = document.createElement("DIV");
        command.className = "keybinding";
        command.textContent = item.command;
        
        
        listElement.className = "keybinding-item";
        listElement.appendChild(name)
        listElement.appendChild(command)
        
        keyContainer.appendChild(listElement)
    }
}

populate(state.current, state.previous)

search.addEventListener('input', e => {
    handleSearch(e.target.value)
})

function handleSearch(str) {
    const macros = Object.values(MACROS);
    console.log(macros.map(el => el.value))
    
    
    let macroState = macros.filter(macro => {
        return macro.value.toLowerCase().includes(str);
    })
    
    populate(macroState)
}

//sender  #id, #tab, #url