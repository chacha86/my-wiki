let sideControlBars = document.querySelectorAll(".side-control-bar");
let isDragging = false;
let onDragTarget = null;

sideControlBars.forEach(function (item) {
    item.addEventListener("mousedown", function (e) {
        isDragging = true;
        onDragTarget = e.target;
        document.querySelector("body").classList.add("select-none");
    });
});

sideControlBars.forEach(function (item) {
    item.addEventListener("mouseup", function (e) {
        let allElements = document.getElementsByTagName('input'); // 모든 요소를 선택합니다.

        for (let i = 0; i < allElements.length; i++) {
            allElements[i].style.userSelect = 'auto'; // user-select 속성을 설정합니다.
        }
    });
});

document.querySelector(".main").addEventListener("mousemove", function (e) {
    if (isDragging) {
        let target = onDragTarget.previousElementSibling;
        let standard = e.pageX + onDragTarget.clientWidth / 2;
        if (standard >= e.clientX) {
            target.style.transform = "scaleX(0.99)";
        } else {
            target.style.transform = "scaleX(1.01)";
        }

        target.style.width = e.clientX - target.getBoundingClientRect().x + "px";
        target.style.transform = "scaleX(1)";

    }
});

document.querySelector("body").addEventListener("mouseup", function (e) {
    if (isDragging) {
        // document.querySelector(".main").style.cursor = 'default';
        isDragging = false;
        document.querySelector("body").classList.add("select-auto")
    }
});
