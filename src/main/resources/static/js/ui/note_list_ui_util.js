function initScrollPosition(noteSideScrollPosition, pageSideScrollPosition) {
    let noteSide = document.querySelector('.left-side-menu-content');
    let pageSide = document.querySelector('.left-second-menu-content');
    noteSide.scrollTo({top: noteSideScrollPosition, behavior: 'smooth'});
    pageSide.scrollTo({top: pageSideScrollPosition, behavior: 'smooth'});
}

function getIdNoFromId(id) {
    return id.split('-')[1];
}
function getItemTypeFromId(id) {
    return id.split('-')[0];
}
function extractIdNoFromItem(item) {
    let itemId = item.getAttribute('id');
    return getIdNoFromId(itemId);
}

function changeSelectedItem(currentItemId, prevItemId, customClass) {

    const currentItem = document.querySelector("#" + currentItemId);
    const prevItem = document.querySelector("#" + prevItemId);
    //
    let originClass = currentItem.getAttribute("class")
    let newClass = originClass + customClass;
    //
    currentItem.setAttribute("class", newClass);
    if (prevItem != null) {
        prevItem.setAttribute("class", originClass);
    }
}


function collectOpenList() {
    let tagList = document.querySelectorAll("details");
    let openList = [];
    for (let i = 0; i < tagList.length; i++) {
        let result = tagList[i].getAttribute('open');
        if (result !== null) {
            openList.push(tagList[i].getAttribute('data-note-id'));
        }
    }
    return openList;
}

function getNoteSideWidth() {
    let noteSide = document.querySelector('.left-side-menu');
    return noteSide.offsetWidth;
}

function getPageSideWidth() {
    let pageSide = document.querySelector('.left-second-menu-content');
    return pageSide.offsetWidth;
}

function getNoteSideScrollPosition() {
    let noteSide = document.querySelector('.left-side-menu-content');
    return noteSide.scrollTop;
}

function getPageSideScrollPosition() {
    let pageSide = document.querySelector('.left-second-menu-content');
    return pageSide.scrollTop;
}

function getSideMenuHidden() {
    let sideMenu = document.querySelector('.left-side-wrap');
    return sideMenu == null;
}

function getNoteUIParamJsonStr() {
    let openList = collectOpenList();
    let noteWidth = getNoteSideWidth();
    let pageWidth = getPageSideWidth();
    let noteSideScrollPosition = getNoteSideScrollPosition();
    let pageSideScrollPosition = getPageSideScrollPosition();
    let sideMenuHidden = getSideMenuHidden();
    let noteUIParam = {
        'openList': openList,
        'noteWidth': noteWidth,
        'pageWidth': pageWidth,
        'noteSideScrollPosition': noteSideScrollPosition,
        'pageSideScrollPosition': pageSideScrollPosition,
        'sideMenuHidden': sideMenuHidden
    };

    return JSON.stringify(noteUIParam);
}

function setTokenToForm(form) {
    let token = document.querySelector('#csrf-token');
    let input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', '_csrf');
    input.setAttribute('value', token.getAttribute('value'));
    form.appendChild(input);

    return form;
}

function submitWithOpenList(paramTag) {

    let noteUIParam = getNoteUIParamJsonStr();
    let form = document.querySelector('#noteUIForm');
    let input = document.querySelector('#noteUIParamJson');
    input.value = noteUIParam;
    form.action = paramTag.getAttribute('href');
    form = setTokenToForm(form);
    form.method = 'post';

    form.submit();
}
function openProfilePop() {
    let html = `
        <div class="w-[500px] h-[600px] bg-blue-500 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[999] flex flex-col justify-around items-center">
            <div class="w-[50%] h-[40%]">
                <img class="bg-gray-300 rounded-[50%]" src="/img/2023071701753_0.jpg" alt="profile-img">
            </div>
            <div>
                <form th:action="@{/member/profile}" method="post" enctype="multipart/form-data">
                    <input type="file" class="btn">
                </form>
            </div>
            <div>
                <input class="btn" type="button" value="닫기" onclick="document.querySelector('#profile-modal').innerHTML = '';">
            </div>
        </div>
        `
    document.querySelector("#profile-modal").innerHTML = html;

}

function setNoteSideMenu(uiParam) {
    const noteWidth = uiParam.noteWidth;
    const leftSideMenu = document.querySelector(".left-side-menu");
    leftSideMenu.setAttribute("class", "left-side-menu bg-gray-800 text-white overflow-hidden w-[" + noteWidth + "px] min-w-[150px]");
}

function setPageSideMenu(uiParam) {
    const pageWidth = uiParam.pageWidth;
    const leftSecondMenuContent = document.querySelector(".left-second-menu-content");
    leftSecondMenuContent.setAttribute("class", "custom-scroll left-second-menu-content bg-gray-800 text-white overflow-scroll w-[" + pageWidth + "px] min-w-[150px]");
}

export {getNoteUIParamJsonStr, setNoteSideMenu, setPageSideMenu, changeSelectedItem, getIdNoFromId, extractIdNoFromItem}