const root = document.getElementById('root');
const search = document.getElementById('search');

search.addEventListener('change', e => {
    
})

chrome.runtime.sendMessage({
    message: "this message is sending 2"
}, res => {

})

//sender  #id, #tab, #url