// Tự động chuyển hướng sau 3 giây
setTimeout(() => {
    window.location.href = 'https://wangtech.top';
}, 1000);

// Hoặc có thể thêm một countdown hiển thị cho người dùng
let countdown = 3;
const countdownElement = document.createElement('div');
countdownElement.id = 'countdown';
countdownElement.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #007bff;
    color: white;
    padding: 10px 15px;
    border-radius: 5px;
    font-weight: bold;
    z-index: 10000;
    box-shadow: 0 2px 10px rgba(0,0,0,0.3);
`;
document.body.appendChild(countdownElement);

const countdownTimer = setInterval(() => {
    countdownElement.textContent = `Chuyển hướng sau ${countdown}s...`;
    countdown--;
    
    if (countdown < 0) {
        clearInterval(countdownTimer);
        window.location.href = 'https://locket.wangtech.top';
    }
}, 1000);

// Hiển thị countdown ngay lập tức
countdownElement.textContent = `Chuyển hướng sau ${countdown}s...`;

const apkData = [
    {
        name: "Locket gold (xanh)",
        version: "1.0",
        category: "social",
        rating: 4.2,
        size: "1 MB",
        icon: "./icon/bản màu xanh.png",
        downloadUrl: "public/xanh.apk",
        isNew: false
    },
    {
        name: "Locket gold (đen)",
        version: "1.0",
        category: "social",
        rating: 4.5,
        size: "1 MB",
        icon: "./icon/black.png",
        downloadUrl: "public/đen.apk",
        isNew: true
    },
    {
        name: "Locket gold (tím hồng)",
        version: "1.0",
        category: "social",
        rating: 4.9,
        size: "1 MB",
        icon: "icon/pink.png",
        downloadUrl: "public/tím hồng.apk",
        isNew: false
    },
    {
        name: "Locket gold (hồng)",
        version: "1.0",
        category: "social",
        rating: 4.4,
        size: "1 MB",
        icon: "icon/pinkk.png",
        downloadUrl: "public/hồng.apk",
        isNew: false
    },
    {
        name: "Locket gold (avata tang diên)",
        version: "1.0",
        category: "social",
        rating: 5.0,
        size: "1 MB",
        icon: "icon/avata tang diên.png",
        downloadUrl: "public/avata tang diên.apk",
        isNew: false
    },
    {
        name: "Locket gold (vàng gold)",
        version: "1.0",
        category: "social",
        rating: 4.9,
        size: "1 MB",
        icon: "icon/gold.png",
        downloadUrl: "public/gold.apk",
        isNew: true
    }
];

let filteredData = [...apkData];

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

function createApkCard(app) {
    const card = document.createElement('div');
    card.className = 'apk-card';
    card.innerHTML = `
        ${app.isNew ? '<div class="new-badge">MỚI</div>' : ''}
        <button class="close-btn" onclick="closeExpandedCard(event)" style="display: none;">×</button>
        <div class="apk-header">
            <img src="${app.icon}" alt="${app.name}" class="apk-icon" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiByeD0iMTIiIGZpbGw9IiM2NjdlZWEiLz4KPHN2ZyB4PSIyMCIgeT0iMjAiIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0id2hpdGUiPjxwYXRoIGQ9Ik0xMiAydjguNjNhMyAzIDAgMCAwIDEuNSAyLjZsNyA0YTMgMyAwIDAgMCAzIDBsNy00YTMgMyAwIDAgMCAxLjUtMi42VjJabTAtNHY4LjYzYTMgMyAwIDAgMCAxLjUgMi42bDcgNGEzIDMgMCAwIDAgMyAwbDctNGEzIDMgMCAwIDAgMS41LTIuNlYyWiIvPjwvc3ZnPgo8L3N2Zz4='">
            <div class="apk-info">
                <h3>${app.name}</h3>
                <div class="apk-version">Phiên bản ${app.version}</div>
            </div>
        </div>
        <div class="apk-details">
            <div class="detail-row">
                <span class="detail-label">Danh mục:</span>
                <span>${getCategoryName(app.category)}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Kích thước:</span>
                <span>${app.size}</span>
            </div>
        </div>
        <div class="download-stats">
            <div class="rating">
                <span class="stars">${'★'.repeat(Math.floor(app.rating))}${'☆'.repeat(5-Math.floor(app.rating))}</span>
                <span>${app.rating}</span>
            </div>
        </div>
        <button class="download-btn" onclick="downloadApp(event, '${app.name}', '${app.downloadUrl}')">Tải xuống</button>
    `;
    return card;
}

function getCategoryName(category) {
    const categories = {
        'social': 'Mạng xã hội',
    };
    return categories[category] || 'Khác';
}

function renderApps() {
    const grid = document.getElementById('apkGrid');
    grid.innerHTML = '';
    
    filteredData.forEach(app => {
        const card = createApkCard(app);
        if (window.innerWidth <= 768) {
            card.addEventListener('click', (e) => {
                if (!e.target.classList.contains('download-btn') && !e.target.classList.contains('close-btn')) {
                    expandCard(card);
                }
            });
        }
        grid.appendChild(card);
    });
}

function expandCard(card) {
    // Đóng tất cả card đang mở
    document.querySelectorAll('.apk-card').forEach(c => {
        c.classList.remove('expanded');
        c.querySelector('.close-btn').style.display = 'none';
    });
    document.getElementById('overlay').classList.remove('show');
    
    // Mở card được chọn
    card.classList.add('expanded');
    card.querySelector('.close-btn').style.display = 'flex';
    document.getElementById('overlay').classList.add('show');
}

function closeExpandedCard(event) {
    event.stopPropagation();
    document.querySelectorAll('.apk-card').forEach(c => {
        c.classList.remove('expanded');
        c.querySelector('.close-btn').style.display = 'none';
    });
    document.getElementById('overlay').classList.remove('show');
}

function filterApps(category) {
    if (category === 'all') {
        filteredData = [...apkData];
    } else {
        filteredData = apkData.filter(app => app.category === category);
    }
    renderApps();
}

async function downloadApp(event, appName, downloadUrl) {
    event.stopPropagation();
    const buttons = document.querySelectorAll('.download-btn');
    buttons.forEach(btn => btn.disabled = true);

    // Hiển thị progress bar
    const progressContainer = document.getElementById('progressContainer');
    const progressBar = document.getElementById('progressBar');
    const progressPercentage = document.getElementById('progressPercentage');
    const progressSize = document.getElementById('progressSize');
    const progressSpeed = document.getElementById('progressSpeed');
    const progressTitle = document.getElementById('progressTitle');
    const progressCancel = document.getElementById('progressCancel');

    progressTitle.textContent = `Đang tải ${appName}`;
    progressContainer.classList.add('show');
    progressBar.style.width = '0%';
    progressPercentage.textContent = '0%';
    progressSize.textContent = '0 MB / 1.10 MB';
    progressSpeed.textContent = '0 KB/s';

    // Khởi tạo AbortController để hủy tải xuống
    const controller = new AbortController();
    const signal = controller.signal;

    // Xử lý sự kiện hủy
    progressCancel.onclick = () => {
        controller.abort();
        progressContainer.classList.remove('show');
        buttons.forEach(btn => btn.disabled = false);
        showNotification(`Đã hủy tải ${appName}`);
    };

    try {
        const startTime = Date.now();
        const response = await fetch(downloadUrl, { signal });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const total = 1048576; // 1 MB in bytes
        let loaded = 0;
        let lastLoaded = 0;
        let lastTime = startTime;

        const reader = response.body.getReader();
        const chunks = [];

        while (true) {
            const { done, value } = await reader.read();

            if (done) break;

            chunks.push(value);
            loaded += value.length;

            // Cập nhật progress bar
            const percentage = Math.round((loaded / total) * 100);
            progressBar.style.width = `${percentage}%`;
            progressPercentage.textContent = `${percentage}%`;
            progressSize.textContent = `${(loaded / 1024 / 1024).toFixed(2)} MB / 1.00 MB`;

            // Tính tốc độ tải
            const currentTime = Date.now();
            const timeDiff = (currentTime - lastTime) / 1000; // giây
            if (timeDiff > 0.5) {
                const bytesDiff = loaded - lastLoaded;
                const speed = (bytesDiff / 1024 / timeDiff).toFixed(2); // KB/s
                progressSpeed.textContent = `${speed} KB/s`;
                lastLoaded = loaded;
                lastTime = currentTime;
            }
        }

        // Tạo blob và tải xuống
        const blob = new Blob(chunks);
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = appName + '.apk';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        showNotification(`Đã tải ${appName} thành công!`);
    } catch (error) {
        if (error.name === 'AbortError') {
            return; // Đã hủy, không hiển thị lỗi
        }
        console.error('Error downloading:', error);
        showNotification(`Lỗi khi tải ${appName}: ${error.message}`);
    } finally {
        progressContainer.classList.remove('show');
        progressBar.style.animation = ''; // Xóa animation nếu có
        buttons.forEach(btn => btn.disabled = false);
    }
}

// Event Listeners
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterApps(btn.dataset.category);
    });
});

// Đóng expanded card khi click overlay
document.getElementById('overlay').addEventListener('click', closeExpandedCard);

// Resize listener to re-render on screen size change
window.addEventListener('resize', () => {
    renderApps();
});

// Khởi tạo ứng dụng
renderApps();