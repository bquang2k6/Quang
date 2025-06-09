const apkData = [
            {
                name: "Locket gold (xanh)",
                version: "1.0",
                category: "social",
                rating: 4.2,
                size: "32 MB",
                icon: "./icon/bản màu xanh.png",
                downloadUrl: "public/bản màu xanh.apk",
                isNew: false
            },
            {
                name: "Locket gold (đen)",
                version: "1.0",
                category: "social",
                rating: 4.5,
                size: "32 MB",
                icon: "./icon/black.png",
                downloadUrl: "public/bản màu đen.apk",
                isNew: true
            },
            {
                name: "Locket gold (tím hồng)",
                version: "1.0",
                category: "social",
                rating: 4.9,
                size: "32 MB",
                icon: "icon/pink.png",
                downloadUrl: "public/bản màu tím hồng.apk",
                isNew: false
            },
            {
                name: "Locket gold (hồng)",
                version: "1.0",
                category: "social",
                rating: 4.4,
                size: "32 MB",
                icon: "icon/pinkk.png",
                downloadUrl: "public/màu hồng pink.apk",
                isNew: false
            },
            {
                name: "Locket gold (avata tang diên)",
                version: "1.0",
                category: "social",
                rating: 5.0,
                size: "32 MB",
                icon: "/icon/avata tang diên.png",
                downloadUrl: "public/avata tang diên.apk",
                isNew: false
            },
            {
                name: "Locket gold (vàng gold)",
                version: "1.0",
                category: "social",
                rating: 4.9,
                size: "32 MB",
                icon: "icon/gold.png",
                downloadUrl: "public/bản màu vàng gold.apk",
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
            
            try {
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.download = appName + '.apk';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                showNotification(`Đã tải ${appName} thành công!`);
            } catch (error) {
                console.error('Error downloading:', error);
                showNotification(`Lỗi khi tải ${appName}. Vui lòng thử lại.`);
            } finally {
                setTimeout(() => {
                    buttons.forEach(btn => btn.disabled = false);
                }, 1000);
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