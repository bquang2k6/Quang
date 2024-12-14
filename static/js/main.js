function toggleClass(selector, className) {
    var elements = document.querySelectorAll(selector);
    elements.forEach(function (element) {
        element.classList.toggle(className);
    });
}

function pop(imageURL) {
    var tcMainElement = document.querySelector(".tc-img");
    if (imageURL) {
        tcMainElement.src = imageURL;
    }
    toggleClass(".tc-main", "active");
    toggleClass(".tc", "active");
}
var tc = document.getElementsByClassName('tc');
var tc_main = document.getElementsByClassName('tc-main');
tc[0].addEventListener('click', function (event) {
    pop();
});
tc_main[0].addEventListener('click', function (event) {
    event.stopPropagation();
});




document.addEventListener('DOMContentLoaded', function () {
    setTimeout(fadeout, 500);

});

function fadeout() {
    document.querySelector('.preloader').style.opacity = '0';
    document.querySelector('.preloader').style.display = 'none';

    document.querySelectorAll('.fadein').forEach(function (element) {
        element.style.transform = "translateY(0)";
        element.style.opacity = '1';
    });

    document.querySelectorAll('.fadein1').forEach(function (element) {
        element.style.transform = "translateY(0)";
        element.style.opacity = '1';
    });


}





document.addEventListener('DOMContentLoaded', function () {

    var html = document.querySelector('html');





    function changeTheme(theme) {
        html.dataset.theme = theme;

    }



    var Checkbox = document.getElementById('myonoffswitch')
    Checkbox.addEventListener('change', function () {
        if (!this.checked) {
            changeTheme("Dark");

        } else {
            changeTheme("Light");
        }

        

    });


});





