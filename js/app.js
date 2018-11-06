window.onload = function () {
    imglocation("container", "box")
    var imgData = {"data": [{"src": "../images/8.jpg"}, {"src": "../images/8.jpg"}, {"src": "../images/8.jpg"}, {"src": "../images/61.jpg"}, {"src": "../images/62.jpg"}, {"src": "../images/63.jpg"}, {"src": "../images/62.jpg"}, {"src": "../images/61.jpg"}, {"src": "../images/60.jpg"}]}

    window.addEventListener("scroll", () => {
        if (checkFlag()) {
            loadData(imgData)
        }

    })

    while (true) {
        if (checkIsMatch()) {
            loadData(imgData)
        } else {
            break
        }
    }

}

function checkIsMatch() {
    var pageHeight = document.documentElement.clientHeight || document.body.clientHeight

    var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight

    console.log("scrollHeight:" + scrollHeight + "  " + "pageHeight:" + pageHeight)
    if (scrollHeight == pageHeight) {
        return true
    } else {
        return false
    }
}

function loadData(imgData) {
    var cparent = document.getElementById("container")
    for (var i = 0; i < imgData.data.length; i++) {
        var ccontent = document.createElement("div")
        ccontent.className = "box"
        cparent.appendChild(ccontent)
        var boxImg = document.createElement("div")
        boxImg.className = "box_img"
        ccontent.appendChild(boxImg)
        var img = document.createElement("img")
        img.src = imgData.data[i].src
        boxImg.appendChild(img)
    }
    imglocation("container", "box")
}

function checkFlag() {
    var cparent = document.getElementById("container")
    var ccontnet = getChildElement(cparent, "box")
    var lastContentTop = ccontnet[ccontnet.length - 1].offsetTop


    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop

    var pageHeight = document.documentElement.clientHeight || document.body.clientHeight

    var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight

    console.log("scrollHeight:" + scrollHeight + "  " + "pageHeight:" + pageHeight)

    if (lastContentTop <= (scrollTop + pageHeight)) {
        console.log("check成功")
        return true
    }

}

function imglocation(parent, contnet) {
    //将父级控件下的content全部取出来
    var cparent = document.getElementById(parent)
    var ccontnet = getChildElement(cparent, contnet)
    console.log(ccontnet)
    var imgWidth = ccontnet[0].offsetWidth
    var cols = Math.floor(document.documentElement.clientWidth / imgWidth)
    cparent.style.cssText = "width:" + imgWidth * cols + "px;margin:0 auto"

    var boxHeightArr = []
    for (var i = 0; i < ccontnet.length; i++) {
        if (i < cols) {
            boxHeightArr[i] = ccontnet[i].offsetHeight
        } else {
            var minHeight = Math.min.apply(null, boxHeightArr)
            var minIndex = getminHeightLocation(boxHeightArr, minHeight)

            ccontnet[i].style.position = "absolute"
            ccontnet[i].style.top = minHeight + "px"

            ccontnet[i].style.left = ccontnet[minIndex].offsetLeft + "px"
            boxHeightArr[minIndex] = boxHeightArr[minIndex] + ccontnet[i].offsetHeight
        }
    }
}

function getminHeightLocation(boxHeightArr, minHeight) {
    for (var i in boxHeightArr) {
        if (boxHeightArr[i] == minHeight) {
            return i
        }
    }
}

function getChildElement(parent, content) {
    var contnentArray = [];
    var allcontnet = parent.getElementsByTagName("*")
    for (var i = 0; i < allcontnet.length; i++) {
        if (allcontnet[i].className == content) {
            contnentArray.push(allcontnet[i])
        }
    }
    return contnentArray
}