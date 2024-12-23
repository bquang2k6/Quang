function createStars() {
  const starsContainer = document.querySelector('.snow-container');
  const numberOfStars = 100;

  for (let i = 0; i < numberOfStars; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 60 + '%'; // Chỉ ở nửa trên màn hình
    star.style.animationDelay = Math.random() * 2 + 's';
    starsContainer.appendChild(star);
  }
}

// Gọi hàm tạo sao khi trang web load
createStars();

function createSnow() {
  const snowContainer = document.querySelector('.snow-container');
  const snow = document.createElement('div');
  snow.classList.add('snow');

  // Vị trí ngẫu nhiên theo chiều ngang
  snow.style.left = Math.random() * 100 + '%';

  // Tốc độ rơi và kích thước ngẫu nhiên
  const duration = Math.random() * 5 + 5;
  const size = Math.random() * 3 + 2;

  snow.style.width = size + 'px';
  snow.style.height = size + 'px';
  snow.style.opacity = Math.random() * 0.7 + 0.3;

  // Thêm animation
  snow.style.animation = `fall ${duration}s linear`;

  snowContainer.appendChild(snow);

  // Xóa bông tuyết sau khi rơi xong
  setTimeout(() => {
    snow.remove();
  }, duration * 1000);
}

// Cập nhật keyframes animation
const style = document.createElement('style');
style.textContent = `
  @keyframes fall {
    from {
      transform: translateY(-10px);
    }
    to {
      transform: translateY(100vh);
    }
  }
  
  @keyframes sway {
    from {
      transform: translateX(-15px);
    }
    to {
      transform: translateX(15px);
    }
  }
`;
document.head.appendChild(style);

// Tạo tuyết với tần suất thấp hơn
setInterval(createSnow, 200);

// Thêm vào cuối file
const musicBtn = document.querySelector('.music-toggle');
const audio = document.getElementById('bgMusic');

musicBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    musicBtn.textContent = '🔊';
  } else {
    audio.pause();
    musicBtn.textContent = '🔈';
  }
});

// Thêm hiệu ứng di chuyển cho ông già Noel
function moveSanta() {
  const santaContainer = document.querySelector('.santa-container');

  // Reset vị trí khi ông già Noel bay ra khỏi màn hình
  setInterval(() => {
    const rect = santaContainer.getBoundingClientRect();
    if (rect.left > window.innerWidth) {
      santaContainer.style.left = '-200px';
    }
  }, 100);
}

// Gọi hàm di chuyển ông già Noel
moveSanta();

// Thêm hiệu ứng quà rơi
function createGift() {
  const gift = document.createElement('div');
  gift.classList.add('gift');

  // Vị trí ngẫu nhiên theo chiều ngang
  const randomX = Math.random() * (window.innerWidth - 40); // Trừ đi kích thước gift
  gift.style.left = randomX + 'px';
  gift.style.top = '-50px';

  const messages = [
    '🎁 Chúc mừng! Bạn nhận được một điều ước',
    '🎄 Giáng sinh an lành!',
    '⭐ Chúc bạn một Giáng Sinh ấm áp!',
    '🎅 Ho Ho Ho! Quà từ ông già Noel',
    '⭐Chúc bạn một mùa giáng sinh hạnh phúc',
    '🔔 Giáng Sinh vui vẻ bên gia đình',
    '✨ May mắn và bình an sẽ luôn bên cạnh bạn!',
    '❄️ Chúc bạn những khoảnh khắc đẹp nhất trong mùa lễ hội này!'
  ];

  gift.addEventListener('click', () => {
    const popup = document.createElement('div');
    popup.classList.add('gift-popup');
    popup.textContent = messages[Math.floor(Math.random() * messages.length)];
    document.body.appendChild(popup);
    popup.style.display = 'block';
    // Đặt vị trí của popup tại vị trí của hộp quà được nhấp vào 
    popup.style.left = `${gift.offsetLeft}px`; 
    popup.style.top = `${gift.offsetTop}px`;

    // Hiệu ứng âm thanh khi mở quà
    const unwrapSound = new Audio('unwrap.mp3');
    unwrapSound.play();

    setTimeout(() => {
      popup.style.display = 'none';
      popup.remove();
    }, 3000);

    gift.remove();
  });

  document.body.appendChild(gift);

  // Animation rơi mượt mà hơn
  let pos = -50;
  let speed = 1;
  const maxSpeed = 3;
  const acceleration = 0.05;

  const fall = setInterval(() => {
    speed = Math.min(speed + acceleration, maxSpeed);
    pos += speed;
    gift.style.top = pos + 'px';

    // Kiểm tra va chạm với đáy màn hình
    if (pos > window.innerHeight) {
      clearInterval(fall);
      gift.remove();
    }
  }, 20);
}

// Giảm tần suất tạo quà
setInterval(createGift, 1000); // 8 giây một lần

function addTreeLights() {
  const tree = document.querySelector('.tree');
  const colors = ['#ff0', '#f00', '#0f0', '#00f', '#ff0'];

  for (let i = 0; i < 20; i++) {
    const light = document.createElement('div');
    light.classList.add('light');
    light.style.background = colors[Math.floor(Math.random() * colors.length)];
    light.style.left = Math.random() * 100 + '%';
    light.style.top = Math.random() * 100 + '%';
    light.style.animationDelay = Math.random() * 2 + 's';
    tree.appendChild(light);
  }
}

function updateCountdown() {
  const christmas = new Date(new Date().getFullYear(), 11, 25);
  const now = new Date();
  const diff = christmas - now;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById('days').textContent = days
    .toString()
    .padStart(2, '0');
  document.getElementById('hours').textContent = hours
    .toString()
    .padStart(2, '0');
  document.getElementById('minutes').textContent = minutes
    .toString()
    .padStart(2, '0');
  document.getElementById('seconds').textContent = seconds
    .toString()
    .padStart(2, '0');
}

setInterval(updateCountdown, 1000);

// Hiệu ứng mây trôi
function animateClouds() {
  const clouds = document.querySelectorAll('.cloud');
  clouds.forEach((cloud, index) => {
    cloud.style.animation = `float ${15 + index * 2}s linear infinite`;
    cloud.style.top = `${index * 15}%`;
  });
}

// Hiệu ứng pháo hoa
function createFirework(x, y) {
  const colors = ['#ff0', '#ff4', '#4ff', '#f4f', '#4f4'];
  const particles = 30;
  const container = document.querySelector('.fireworks-container');

  // Giới hạn tọa độ y trong phạm vi container
  const containerRect = container.getBoundingClientRect();
  y = Math.min(y, containerRect.height);

  for (let i = 0; i < particles; i++) {
    const particle = document.createElement('div');
    particle.className = 'firework-particle';
    particle.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];

    const angle = (i * 360) / particles;
    const velocity = 2 + Math.random() * 2;

    particle.style.left = x + 'px';
    particle.style.top = y + 'px';

    container.appendChild(particle);

    const rad = (angle * Math.PI) / 180;
    const vx = Math.cos(rad) * velocity;
    const vy = Math.sin(rad) * velocity;

    let posX = x;
    let posY = y;

    const animate = () => {
      posX += vx;
      posY += vy;

      // Giới hạn phạm vi di chuyển trong container
      if (
        posX < 0 ||
        posX > containerRect.width ||
        posY < 0 ||
        posY > containerRect.height
      ) {
        particle.remove();
        return;
      }

      particle.style.left = posX + 'px';
      particle.style.top = posY + 'px';

      requestAnimationFrame(animate);
    };

    animate();
  }
}

// Hiệu ứng particle khi di chuột
function createParticle(e) {
  const particle = document.createElement('div');
  particle.className = 'mouse-particle';
  particle.style.left = e.pageX + 'px';
  particle.style.top = e.pageY + 'px';
  document.body.appendChild(particle);

  setTimeout(() => particle.remove(), 1000);
}

// Thêm tương tác với cây thông
function addTreeInteraction() {
  const tree = document.querySelector('.tree');
  const bells = document.querySelectorAll('.bell');

  tree.addEventListener('click', () => {
    tree.classList.add('shake');

    // Thêm hiệu ứng rung cho chuông
    bells.forEach((bell) => {
      bell.style.animation = 'none';
      bell.offsetHeight; // Trigger reflow
      bell.style.animation = 'bellRing 0.5s';
    });

    setTimeout(() => {
      tree.classList.remove('shake');
      bells.forEach((bell) => {
        bell.style.animation = 'bellRing 2s infinite';
      });
    }, 500);
  });
}

// Thêm hàm trang trí cây thông mới
function decorateTree() {
  const tree = document.querySelector('.tree');
  const layers = document.querySelectorAll('.tree-layer');

  // Thêm chuông
  const bellPositions = [
    { left: '40%', top: '20%' },
    { right: '20%', top: '40%' },
    { left: '30%', top: '60%' },
    { right: '25%', top: '70%' },
  ];

  bellPositions.forEach((pos) => {
    const bell = document.createElement('div');
    bell.className = 'bell';
    Object.assign(bell.style, pos);
    tree.appendChild(bell);
  });

  // Thêm các quả châu
  const colors = ['red', 'gold', 'silver'];
  layers.forEach((layer) => {
    const layerRect = layer.getBoundingClientRect();
    const numOrnaments = 8;

    for (let i = 0; i < numOrnaments; i++) {
      const ornament = document.createElement('div');
      ornament.className = `ornament ${
        colors[Math.floor(Math.random() * colors.length)]
      }`;

      // Vị trí ngẫu nhiên trong phạm vi của tầng
      const left = 20 + Math.random() * 60; // 20% đến 80%
      const top = 20 + Math.random() * 60; // 20% đến 80%

      ornament.style.left = `${left}%`;
      ornament.style.top = `${top}%`;

      layer.appendChild(ornament);
    }
  });

  // Thêm hiệu ứng lấp lánh
  const lights = 30;
  for (let i = 0; i < lights; i++) {
    const light = document.createElement('div');
    light.className = 'light';
    light.style.left = `${Math.random() * 100}%`;
    light.style.top = `${Math.random() * 100}%`;
    light.style.animationDelay = `${Math.random() * 2}s`;
    light.style.background = `hsl(${Math.random() * 360}, 100%, 70%)`;
    tree.appendChild(light);
  }
}

// Khởi tạo các hiệu ứng
document.addEventListener('DOMContentLoaded', () => {
  const treeImage = document.querySelector('.tree img'); // Giả sử ảnh cây thông nằm trong class .tree

  // Nếu ảnh đã load xong
  if (treeImage.complete) {
    decorateTree();
    addTreeLights();
  } else {
    // Nếu ảnh chưa load xong, đợi sự kiện load
    treeImage.addEventListener('load', () => {
      decorateTree();
      addTreeLights();
    });
  }

  // Các hiệu ứng khác vẫn giữ nguyên
  animateClouds();
  addTreeInteraction();

  document.addEventListener('click', (e) => {
    createFirework(e.pageX, e.pageY);
    createParticle(e);
  });

  document.addEventListener('mousemove', (e) => {
    if (Math.random() < 0.1) {
      createParticle(e);
    }
  });
});

document.addEventListener('contextmenu', function(event) {
  event.preventDefault();
});

document.addEventListener('mousedown', function(event) {
  if (event.button === 0) {
      event.preventDefault();
  }
});
