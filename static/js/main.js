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
// Hàm cập nhật số lần truy cập
function updateVisitorCount() {
    // Lấy số lần truy cập từ localStorage
    let visitCount = localStorage.getItem('visitCount');
    
    // Nếu chưa có giá trị nào, khởi tạo là 1, ngược lại tăng giá trị lên 1
    if (visitCount === null) {
        visitCount = 1;
    } else {
        visitCount = parseInt(visitCount) + 1;
    }
    
    // Cập nhật số lần truy cập vào localStorage
    localStorage.setItem('visitCount', visitCount);
    
    // Hiển thị số lần truy cập trên trang
    document.getElementById('visitor-count').textContent = visitCount;
}

// Hàm lấy địa chỉ IP từ API miễn phí và cập nhật vào giao diện
async function updateIPAddress() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        document.getElementById('ip-address').textContent = data.ip;
    } catch (error) {
        document.getElementById('ip-address').textContent = 'Cannot load IP';
        console.error("Error fetching IP:", error);
    }
}

// Gọi các hàm khi trang được tải
window.onload = function() {
    updateVisitorCount();
    updateIPAddress();
};

var tc = document.getElementsByClassName('tc');
var tc_main = document.getElementsByClassName('tc-main');
tc[0].addEventListener('click', function (event) {
    pop();
});
tc_main[0].addEventListener('click', function (event) {
    event.stopPropagation();
});








/*
let lastScrollTop = 0;

window.addEventListener('scroll', function () {
    const header_container = document.querySelector('.header_container');
    const header = document.querySelector('.header');
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        header_container.style.top = '-100%';
        header.classList.remove("active");
    } else {
        header_container.style.top = '0';
        header.classList.add("active");
    }

    lastScrollTop = scrollTop;
    if (scrollTop < 20) {
        header_container.style.top = '0';
        document.querySelector(".header").classList.remove("active");
    }
});


*/


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





