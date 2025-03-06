
class Zyyo {
    constructor() {
        document.addEventListener('DOMContentLoaded', () => {
            console.log(" %c Theme Zyang Version " + 1.0 + " %c zyyo.net", "color:#fff;background:linear-gradient(90deg,#448bff,#44e9ff);padding:5px 0;", "color:#000;background:linear-gradient(90deg,#44e9ff,#ffffff);padding:5px 10px 5px 0px;");
            console.log('zyyonb');
            
            this.message = new Message();
            /*ä¸éœ€è¦pjaxç„æ–¹æ³•*/
            this.handle_keydown();
            this.handel_scroll();
            this.handel_search();
            this.handel_moible_menu();
            this.handel_back_to_top();
            this.handel_theme_toggle();
            this.handle_guanxing();
            this.handle_init_animations();
            /* pjaxåˆå§‹åŒ–*/
            this.init_pjax();

        });



    }
    // pjax å›è°ƒæ–¹æ³•
    pjaxCallback() {
        this.handle_pop();
        this.handle_toc();
        this.handle_fade_in();
        this.handle_lazyload();
        this.handle_imgbox();
        this.handle_code_highlight();
        this.handel_code_copy();
        this.handle_emoji();
        this.handle_post_copy();
        this.handle_donation();

    }
    init_pjax() {
        this.pjaxCallback();
        const url = window.location.origin;
        $(document).pjax('a[href^="' + url + '"]:not(a[target="_blank"], a[no-pjax])', {
            container: '.container',
            fragment: '.container',
            timeout: 8000
        }).on('pjax:send', () => {
            NProgress.start();
        }).on('pjax:end', () => {
            this.pjaxCallback();
            NProgress.done();
        }).on('pjax:complete', () => {
            const sidebar = document.querySelector('.sidebar');
            sidebar.classList.remove('open');
        });
    }

    //å¤„ç†è¡¨æƒ…
    handle_emoji() {
        const emoji = document.getElementById('emoji');
        if (emoji) {
            emoji.addEventListener('click', () => {
                const content = document.querySelector('#comment-form .content');
                content.value = content.value + 'đŸ˜€';

            });
        }
    }
    
    handle_keydown() {
        document.addEventListener('keydown', (event) => {
            if (event.ctrlKey && event.key === 'k') {
                event.preventDefault();
                document.querySelector('.seach_modal').classList.toggle('active');
            }
        });
        document.addEventListener('keydown', (event) => {
            
            if (event.key === 'F12' || event.code === 'F12') {
                
                this.message.info('Đã phát hiện bạn mở bảng điều khiển, vui lòng tuân thủ quy tắc trang web.');
            }

            
            if (event.ctrlKey && event.shiftKey && event.key === 'I') {
                
                this.message.info('Đã phát hiện bạn mở bảng điều khiển, vui lòng tuân thủ quy tắc trang web.');
            }
        });
    }
    
    handel_scroll() {
        const header = document.querySelector(".header");

        if (header) {
            let lastScrollTop = 0;
            var currentHeight = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
           
            header.classList.toggle("active", currentHeight > 60);
            
            window.addEventListener("scroll", () => {
                var currentHeight = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                if (header) {
                    header.classList.toggle("active", currentHeight > 60);
                    if (currentHeight > lastScrollTop && currentHeight > 200) {
                        header.classList.add("hide");
                    } else {
                        header.classList.remove("hide");
                    }
                    lastScrollTop = currentHeight <= 0 ? 0 : currentHeight; // é˜²æ­¢é¡µé¢é¡¶éƒ¨æ—¶å‡ºç°è´Ÿå€¼
                }
            });
        }
    }
    //æƒ¯æ€§æ»å¨
    handle_guanxing() {


    }
    // å¤„ç†æœç´¢ modal
    handel_search() {
        const modal = document.getElementById('seach_modal');
        if (!modal) {
            return;
        }
        const modalBtn = document.getElementById('seach_btn');
        modalBtn.addEventListener('click', () => {
            modal.classList.add('active');
        });
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
    //èµèµ
    handle_donation() {
        const modal = document.getElementById("donation_modal");
        const trigger = document.getElementById("trigger_donation");
        if (!trigger || !modal) {
            return;
        }
        document.querySelectorAll(".tab_btn").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const tab = e.target.dataset.tab;
                document.querySelectorAll(".tab_btn").forEach((b) => b.classList.remove("active"));
                e.target.classList.add("active");
                document.querySelectorAll(".tab_item").forEach((item) => item.classList.remove("active"));
                document.getElementById(tab).classList.add("active");
            });
        });

        trigger.addEventListener("click", () => {
            modal.classList.add("active");
        });
        modal.addEventListener("click", () => {
            if (event.target === modal) {
                modal.classList.remove("active");
            }
        });
    }
    // å¤„ç†ç§»å¨ç«¯èœå•
    handel_moible_menu() {
        const sidebar = document.querySelector('.sidebar');
        if (!sidebar) {
            return;
        }
        const openBtn = document.getElementById('sidebar_open');
        openBtn.addEventListener('click', () => {
            sidebar.classList.add('open');
           

        });
        sidebar.addEventListener('click', (event) => {
            if (event.target.classList.contains('sidebar')) {
                sidebar.classList.remove('open');
              
            }
        });
    }
    // å¤„ç†è¿”å›é¡¶éƒ¨
    handel_back_to_top() {
        const upward = document.querySelector('.upward');
        if (!upward) {
            return;
        }
        upward.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        window.addEventListener("scroll", () => {
            var currentHeight = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            if (upward) {
                if (currentHeight > 300) {
                    upward.style.display = 'flex';
                } else {
                    upward.style.display = 'none';
                }
            }
        });
    }
    // å¤„ç†ä¸»é¢˜åˆ‡æ¢
    handel_theme_toggle() {
        document.querySelector('.day_night').addEventListener('click', () => {
            const html = document.documentElement;
            html.classList.toggle("Dark");
            if (html.classList.contains('Dark')) {
                this.setCookie("themeState", "Dark", 1);
                this.message.info('Đã chuyển sang chế độ ban đêm.');
            } else {
                this.setCookie("themeState", "Light", 1);
                this.message.info('Đã chuyển sang chế độ ban ngày.');
            }
        });
        if (this.getCookie("themeState") === "Dark") {
            document.documentElement.classList.add("Dark");
        }
    }
    // å¤„ç†å¼¹çª—
    handle_pop() {
        if (!this.tc) {
            this.tc = document.createElement('div');
            this.tc.className = 'tc';

            const tcMain = document.createElement('div');
            tcMain.className = 'tc-main';

            this.img = document.createElement('img');
            this.img.className = 'tc-img';

            tcMain.appendChild(this.img);
            this.tc.appendChild(tcMain);
            document.body.appendChild(this.tc);

            this.tc.addEventListener('click', () => this.tc.classList.remove('active'));
            tcMain.addEventListener('click', event => event.stopPropagation());
        }

        // ä¸ºæ‰€æœ‰è§¦å‘å…ƒç´ ç»‘å®äº‹ä»¶
        document.querySelectorAll('#pop').forEach(element => {
            element.addEventListener('click', (event) => {
                const imageURL = element.getAttribute('data-src'); 
                if (imageURL) {
                    this.img.src = imageURL; 
                    this.tc.classList.add('active');
                }
            });
        });
    }


    // ç›®å½•é«˜äº®
    handle_toc() {
        const tocLinks = document.querySelectorAll("#toc li a");
        if (tocLinks.length > 0) {
            const headers = Array.from(tocLinks).map(link => document.querySelector(link.getAttribute("href")));
            
            function debounce(func, wait) {
                let timeout;
                return function (...args) {
                    const context = this;
                    clearTimeout(timeout);
                    timeout = setTimeout(() => func.apply(context, args), wait);
                };
            }
            function highlightToc() {
                let activeIndex = -1;
                const scrollY = window.scrollY || document.documentElement.scrollTop;
                const documentHeight = document.documentElement.scrollHeight;
                const viewportHeight = window.innerHeight;

                if (scrollY < headers[0].offsetTop) {
                    activeIndex = 0;
                } else if (scrollY + viewportHeight >= documentHeight) {
                    activeIndex = headers.length - 1;
                } else {
                    for (let i = 0; i < headers.length; i++) {
                        const currentHeaderTop = headers[i].offsetTop;
                        const nextHeaderTop = headers[i + 1]?.offsetTop || Infinity;
                        if (scrollY >= currentHeaderTop && scrollY < nextHeaderTop) {
                            activeIndex = i;
                            break;
                        }
                    }
                }
                tocLinks.forEach(link => link.parentElement.classList.remove("active"));
                if (activeIndex >= 0) {
                    tocLinks[activeIndex].parentElement.classList.add("active");
                }
            }

        
            const debouncedHighlightToc = debounce(highlightToc, 10);
            tocLinks.forEach(link => {
                link.addEventListener("click", (e) => {
                    e.preventDefault();
                    const target = document.querySelector(link.getAttribute("href"));
                    target.scrollIntoView({ behavior: "smooth" });
                });
            });
            highlightToc();
            window.addEventListener("scroll", debouncedHighlightToc);
        }
    }
    
    handle_init_animations() {
        setTimeout(() => {
            const preloader = document.querySelector('.preloader');
            if (preloader) {
                preloader.style.opacity = '0';
                preloader.style.display = 'none';
            }
        }, 400);
        
    }
    handle_fade_in() {
        if (history.scrollRestoration) {
            history.scrollRestoration = 'manual';
        }
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0,
        };
        const callback = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        };
        const observer = new IntersectionObserver(callback, options);

        const fadeInElements = document.querySelectorAll('.fade-in');
        fadeInElements.forEach((element) => {
            observer.observe(element);
        });
        const post_elements = document.querySelectorAll('.post_content > *');
        post_elements.forEach((element) => {
            element.classList.add('fade-in');
            observer.observe(element);
        });
    }
    
    handle_lazyload() {
        $("img.lazy").lazyload({
            placeholder: loadimg,
            load: function () {
                $(this).addClass("loaded1");
                setTimeout(() => {
                    $(this).addClass("loaded2");
                }, 300);
            },
            appear: function () {
            }
        });
    }
  
    handle_imgbox() {
        window.ViewImage && ViewImage.init('.lazy');
    }
    
    handle_code_highlight() {
        window.hljs && hljs.highlightAll();
    }
    // åˆå§‹åŒ–å¤åˆ¶ä»£ç æŒ‰é’®
    handel_code_copy() {
        const copyButtons = document.querySelectorAll('.copy-btn');
        copyButtons.forEach(button => {
            button.addEventListener('click', () => {
                const codeElement = button.parentElement.nextElementSibling.querySelector('code');
                if (!codeElement) {
                    console.error('Không tìm thấy đoạn mã');
                    return;
                }
                const code = codeElement.innerText;
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(code).then(() => {
                        button.textContent = 'å·²å¤åˆ¶';
                        this.message.info('å·²å¤åˆ¶');
                        setTimeout(() => button.textContent = 'å¤åˆ¶', 2000);
                    }).catch(err => {
                        console.error('å¤åˆ¶å¤±è´¥:', err);
                        button.textContent = 'å¤åˆ¶å¤±è´¥';
                    });
                } else {
                    // å›é€€æ–¹æ¡ˆï¼æ‰‹å¨åˆ›å»º textarea è¿›è¡Œå¤åˆ¶
                    const textArea = document.createElement('textarea');
                    textArea.value = code;
                    document.body.appendChild(textArea);
                    textArea.select();
                    try {
                        document.execCommand('copy');
                        button.textContent = 'å·²å¤åˆ¶';
                        this.message.info('å·²å¤åˆ¶');
                    } catch (err) {
                        console.error('å›é€€å¤åˆ¶å¤±è´¥:', err);
                        button.textContent = 'å¤åˆ¶å¤±è´¥';
                    }
                    document.body.removeChild(textArea);
                }
            });
        });
    }
    handle_post_copy() {
        const button = document.getElementById('post_copy');
        if (button) {
            button.addEventListener('click', () => {
                const text = window.location.href;
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(text).then(() => {
                        this.message.info('å·²å¤åˆ¶');
                        button.textContent = 'å·²å¤åˆ¶';
                        setTimeout(() => button.textContent = 'åˆ†äº«', 2000);
                    }).catch(err => {
                        console.error('å¤åˆ¶å¤±è´¥:', err);
                    });
                } else {
                    // å›é€€æ–¹æ¡ˆï¼æ‰‹å¨åˆ›å»º textarea è¿›è¡Œå¤åˆ¶
                    const textArea = document.createElement('textarea');
                    textArea.value = text;
                    document.body.appendChild(textArea);
                    textArea.select();
                    try {
                        document.execCommand('copy');
                        this.message.info('å·²å¤åˆ¶');
                        button.textContent = 'å·²å¤åˆ¶';
                        setTimeout(() => button.textContent = 'åˆ†äº«', 2000);
                    } catch (err) {
                        console.error('å›é€€å¤åˆ¶å¤±è´¥:', err);
                    }
                    document.body.removeChild(textArea);
                }
            });
        }

    }
    // è®¾ç½® cookie
    setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    }
    // è·å– cookie
    getCookie(name) {
        var nameEQ = name + "=";
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            while (cookie.charAt(0) == ' ') {
                cookie = cookie.substring(1, cookie.length);
            }
            if (cookie.indexOf(nameEQ) == 0) {
                return cookie.substring(nameEQ.length, cookie.length);
            }
        }
        return null;
    }
}

// å®ä¾‹åŒ– Zyyo ç±»

var zyyo = new Zyyo();





document.addEventListener('keydown', function(event) {
    if (event.key === 'F12' || (event.ctrlKey && event.key === 'u')) {
      event.preventDefault();
      alert('Chức năng này bị vô hiệu hóa!');
    }
  });

  (function() {
    const element = new Image();
    Object.defineProperty(element, 'id', {
      get: function() {
        window.location.reload();
      }
    });
    console.log(element);
  })();

  document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
    alert('Nhấp chuột phải bị vô hiệu hóa!');
  });