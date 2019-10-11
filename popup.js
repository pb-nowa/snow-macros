const root = document.getElementById('root');
const search = document.getElementById('search');

search.addEventListener('change', e => {
    const div = document.createElement("div");
    const text = document.createTextNode("test test");
    div.appendChild(text)
    root.appendChild(div)
})

