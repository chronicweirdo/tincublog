function getBodyHeight() {
    return document.body.scrollHeight
}

function getWindowHeight() {
    return window.innerHeight
}

function verticalCenter() {
    let remainingVerticalSpace = getWindowHeight() - getBodyHeight()
    if (remainingVerticalSpace > 0) {
        let topSpace = remainingVerticalSpace / 2
        document.body.style.marginTop = topSpace + "px"
    }
}

window.onresize = function() {
    verticalCenter()
}
window.onload = function() {
    verticalCenter()
}