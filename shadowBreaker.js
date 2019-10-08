if (window.name == "gsft_main"){
    window.name = "gsft_main"
}

Element.prototype._attachShadow = Element.prototype.attachShadow;
Element.prototype.attachShadow = function(params) {
    params.mode = 'open';
    return Element.prototype._attachShadow(params);
}