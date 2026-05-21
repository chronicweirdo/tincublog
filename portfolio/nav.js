function applyMenuButton() {
    let toggleFullMenu = (button) => {
        let buttonPos = button.getBoundingClientRect()
        let nav = document.getElementsByTagName("nav")[0]
        if (nav.style.display == "block") {
            nav.style.display = "none"
        } else {
            nav.style.display = "block"
            nav.style.top = (buttonPos.top + buttonPos.height) + "px"
        }
    }
    let menuButton = document.getElementById("menu-button")
    menuButton.addEventListener("click", (ev) => toggleFullMenu(menuButton))
}
function setupActions() {
    if (window.innerWidth > 1050) {
        setupDesktop()
    } else {
        setupMobile()
    }
}
function setupMobile() {
    // reset nav display
    let nav = document.getElementsByTagName("nav")[0]
    nav.style.display = null
    // reset nav lists
    let lists = nav.getElementsByTagName("ul")
    for (let list of lists) {
        list.style.display = null
        list.style.position = null
        list.replaceWith(list.cloneNode(true))
    }
    // reset nav links
    let links = nav.getElementsByTagName("a")
    for (let link of links) {
        link.classList.remove('open')
    }
    // setup top padding
    let pos = document.getElementById("logo-line").getBoundingClientRect()
    window.document.body.style.paddingTop = (pos.top + pos.height) + "px"
    // setup nav height
    nav.style.height = (window.innerHeight - (pos.top + pos.height)) + "px"
}
function setupDesktop() {
    // reset the top body padding
    window.document.body.style.paddingTop = null
    // reset nav height
    let nav = document.getElementsByTagName("nav")[0]
    nav.style.height = null
    // prepare submenu actions
    let showSubmenu = (link, submenu) => {
        let pos = link.getBoundingClientRect()
        submenu.style.display = "block"
        submenu.style.position = "absolute"
        submenu.style.top = pos.top + pos.height
        submenu.style.left = pos.left
        submenu.style.width = (pos.width-2*parseInt(window.getComputedStyle(link).borderLeftWidth)) + "px"
        link.classList.add('open')
    }
    let hideSubmenu = (link, submenu) => {
        submenu.style.display = "none"
        link.classList.remove('open')
    }
    // hide submenus and apply actions
    //let submenus = nav.getElementsByClassName("submenu")
    let submenus = nav.getElementsByTagName("ul")
    for (let submenu of submenus) {
        let parent = submenu.parentElement
        if (parent.tagName == "LI") {
            let submenuLink = submenu.parentElement.getElementsByTagName("a")[0]
            submenu.addEventListener("mouseover", (ev) => showSubmenu(submenuLink, submenu))
            submenuLink.addEventListener("mouseover", (ev) => showSubmenu(submenuLink, submenu))
            submenu.addEventListener("mouseout", (ev) => hideSubmenu(submenuLink, submenu))
            submenuLink.addEventListener("mouseout", (ev) => hideSubmenu(submenuLink, submenu))
        }
    }
}
window.onload = function () {
    //applySubmenus()
    applyMenuButton()
    setupActions()
}
window.onresize = function () {
    setupActions()
}