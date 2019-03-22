var imageList = [
    "https://images.pexels.com/photos/1275929/pexels-photo-1275929.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=9060",
    "https://images.pexels.com/photos/1451074/pexels-photo-1451074.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=450&w=560",
    "https://images.pexels.com/photos/1460880/pexels-photo-1460880.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=200",
    "https://images.pexels.com/photos/1437629/pexels-photo-1437629.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=500",
    "https://images.pexels.com/photos/87284/ocean-seacoast-rocks-water-87284.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=426&w=400",
    "https://images.pexels.com/photos/885880/pexels-photo-885880.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150&w=1260",
    "https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
];


var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
var wrapper = document.getElementById("wrapper");
var imagesWidht = null;
var imagesHeight = null;
var idleTime = 1;
var mouseTimeout;
var screenSaverActive = false;
var fade = false;

function initImages() {
    imageList.forEach(function (url) {
        var image = document.createElement("img");
        var padding = 10;
        image.src = url;

        image.addEventListener("load", function () {
            var previusWidht = imagesWidht + (this.naturalWidth + padding);
            imagesHeight = this.naturalHeight + padding;

            if (windowWidth > previusWidht && windowHeight > imagesHeight) {
                imagesWidht = previusWidht;
                wrapper.appendChild(image);
            }
        });

    });
}

function fadeIn(element, time) {
    var op = 1;
    var timer = setInterval(function () {
        if (op <= 0.1) {
            clearInterval(timer);
            element.style.visibility = 'hidden';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, time);
    fade = true;
}

function fadeOut(element, time) {
    var op = 0.1;
    element.style.visibility = 'visible';
    var timer = setInterval(function () {
        if (op >= 1) {
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, time);
    fade = false;
}

function showScreenSaver() {
    screenSaverActive = true;
    screenSaverAnimation();
}

function stopScreenSaver() {
    screenSaverActive = false;
}

function screenSaverAnimation() {

    setInterval(function () {
        var images = wrapper.getElementsByTagName("img");
        var image = images[Math.floor(Math.random() * images.length)];

        if(fade) {
            fadeOut(image, 20);
        } else {
            fadeIn(image, 20);
        }
    }, 2000);

}

function initScreenSaver() {
    var images = wrapper.getElementsByTagName("img");
    var image = images[Math.floor(Math.random() * images.length)];

    document.addEventListener("mousemove", function () {
        clearTimeout(mouseTimeout);

        if (screenSaverActive) {
            stopScreenSaver();
        }

        mouseTimeout = setTimeout(function () {
            showScreenSaver();
        }, 1000 * idleTime);
    });
}

initImages();
window.addEventListener("load", function () {
    initScreenSaver();
});

