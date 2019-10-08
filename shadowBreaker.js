Element.prototype._attachShadow = Element.prototype.attachShadow;
Element.prototype.attachShadow = function() {
    return this._attachShadow({ mode: "open" });
};

if (window.name == "gsft_main"){
    window.name = "gsft_main"
}