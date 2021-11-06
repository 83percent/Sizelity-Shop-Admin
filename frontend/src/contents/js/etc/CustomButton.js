
function set(__customButton) {
    const __save = get();
    if(!__save || __save.length === 0) {
        localStorage.setItem("CustomButton", JSON.stringify([__customButton]));
    } else {
        localStorage.setItem("CustomButton", JSON.stringify([...__save, __customButton]));
    }
}

function get() {
    return JSON.parse(localStorage.getItem("CustomButton"));
}
function remove(index) {
    const __save = get();
    __save.splice(index,1);
    localStorage.setItem("CustomButton", JSON.stringify(__save));
}

module.exports = {
    set, get, remove
}