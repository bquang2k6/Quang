document.addEventListener('DOMContentLoaded', function() {
    // Main UI elements
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const mainCard = document.getElementById('main-card');
    const successCard = document.getElementById('success-card');
    const heartsContainer = document.getElementById('hearts-container');
    const celebration = document.getElementById('celebration');
    const cherryBlossoms = document.getElementById('cherry-blossoms');
    const nervousCat = document.querySelector('.nervous-cat');
    const floatingHeartsContainer = document.getElementById('floating-hearts-container');
    const perpetualHearts = document.getElementById('perpetual-hearts');
    const darkmodeToggle = document.getElementById('darkmode-toggle');
    
    // Arrow pointers
    const yesArrow = document.getElementById('yes-arrow');
    const successArrow = document.getElementById('success-arrow');
    
    // Location selection elements
    const chooseLocationBtn = document.getElementById('choose-location-btn');
    const locationCard = document.getElementById('location-card');
    const locationButtons = document.querySelectorAll('.location-btn');
    const selectedLocationMessage = document.getElementById('selected-location-message');
    const locationCelebration = document.getElementById('location-celebration');
    const confirmLocationBtn = document.getElementById('confirm-location-btn');
    
    // Date & time selection elements
    const datetimeCard = document.getElementById('datetime-card');
    const confirmDatetimeBtn = document.getElementById('confirm-datetime');
    const addDatetimeBtn = document.getElementById('add-datetime');
    const datetimeRowTemplate = document.getElementById('datetime-row-template');
    const datetimeContainer = document.querySelector('.datetime-container');
    const selectedDatetimeMessage = document.getElementById('selected-datetime-message');

    // Food selection elements
    const foodNextBtn = document.getElementById('food-next-btn');
    const foodCard = document.getElementById('food-card');
    const foodButtons = document.querySelectorAll('.food-btn');
    const selectedFoodMessage = document.getElementById('selected-food-message');
    const foodCelebration = document.getElementById('food-celebration');
    const confirmFoodBtn = document.getElementById('confirm-food-btn');
    const customFoodContainer = document.getElementById('custom-food-container');
    const customFoodInput = document.getElementById('custom-food-input');
    const addCustomFoodBtn = document.getElementById('add-custom-food');
    const finalMessage = document.getElementById('final-message');
    const finalMessageElement = document.getElementById('final-message');
    const drinksNextBtn = document.getElementById('drinks-next-btn');
    
    // Drinks selection elements
    const drinksCard = document.getElementById('drinks-card');
    const drinkButtons = document.querySelectorAll('.drink-btn');
    const selectedDrinkMessage = document.getElementById('selected-drink-message');
    const drinksCelebration = document.getElementById('drinks-celebration');
    const confirmDrinkBtn = document.getElementById('confirm-drink-btn');
    const finalDrinkMessage = document.getElementById('final-drink-message');
    
    // Completion page elements
    const completionCard = document.getElementById('completion-card');
    const completionNextBtn = document.getElementById('completion-next-btn');
    const completionHearts = document.getElementById('completion-hearts');
    
    // Tracking selections
    let selectedLocations = [];
    let selectedFoods = [];
    let selectedDrinks = [];

    // Enhanced dark mode functionality with system preference detection
    if (darkmodeToggle) {
        // Check if user has a saved preference first
        const savedDarkMode = localStorage.getItem('darkMode');
        
        // If no saved preference, check system preference
        if (savedDarkMode === null) {
            // Check if user prefers dark mode at system level
            const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
            
            // Apply system preference
            if (prefersDarkMode) {
                document.body.classList.add('dark-mode');
                darkmodeToggle.checked = true;
            }
        } else if (savedDarkMode === 'enabled') {
            // Apply saved user preference if it exists
            document.body.classList.add('dark-mode');
            darkmodeToggle.checked = true;
        }
        
        // Listen for system preference changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            // Only apply system changes if user hasn't set a preference
            if (localStorage.getItem('darkMode') === null) {
                const systemPrefersDark = e.matches;
                document.body.classList.toggle('dark-mode', systemPrefersDark);
                darkmodeToggle.checked = systemPrefersDark;
            }
        });
        
        // Toggle handler remains for manual control
        darkmodeToggle.addEventListener('change', function() {
            document.body.classList.toggle('dark-mode', this.checked);
            
            // Store user preference
            if (this.checked) {
                localStorage.setItem('darkMode', 'enabled');
            } else {
                localStorage.setItem('darkMode', 'disabled');
            }
        });
    }
    
    // Fix dark mode functionality - improved implementation
    if (darkmodeToggle) {
        // Check if user has a saved preference first
        const savedDarkMode = localStorage.getItem('darkMode');
        
        // Apply saved preference or system preference if no saved preference
        if (savedDarkMode === 'enabled') {
            document.body.classList.add('dark-mode');
            darkmodeToggle.checked = true;
        } else if (savedDarkMode === null) {
            // Check system preference only if user hasn't set a preference
            const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (prefersDarkMode) {
                document.body.classList.add('dark-mode');
                darkmodeToggle.checked = true;
            }
        }
        
        // Event listener for toggle change with debugging
        darkmodeToggle.addEventListener('change', function() {
            console.log('Dark mode toggle changed. Checked:', this.checked);
            if (this.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('darkMode', 'enabled');
                console.log('Dark mode enabled and saved to localStorage');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('darkMode', 'disabled');
                console.log('Dark mode disabled and saved to localStorage');
            }
        });
        
        // Listen for system preference changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            // Only apply system changes if user hasn't set a preference
            if (localStorage.getItem('darkMode') === null) {
                const systemPrefersDark = e.matches;
                document.body.classList.toggle('dark-mode', systemPrefersDark);
                darkmodeToggle.checked = systemPrefersDark;
                console.log('System preference changed, dark mode:', systemPrefersDark);
            }
        });
    } else {
        console.warn('Dark mode toggle element not found');
    }
    
    // Create perpetual hearts that never end
    function startPerpetualHearts() {
        // Make the perpetual hearts container visible
        perpetualHearts.style.display = 'block';
        
        // Create hearts continuously
        function createPerpetualHeart() {
            const heart = document.createElement('div');
            heart.classList.add('perpetual-heart');
            
            // Random horizontal position
            heart.style.left = Math.random() * 100 + '%';
            
            // Random size and duration
            const size = Math.random() * 0.7 + 0.3; // 0.3 to 1.0
            const duration = Math.random() * 10 + 10; // 10 to 20 seconds
            
            heart.style.transform = `scale(${size})`;
            heart.style.animationDuration = `${duration}s`;
            
            perpetualHearts.appendChild(heart);
            
            // Remove from DOM after animation
            setTimeout(() => {
                heart.remove();
            }, duration * 1000);
        }
        
        // Create initial batch of hearts
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                createPerpetualHeart();
            }, i * 300);
        }
        
        // Continue creating hearts at intervals
        setInterval(createPerpetualHeart, 800);
    }
    
    // Create sakura cherry blossoms falling - increased density
    function createCherryBlossoms() {
        const totalBlossoms = 50; // Increased from 30 to 50
        
        for (let i = 0; i < totalBlossoms; i++) {
            setTimeout(() => {
                const blossom = document.createElement('div');
                blossom.classList.add('blossom');
                
                // Random size between 15px and 30px
                const size = Math.floor(Math.random() * 15) + 15;
                blossom.style.width = `${size}px`;
                blossom.style.height = `${size}px`;
                
                // Random starting position
                const startPos = Math.random() * 100;
                blossom.style.left = `${startPos}vw`;
                
                // Random horizontal movement
                const randomX = Math.random() * 10 - 5;
                // Random rotation
                const randomR = Math.random() * 2 - 1;
                
                blossom.style.setProperty('--random-x', randomX);
                blossom.style.setProperty('--random-r', randomR);
                
                // Set animation duration between 8 and 12 seconds
                const duration = Math.random() * 4 + 8;
                blossom.style.animation = `fall ${duration}s linear forwards`;
                
                cherryBlossoms.appendChild(blossom);
                
                // Remove blossom after animation
                setTimeout(() => {
                    blossom.remove();
                }, duration * 1000);
            }, i * 200); // Reduced stagger time to make it more dense
        }
    }
    
    // Create initial blossoms and repeat
    createCherryBlossoms();
    setInterval(createCherryBlossoms, 7000); // Reduced interval for more density
    
    // Create random hearts floating animation
    function createRandomHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = Math.random() * 2 + 5 + 's'; // Increased duration for higher floating
        heart.style.opacity = Math.random() * 0.5 + 0.3;
        heart.style.transform = `scale(${Math.random() * 0.6 + 0.4})`;
        heartsContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 7000); // Increased timeout to match longer animation
    }
    
    // Create heart every 350ms (slightly more frequent)
    setInterval(createRandomHeart, 350);
    
    // Make the "No" button always escape the card immediately
    let noBtnClickCount = 0;
    const noBtnResponses = [
        "Thật ư ?",
        "Bạn có chắc không?",
        "Suy nghĩ lại đi!",
        "Cơ hội cuối cùng...",
        "Làm ơn, được không?",
        "Tôi đoán bạn đang nhấn nhầm nút.",
        "Bạn đang làm tan nát trái tim tôi!",
        "Đi nào...",
        "Đừng ngại ngùng!",
        "Điều đó không tốt chút nào!",
        "Bạn có ý nói là có phải không?",
        "Thử lại nhé?",
        "Tôi vẫn đang chờ...",
        "Xin hãy xem xét lại!",
        "Bạn đã bỏ lỡ nút đồng ý!",
        "Có thể bạn đã nhấn nhầm?",
        "Một cơ hội nữa?",
        "Bây giờ thì sao?",
        "Bạn đã thay đổi ý định chưa?",
        "Cưng ơi, anh biết em sẽ đồng ý!",
        "Nói có đi!"
    ];

    // Make the No button run away immediately when hovered
    noBtn.addEventListener('mouseover', function() {
        // Always move the button away from the card
        const maxX = window.innerWidth - noBtn.offsetWidth - 50;
        const maxY = window.innerHeight - noBtn.offsetHeight - 50;
        
        // Ensure the button doesn't stay on the card
        let randomX, randomY;
        const cardRect = document.querySelector('.card').getBoundingClientRect();
        
        do {
            randomX = Math.floor(Math.random() * maxX);
            randomY = Math.floor(Math.random() * maxY);
        } while (
            randomX > cardRect.left - noBtn.offsetWidth && 
            randomX < cardRect.right &&
            randomY > cardRect.top - noBtn.offsetHeight && 
            randomY < cardRect.bottom
        );
        
        noBtn.style.position = 'fixed';
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';
        
        // Change text but don't reduce font size
        if (noBtnClickCount < noBtnResponses.length) {
            noBtn.innerHTML = `<b>${noBtnResponses[noBtnClickCount]}</b>`;
            noBtnClickCount++;
        } else {
            // If we've gone through all responses, cycle back to random ones
            const randomIndex = Math.floor(Math.random() * noBtnResponses.length);
            noBtn.innerHTML = `<b>${noBtnResponses[randomIndex]}</b>`;
        }
        
        // Make cat more nervous when No is hovered
        if (nervousCat) {
            nervousCat.style.animation = 'nervousShake 0.1s infinite';
            
            // Add burst of sweat drops
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    const sweatDrops = nervousCat.querySelector('.sweat-drops');
                    if (sweatDrops) {
                        const extraDrop = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
                        extraDrop.classList.add('sweat-drop');
                        extraDrop.setAttribute('cx', (1650 + Math.random() * 400).toString());
                        extraDrop.setAttribute('cy', (1750 + Math.random() * 200).toString());
                        extraDrop.setAttribute('rx', (15 + Math.random() * 15).toString());
                        extraDrop.setAttribute('ry', (25 + Math.random() * 15).toString());
                        extraDrop.setAttribute('fill', '#a3d9ff');
                        
                        sweatDrops.appendChild(extraDrop);
                        
                        // Remove extra drop after animation
                        setTimeout(() => {
                            extraDrop.remove();
                        }, 1500);
                    }
                }, i * 100);
            }
        }
    });
    
    // Handle click on Yes button with improved animations
    yesBtn.addEventListener('click', function() {
        // Hide the yes arrow pointer when yes is clicked if it exists
        if (yesArrow) {
            yesArrow.style.opacity = '0';
            yesArrow.style.transform = 'translateY(-50px)';
            yesArrow.style.transition = 'all 0.5s ease-out';
        }
        
        // Add hearts burst effect
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.classList.add('heart');
                heart.style.left = '50%';
                heart.style.top = '50%';
                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * 100 + 50;
                const duration = Math.random() * 1 + 1;
                heart.style.transform = `scale(${Math.random() * 0.5 + 0.5})`;
                heart.style.opacity = Math.random() * 0.5 + 0.5;
                
                // Custom animation for burst effect
                heart.animate([
                    { transform: 'translate(-50%, -50%) scale(0.5)', opacity: 1 },
                    { transform: `translate(calc(-50% + ${Math.cos(angle) * distance}px), calc(-50% + ${Math.sin(angle) * distance}px)) scale(0)`, opacity: 0 }
                ], {
                    duration: duration * 1000,
                    easing: 'cubic-bezier(0.1, 0.8, 0.9, 1)'
                });
                
                heartsContainer.appendChild(heart);
                
                setTimeout(() => {
                    heart.remove();
                }, duration * 1000);
            }, i * 50);
        }
        
        mainCard.style.transform = 'scale(1.05)';
        
        setTimeout(() => {
            mainCard.style.transform = 'scale(0.8)';
            mainCard.style.opacity = '0';
            
            setTimeout(() => {
                mainCard.style.display = 'none';
                successCard.style.display = 'block';
                
                // Start perpetual hearts for eternal celebration
                startPerpetualHearts();
                
                setTimeout(() => {
                    successCard.classList.remove('hidden');
                    successCard.style.opacity = '1';
                    successCard.style.transform = 'scale(1)';
                    
                    // Show the success arrow pointing right if it exists
                    if (successArrow) {
                        successArrow.classList.remove('hidden');
                        successArrow.style.opacity = '1';
                    }
                    
                    celebrateSuccess();
                }, 50);
            }, 500);
        }, 300);
        
        // Hide nervous cat when Yes is clicked
        if (nervousCat) {
            nervousCat.style.opacity = '0';
            nervousCat.style.transition = 'opacity 0.5s ease-out';
        }
    });
    
    // Choose location button handler
    if (chooseLocationBtn) {
        chooseLocationBtn.addEventListener('click', function() {
            // Transition to location selection
            successCard.style.transform = 'scale(0.8)';
            successCard.style.opacity = '0';
            
            setTimeout(() => {
                successCard.style.display = 'none';
                locationCard.style.display = 'block';
                
                setTimeout(() => {
                    locationCard.classList.remove('hidden');
                    locationCard.style.opacity = '1';
                    locationCard.style.transform = 'scale(1)';
                    
                    // Create some hearts in the location card too
                    for (let i = 0; i < 15; i++) {
                        setTimeout(() => {
                            const heart = document.createElement('div');
                            heart.classList.add('heart');
                            heart.style.left = Math.random() * 100 + '%';
                            heart.style.top = Math.random() * 100 + '%';
                            heart.style.animationDuration = Math.random() * 2 + 2 + 's';
                            heart.style.opacity = Math.random() * 0.7 + 0.3;
                            heart.style.transform = `scale(${Math.random() * 0.8 + 0.5})`;
                            locationCelebration.appendChild(heart);
                            
                            setTimeout(() => {
                                heart.remove();
                            }, 4000);
                        }, i * 100);
                    }
                }, 50);
            }, 500);
        });
    }
    
    // Location selection with multiple choices
    locationButtons.forEach(button => {
        button.classList.remove('selected');
        
        button.addEventListener('click', function() {
            // Toggle selection
            this.classList.toggle('selected');
            
            // Check if button is selected
            if (this.classList.contains('selected')) {
                // Add location to selected array
                selectedLocations.push(this.dataset.location);
                
                // Create heart burst around the button
                createHeartBurst(this, 15);
            } else {
                // Remove location from selected array
                selectedLocations = selectedLocations.filter(location => location !== this.dataset.location);
            }
            
            // Update message and button
            if (selectedLocations.length > 0) {
                selectedLocationMessage.classList.remove('hidden');
                selectedLocationMessage.classList.add('show');
                confirmLocationBtn.style.display = 'inline-block';
                
                // Create heart effect around confirm button
                createButtonHeartEffect(confirmLocationBtn);
            } else {
                selectedLocationMessage.classList.remove('show');
                selectedLocationMessage.classList.add('hidden');
                confirmLocationBtn.style.display = 'none';
            }
        });
    });
    
    // Create heart burst effect for location selection - shorter and more efficient
    function createHeartBurst(element, count) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.classList.add('heart');
                heart.style.position = 'fixed';
                heart.style.left = centerX + 'px';
                heart.style.top = centerY + 'px';
                heart.style.zIndex = '1000';
                
                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * 40 + 15; // Shorter distance
                const duration = Math.random() * 0.4 + 0.4; // Shorter duration
                heart.style.transform = 'translate(-50%, -50%) scale(0.5)';
                heart.style.opacity = '0.8';
                
                heart.animate([
                    { transform: 'translate(-50%, -50%) scale(0.5)', opacity: 0.8 },
                    { transform: `translate(calc(-50% + ${Math.cos(angle) * distance}px), calc(-50% + ${Math.sin(angle) * distance}px)) scale(0)`, opacity: 0 }
                ], {
                    duration: duration * 1000,
                    easing: 'cubic-bezier(0.1, 0.8, 0.9, 1)'
                });
                
                document.body.appendChild(heart);
                
                setTimeout(() => {
                    heart.remove();
                }, duration * 1000);
            }, i * 20); // Faster spawn time
        }
    }
    
    // Create heart effect around the continue button
    function createButtonHeartEffect(button) {
        // Make sure the button is visible first
        if (button.style.display !== 'none') {
            const rect = button.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const buttonWidth = rect.width;
            const buttonHeight = rect.height;
            
            // Create hearts around the button
            for (let i = 0; i < 8; i++) {
                setTimeout(() => {
                    const heart = document.createElement('div');
                    heart.classList.add('heart', 'button-heart');
                    
                    // Position hearts evenly around the button
                    const angle = (i / 8) * Math.PI * 2;
                    const offsetX = Math.cos(angle) * (buttonWidth / 1.5);
                    const offsetY = Math.sin(angle) * (buttonHeight / 1.2);
                    
                    heart.style.position = 'fixed';
                    heart.style.left = (centerX + offsetX) + 'px';
                    heart.style.top = (centerY + offsetY) + 'px';
                    heart.style.zIndex = '999'; // Below the button
                    
                    heart.style.transform = 'translate(-50%, -50%) scale(0)';
                    heart.style.opacity = '0';
                    
                    document.body.appendChild(heart);
                    
                    // Animate the hearts
                    heart.animate([
                        { transform: 'translate(-50%, -50%) scale(0)', opacity: 0 },
                        { transform: 'translate(-50%, -50%) scale(0.7)', opacity: 0.9, offset: 0.4 },
                        { transform: 'translate(-50%, -50%) scale(0.5)', opacity: 0.7, offset: 0.8 },
                        { transform: 'translate(-50%, -50%) scale(0)', opacity: 0 }
                    ], {
                        duration: 1200,
                        easing: 'ease-in-out'
                    });
                    
                    // Remove after animation
                    setTimeout(() => {
                        heart.remove();
                    }, 1200);
                }, i * 100);
            }
        }
    }
    
    // Handle confirm location button click - with improved heart effects
    confirmLocationBtn.addEventListener('click', function() {
        if (selectedLocations.length > 0) {
            localStorage.setItem('selectedLocations', JSON.stringify(selectedLocations));
            
            // Add celebration hearts - shorter and more concentrated burst
            for (let i = 0; i < 20; i++) { // Reduced from 30 to 20
                setTimeout(() => {
                    const heart = document.createElement('div');
                    heart.classList.add('heart');
                    heart.style.left = '50%';
                    heart.style.top = '50%';
                    const angle = Math.random() * Math.PI * 2;
                    const distance = Math.random() * 100 + 50; // Shorter distance
                    const duration = Math.random() * 0.7 + 0.7; // Shorter duration
                    heart.style.transform = `scale(${Math.random() * 0.5 + 0.5})`;
                    heart.style.opacity = Math.random() * 0.5 + 0.5;
                    
                    heart.animate([
                        { transform: 'translate(-50%, -50%) scale(0.5)', opacity: 1 },
                        { transform: `translate(calc(-50% + ${Math.cos(angle) * distance}px), calc(-50% + ${Math.sin(angle) * distance}px)) scale(0)`, opacity: 0 }
                    ], {
                        duration: duration * 1000,
                        easing: 'cubic-bezier(0.1, 0.8, 0.9, 1)'
                    });
                    
                    locationCelebration.appendChild(heart);
                    
                    setTimeout(() => {
                        heart.remove();
                    }, duration * 1000);
                }, i * 30); // Faster spawn
            }
            
            // After 1.2 seconds (shorter wait), proceed to datetime selection
            setTimeout(() => {
                // Transition to datetime selection
                locationCard.style.transform = 'scale(0.8)';
                locationCard.style.opacity = '0';
                
                setTimeout(() => {
                    locationCard.style.display = 'none';
                    
                    // Initialize the first datetime row
                    initializeDatetimeRow(datetimeRowTemplate);
                    
                    // Show the datetime card
                    datetimeCard.style.display = 'block';
                    
                    setTimeout(() => {
                        datetimeCard.classList.remove('hidden');
                        datetimeCard.style.opacity = '1';
                        datetimeCard.style.transform = 'scale(1)';
                        
                        // Create some hearts in the datetime card too
                        for (let i = 0; i < 15; i++) {
                            setTimeout(() => {
                                createHeart(document.getElementById('datetime-celebration'));
                            }, i * 100);
                        }
                    }, 50);
                }, 500);
            }, 1200); // Reduced from 1500ms to 1200ms
        }
    });
    
    // Function to create hearts
    function createHeart(container) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = Math.random() * 100 + '%';
        heart.style.animationDuration = Math.random() * 2 + 2 + 's';
        heart.style.opacity = Math.random() * 0.7 + 0.3;
        heart.style.transform = `scale(${Math.random() * 0.8 + 0.5})`;
        container.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 4000);
    }
    
    // Initialize a datetime row with enhanced date picker and time picker - fixed with proper error handling
    function initializeDatetimeRow(row) {
        try {
            // Initialize date picker with flatpickr
            const datePicker = row.querySelector('.date-picker');
            if (datePicker) {
                flatpickr(datePicker, {
                    dateFormat: "M d, Y",
                    minDate: "today",
                    disableMobile: true,
                    theme: "date-theme",
                    animate: true,
                    position: "auto center",
                    onOpen: function() {
                        // Add cute animation to calendar
                        const calendar = document.querySelector('.flatpickr-calendar');
                        if (calendar) {
                            calendar.style.animation = 'none';
                            setTimeout(() => {
                                calendar.style.animation = 'calendar-pop 0.3s ease-out';
                            }, 10);
                        }
                    }
                });
            }
            
            // Initialize time picker with flatpickr
            const timePicker = row.querySelector('.time-picker');
            if (timePicker) {
                flatpickr(timePicker, {
                    enableTime: true,
                    noCalendar: true,
                    dateFormat: "h:i K",
                    minuteIncrement: 15,
                    disableMobile: true,
                    theme: "time-theme",
                    animate: true,
                    position: "auto center",
                    onOpen: function() {
                        // Add cute animation to time picker
                        const calendar = document.querySelector('.flatpickr-calendar');
                        if (calendar) {
                            calendar.style.animation = 'none';
                            setTimeout(() => {
                                calendar.style.animation = 'calendar-pop 0.3s ease-out';
                            }, 10);
                        }
                    }
                });
            }
            
            // Add event listener to remove button
            const removeBtn = row.querySelector('.remove-datetime');
            if (removeBtn) {
                removeBtn.addEventListener('click', function() {
                    // Only remove if there's more than one row
                    if (datetimeContainer.children.length > 1) {
                        row.style.opacity = '0';
                        row.style.height = '0';
                        row.style.marginBottom = '0';
                        row.style.overflow = 'hidden';
                        setTimeout(() => {
                            row.remove();
                        }, 300);
                    }
                });
            }
        } catch (error) {
            console.error("Error initializing datetime row:", error);
        }
    }
    
    // Add new datetime row
    addDatetimeBtn.addEventListener('click', function() {
        // Clone the template row
        const newRow = datetimeRowTemplate.cloneNode(true);
        newRow.id = '';
        datetimeContainer.appendChild(newRow);
        
        // Initialize the new row with pickers
        initializeDatetimeRow(newRow);
        
        // Smooth animation for adding
        newRow.style.opacity = '0';
        setTimeout(() => {
            newRow.style.opacity = '1';
        }, 10);
    });
    
    // Confirm datetime selection
    confirmDatetimeBtn.addEventListener('click', function() {
        // Validate selections
        let isValid = true;
        const dateOptions = [];
        
        datetimeContainer.querySelectorAll('.datetime-row').forEach(row => {
            const date = row.querySelector('.date-picker').value;
            const time = row.querySelector('.time-picker').value;
            
            if (!date || !time) {
                isValid = false;
                // Visual feedback for empty fields
                if (!date) {
                    row.querySelector('.date-picker').style.borderColor = '#ff3366';
                    setTimeout(() => {
                        row.querySelector('.date-picker').style.borderColor = '';
                    }, 1000);
                }
                if (!time) {
                    row.querySelector('.time-picker').style.borderColor = '#ff3366';
                    setTimeout(() => {
                        row.querySelector('.time-picker').style.borderColor = '';
                    }, 1000);
                }
            } else {
                dateOptions.push({ date, time });
            }
        });
        
        if (isValid && dateOptions.length > 0) {
            // Store the selected options
            localStorage.setItem('dateOptions', JSON.stringify(dateOptions));
            
            // Hide the confirm button and show the message
            confirmDatetimeBtn.style.display = 'none';
            selectedDatetimeMessage.classList.remove('hidden');
            selectedDatetimeMessage.classList.add('show');
            if (foodNextBtn) {
                foodNextBtn.style.display = 'inline-block';
            }
            
            // Heart celebration
            for (let i = 0; i < 50; i++) {
                setTimeout(() => {
                    const heart = document.createElement('div');
                    heart.classList.add('heart');
                    heart.style.left = '50%';
                    heart.style.top = '50%';
                    const angle = Math.random() * Math.PI * 2;
                    const distance = Math.random() * 150 + 50;
                    const duration = Math.random() * 1 + 1;
                    heart.style.transform = `scale(${Math.random() * 0.5 + 0.5})`;
                    heart.style.opacity = Math.random() * 0.5 + 0.5;
                    
                    heart.animate([
                        { transform: 'translate(-50%, -50%) scale(0.5)', opacity: 1 },
                        { transform: `translate(calc(-50% + ${Math.cos(angle) * distance}px), calc(-50% + ${Math.sin(angle) * distance}px)) scale(0)`, opacity: 0 }
                    ], {
                        duration: duration * 1000,
                        easing: 'cubic-bezier(0.1, 0.8, 0.9, 1)'
                    });
                    
                    document.getElementById('datetime-celebration').appendChild(heart);
                    
                    setTimeout(() => {
                        heart.remove();
                    }, duration * 1000);
                }, i * 40);
            }
            
            // Disable the form after successful submission
            addDatetimeBtn.disabled = true;
            datetimeContainer.querySelectorAll('.remove-datetime').forEach(btn => {
                btn.disabled = true;
                btn.style.opacity = 0.5;
            });
            datetimeContainer.querySelectorAll('input').forEach(input => {
                input.disabled = true;
                input.style.opacity = 0.7;
            });
        }
    });
    
    // Next button to go from datetime to food selection
    if (foodNextBtn) {
        foodNextBtn.addEventListener('click', function() {
            console.log("Food next button clicked"); // Debug log
            // Transition to food selection
            datetimeCard.style.transform = 'scale(0.8)';
            datetimeCard.style.opacity = '0';
            
            setTimeout(() => {
                datetimeCard.style.display = 'none';
                foodCard.style.display = 'block';
                
                setTimeout(() => {
                    foodCard.classList.remove('hidden');
                    foodCard.style.opacity = '1';
                    foodCard.style.transform = 'scale(1)';
                    
                    // Create some hearts in the food card
                    for (let i = 0; i < 15; i++) {
                        setTimeout(() => {
                            createHeart(document.getElementById('food-celebration'));
                        }, i * 100);
                    }
                }, 50);
            }, 500);
        });
    } else {
        console.error("Food next button not found in the DOM");
    }

    // Food selection with toggle functionality
    if (foodButtons && foodButtons.length > 0) {
        foodButtons.forEach(button => {
            button.addEventListener('click', function() {
                const food = this.dataset.food;
                
                // Toggle selection
                this.classList.toggle('selected');
                
                if (this.classList.contains('selected')) {
                    // Add food to selected array
                    selectedFoods.push(food);
                    createHeartBurst(this, 10);
                } else {
                    // Remove food from selected array
                    selectedFoods = selectedFoods.filter(item => item !== food);
                }
                
                // Update message and button
                if (selectedFoods.length > 0) {
                    selectedFoodMessage.classList.remove('hidden');
                    selectedFoodMessage.classList.add('show');
                    confirmFoodBtn.style.display = 'inline-block';
                } else {
                    selectedFoodMessage.classList.remove('show');
                    selectedFoodMessage.classList.add('hidden');
                    confirmFoodBtn.style.display = 'none';
                }
                
                updateFoodSelectionStatus();
            });
        });
    }
    
    // Improved add custom food function to prevent duplicates and adjust container size
    function addCustomFood() {
        const foodValue = customFoodInput.value.trim();
        
        if (!foodValue) {
            // Visual feedback for empty input
            customFoodInput.classList.add('shake');
            setTimeout(() => {
                customFoodInput.classList.remove('shake');
            }, 500);
            return;
        }
        
        // Check if food already exists in both custom and regular selections
        if (selectedFoods.includes('custom:' + foodValue)) {
            // Alert user that the food is already added with better visual feedback
            customFoodInput.style.borderColor = '#ff3366';
            customFoodInput.classList.add('shake');
            
            // Find the duplicate badge and highlight it
            const badges = document.querySelectorAll('.custom-food-badge');
            badges.forEach(badge => {
                if (badge.textContent.includes(foodValue)) {
                    badge.style.transform = 'scale(1.1)';
                    badge.style.boxShadow = '0 0 15px rgba(255, 107, 149, 0.7)';
                    
                    // Scroll to the duplicate item
                    const container = document.querySelector('.custom-food-list');
                    if (container) {
                        container.scrollTop = badge.offsetTop - container.offsetTop;
                    }
                    
                    // Reset styles after animation
                    setTimeout(() => {
                        badge.style.transform = 'scale(1)';
                        badge.style.boxShadow = '';
                    }, 1000);
                }
            });
            
            setTimeout(() => {
                customFoodInput.style.borderColor = '';
                customFoodInput.classList.remove('shake');
            }, 1000);
            return;
        }
        
        // Add to selected foods
        selectedFoods.push('custom:' + foodValue);
        
        // Create custom food list container if it doesn't exist
        let customFoodList;
        if (!document.querySelector('.custom-food-list')) {
            customFoodList = document.createElement('div');
            customFoodList.className = 'custom-food-list small'; // Start with small size
            customFoodContainer.appendChild(customFoodList);
        } else {
            customFoodList = document.querySelector('.custom-food-list');
        }
        
        const badge = document.createElement('div');
        badge.className = 'custom-food-badge';
        badge.innerHTML = `${foodValue} <span>✕</span>`;
        
        // Add remove functionality with improved animation
        const removeSpan = badge.querySelector('span');
        removeSpan.addEventListener('click', function() {
            selectedFoods = selectedFoods.filter(food => food !== 'custom:' + foodValue);
            badge.style.opacity = '0';
            badge.style.transform = 'scale(0.8)';
            
            // Update status after removal
            updateFoodSelectionStatus();
            
            setTimeout(() => {
                badge.remove();
                
                // Adjust container size based on number of items
                updateCustomFoodListSize();
                
                // Show/hide continue button based on selection
                if (selectedFoods.length > 0) {
                    confirmFoodBtn.style.display = 'inline-block';
                } else {
                    confirmFoodBtn.style.display = 'none';
                    selectedFoodMessage.classList.remove('show');
                    selectedFoodMessage.classList.add('hidden');
                }
                
                // Hide the list container if empty
                if (customFoodList.children.length === 0) {
                    customFoodList.style.display = 'none';
                }
            }, 300);
        });
        
        // Add badge with animation
        badge.style.opacity = '0';
        badge.style.transform = 'scale(0.8)';
        customFoodList.appendChild(badge);
        customFoodList.style.display = 'flex'; // Ensure list is visible
        
        // Animate badge appearance
        setTimeout(() => {
            badge.style.opacity = '1';
            badge.style.transform = 'scale(1)';
        }, 10);
        
        // Adjust container size based on number of items
        updateCustomFoodListSize();
        
        // Show message and confirm button
        confirmFoodBtn.style.display = 'inline-block';
        selectedFoodMessage.classList.remove('hidden');
        selectedFoodMessage.classList.add('show');
        
        // Update selection status
        updateFoodSelectionStatus();
        
        // Clear input and focus
        customFoodInput.value = '';
        customFoodInput.focus();
        
        // Scroll to the bottom of the list to show the new item
        setTimeout(() => {
            customFoodList.scrollTop = customFoodList.scrollHeight;
        }, 100);
    }
    
    // Function to update the size of custom food list based on content
    function updateCustomFoodListSize() {
        const customFoodList = document.querySelector('.custom-food-list');
        if (!customFoodList) return;
        
        const itemCount = customFoodList.children.length;
        
        // Remove all size classes
        customFoodList.classList.remove('small', 'medium', 'large');
        
        // Add appropriate size class
        if (itemCount <= 3) {
            customFoodList.classList.add('small');
        } else if (itemCount <= 8) {
            customFoodList.classList.add('medium');
        } else {
            customFoodList.classList.add('large');
        }
    }
    
    // Add custom food functionality
    if (addCustomFoodBtn) {
        addCustomFoodBtn.addEventListener('click', function() {
            addCustomFood();
        });
    }
    
    if (customFoodInput) {
        customFoodInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addCustomFood();
            }
        });
    }
    
    // Handle confirm food button click - Removing Clear My Selection button
    confirmFoodBtn.addEventListener('click', function() {
        if (selectedFoods.length > 0) {
            // Store the selected foods
            localStorage.setItem('selectedFoods', JSON.stringify(selectedFoods));
            
            // Hide confirm button and show final message
            confirmFoodBtn.style.display = 'none';
            finalMessage.classList.remove('hidden');
            setTimeout(() => {
                finalMessage.classList.add('show');
            }, 50);
            
            // Heart celebration
            for (let i = 0; i < 30; i++) {
                setTimeout(() => {
                    const heart = document.createElement('div');
                    heart.classList.add('heart');
                    heart.style.left = '50%';
                    heart.style.top = '50%';
                    const angle = Math.random() * Math.PI * 2;
                    const distance = Math.random() * 150 + 50;
                    const duration = Math.random() * 1 + 1;
                    heart.style.transform = `scale(${Math.random() * 0.5 + 0.5})`;
                    heart.style.opacity = Math.random() * 0.5 + 0.5;
                    
                    heart.animate([
                        { transform: 'translate(-50%, -50%) scale(0.5)', opacity: 1 },
                        { transform: `translate(calc(-50% + ${Math.cos(angle) * distance}px), calc(-50% + ${Math.sin(angle) * distance}px)) scale(0)`, opacity: 0 }
                    ], {
                        duration: duration * 1000,
                        easing: 'cubic-bezier(0.1, 0.8, 0.9, 1)'
                    });
                    
                    foodCelebration.appendChild(heart);
                    
                    setTimeout(() => {
                        heart.remove();
                    }, duration * 1000);
                }, i * 40);
            }
            
            // Start perpetual hearts if they're not already running
            if (perpetualHearts && perpetualHearts.style.display !== 'block') {
                startPerpetualHearts();
            }
            
            // Disable food selection after confirmation
            foodButtons.forEach(btn => {
                btn.disabled = true;
                btn.style.opacity = '0.7';
                btn.style.cursor = 'default';
            });
            
            // Disable custom food input
            if (customFoodInput) {
                customFoodInput.disabled = true;
                addCustomFoodBtn.disabled = true;
                customFoodInput.style.opacity = '0.7';
                addCustomFoodBtn.style.opacity = '0.7';
            }
            
            // No Clear My Selection button anymore
        }
    });
    
    // Next button to go from food to drinks selection
    if (drinksNextBtn) {
        drinksNextBtn.addEventListener('click', function() {
            console.log("Drinks next button clicked"); // Debug log
            // Transition to drinks selection
            foodCard.style.transform = 'scale(0.8)';
            foodCard.style.opacity = '0';
            
            setTimeout(() => {
                foodCard.style.display = 'none';
                drinksCard.style.display = 'block';
                
                setTimeout(() => {
                    drinksCard.classList.remove('hidden');
                    drinksCard.style.opacity = '1';
                    drinksCard.style.transform = 'scale(1)';
                    
                    // Create some hearts in the drinks card
                    for (let i = 0; i < 15; i++) {
                        setTimeout(() => {
                            createHeart(document.getElementById('drinks-celebration'));
                        }, i * 100);
                    }
                }, 50);
            }, 500);
        });
    }
    
    // Drinks selection with toggle functionality
    drinkButtons.forEach(button => {
        button.classList.remove('selected');
        button.addEventListener('click', function() {
            const selectedDrink = this.getAttribute('data-drink');
            const isSelected = this.classList.contains('selected');
            
            if (isSelected) {
                // Toggle off: Remove from selected drinks with animation
                this.classList.add('unselecting');
                this.classList.remove('selected');
                selectedDrinks = selectedDrinks.filter(drink => drink !== selectedDrink);
                
                // Remove animation class after transition
                setTimeout(() => {
                    this.classList.remove('unselecting');
                }, 300);
            } else {
                // Toggle on: Add to selected drinks with animation
                this.classList.add('selecting');
                this.classList.add('selected');
                selectedDrinks.push(selectedDrink);
                
                // Add heart burst when selecting
                createHeartBurst(this, 5);
                
                // Remove animation class after transition
                setTimeout(() => {
                    this.classList.remove('selecting');
                }, 300);
            }
            
            // Update drink selection status
            updateDrinkSelectionStatus();
            
            // Show/hide continue button based on selection
            if (selectedDrinks.length > 0) {
                confirmDrinkBtn.style.display = 'inline-block';
                selectedDrinkMessage.classList.remove('hidden');
                selectedDrinkMessage.classList.add('show');
            } else {
                confirmDrinkBtn.style.display = 'none';
                selectedDrinkMessage.classList.remove('show');
                selectedDrinkMessage.classList.add('hidden');
            }
        });
    });
    
    // Function to update drink selection status
    function updateDrinkSelectionStatus() {
        // Get or create status container
        let statusContainer = document.getElementById('drink-selection-status');
        if (!statusContainer) {
            statusContainer = document.createElement('div');
            statusContainer.id = 'drink-selection-status';
            statusContainer.className = 'drink-selection-status';
            
            // Insert before the custom drink container
            const parent = document.querySelector('#drinks-card .location-options').parentNode;
            parent.insertBefore(statusContainer, document.getElementById('custom-drink-container'));
        }
        
        // Update status text
        if (selectedDrinks.length === 0) {
            statusContainer.innerHTML = 'No drinks selected yet';
            statusContainer.style.opacity = '0.5';
        } else {
            const regularDrinks = selectedDrinks.filter(drink => !drink.startsWith('custom:'));
            
            statusContainer.innerHTML = `Selected: ${selectedDrinks.length} ${selectedDrinks.length > 1 ? 'drinks' : 'drink'} ''}`;
            statusContainer.style.opacity = '1';
        }
    }
    
    // Handle confirm drink button click
    if (confirmDrinkBtn) {
        confirmDrinkBtn.addEventListener('click', function() {
            if (selectedDrinks.length > 0) {
                // Store the selected drinks
                localStorage.setItem('selectedDrinks', JSON.stringify(selectedDrinks));
                
                // Hide confirm button and show final message
                confirmDrinkBtn.style.display = 'none';
                finalDrinkMessage.classList.remove('hidden');
                setTimeout(() => {
                    finalDrinkMessage.classList.add('show');
                }, 50);
                
                // Heart celebration
                for (let i = 0; i < 30; i++) {
                    setTimeout(() => {
                        const heart = document.createElement('div');
                        heart.classList.add('heart');
                        heart.style.left = Math.random() * 100 + '%';
                        heart.style.top = Math.random() * 100 + '%';
                        heart.style.transform = `scale(${Math.random() * 0.5 + 0.5})`;
                        heart.style.opacity = Math.random() * 0.5 + 0.5;
                        drinksCelebration.appendChild(heart);
                        
                        setTimeout(() => {
                            heart.remove();
                        }, 1000);
                    }, i * 100);
                }
                
                // Disable drink selection after confirmation
                drinkButtons.forEach(btn => {
                    btn.disabled = true;
                    btn.style.opacity = '0.7';
                    btn.style.cursor = 'default';
                });
            }
        });
    }
    
    // Include food selections in beforeunload event
    window.addEventListener('beforeunload', function() {
        // ...existing code...
        localStorage.removeItem('selectedFoods');
    });
    
    // Celebration animation for success
    function celebrateSuccess() {
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.classList.add('heart');
                heart.style.left = Math.random() * 100 + '%';
                heart.style.top = Math.random() * 100 + '%';
                heart.style.animationDuration = Math.random() * 2 + 2 + 's';
                heart.style.opacity = Math.random() * 0.7 + 0.3;
                heart.style.transform = `scale(${Math.random() * 0.8 + 0.5})`;
                celebration.appendChild(heart);
                
                setTimeout(() => {
                    heart.remove();
                }, 4000);
            }, i * 40);
        }
    }
    
    // If somehow the No button is clicked, convert it to Yes
    noBtn.addEventListener('click', function() {
        yesBtn.click();
    });

    // Improved scrollbar decoration function that works on all pages
    function createScrollbarDecoration() {
        const scrollDecoration = document.createElement('div');
        scrollDecoration.className = 'scrollbar-decoration';
        
        // Add floating hearts
        for (let i = 1; i <= 3; i++) {
            const heart = document.createElement('div');
            heart.className = `scrollbar-heart scroll-h${i}`;
            scrollDecoration.appendChild(heart);
        }
        
        document.body.appendChild(scrollDecoration);
        
        // Show scrollbar decoration when scrolling is possible
        function checkScrollable() {
            const isBodyScrollable = document.body.scrollHeight > window.innerHeight;
            const scrollableContainers = Array.from(document.querySelectorAll('.container')).filter(
                el => el.scrollHeight > el.clientHeight
            );
            
            if (isBodyScrollable || scrollableContainers.length > 0) {
                scrollDecoration.style.opacity = '0.7';
            } else {
                scrollDecoration.style.opacity = '0.4';
            }
        }
        
        // Check on load and resize
        checkScrollable();
        window.addEventListener('resize', checkScrollable);
        
        // Enhance visibility during scrolling
        document.addEventListener('scroll', function() {
            scrollDecoration.style.opacity = '1';
            
            // Return to normal opacity after a delay
            clearTimeout(scrollDecoration.timeoutId);
            scrollDecoration.timeoutId = setTimeout(() => {
                checkScrollable();
            }, 800);
        }, true);
        
        // Monitor DOM changes that might affect scrollability
        const observer = new MutationObserver(checkScrollable);
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['style', 'class']
        });
    }

    // Call function to create scrollbar decoration
    createScrollbarDecoration();

    // Add shimmer animation to gorgeous text
    const gorgeousText = document.querySelector('.gorgeous');
    if (gorgeousText) {
        gorgeousText.addEventListener('mouseover', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'shimmer 2s linear infinite';
            }, 10);
        });
    }

    // Enhanced nervous cat with automatic sweat drop creation
    if (nervousCat) {
        // Function to add random sweat drops dynamically
        function addRandomSweatDrop() {
            const sweatDrops = nervousCat.querySelector('.sweat-drops');
            if (sweatDrops) {
                const extraDrop = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
                extraDrop.classList.add('sweat-drop');
                
                // Randomize the position of the sweat drop
                const baseX = 1650 + Math.random() * 400;  
                const baseY = 1750 + Math.random() * 200;
                const radiusX = 15 + Math.random() * 15;
                const radiusY = radiusX * 1.4;
                
                extraDrop.setAttribute('cx', baseX.toString());
                extraDrop.setAttribute('cy', baseY.toString());
                extraDrop.setAttribute('rx', radiusX.toString());
                extraDrop.setAttribute('ry', radiusY.toString());
                extraDrop.setAttribute('fill', '#a3d9ff');
                
                // Random animation delay
                extraDrop.style.animationDelay = (Math.random() * 0.8) + 's';
                
                sweatDrops.appendChild(extraDrop);
                
                // Remove extra drop after animation
                setTimeout(() => {
                    extraDrop.remove();
                }, 1500);
            }
        }
        
        // Create sweat drops periodically to show intense nervousness
        const sweatInterval = setInterval(addRandomSweatDrop, 300);
        
        // Also add intensity to shaking when mouse moves
        document.addEventListener('mousemove', function(e) {
            // Increase shake intensity when mouse is moving
            nervousCat.style.animation = 'nervousShake 0.15s infinite';
            
            // Add extra sweat drop on mouse movement
            if (Math.random() > 0.7) {  // 30% chance on mouse move
                addRandomSweatDrop();
            }
            
            // Return to normal shake after some time
            clearTimeout(nervousCat.timeoutId);
            nervousCat.timeoutId = setTimeout(() => {
                nervousCat.style.animation = 'nervousShake 0.3s infinite';
            }, 500);
        });
        
        // Clean up interval when page changes
        document.addEventListener('visibilitychange', function() {
            if (document.visibilityState === 'hidden') {
                clearInterval(sweatInterval);
            }
        });
    }

    // Auto-clear data when leaving the page
    window.addEventListener('beforeunload', function() {
        localStorage.removeItem('selectedLocations');
        localStorage.removeItem('dateOptions');
    });
    
    // Handle next button to show completion page with proper centering
    if (completionNextBtn) {
        completionNextBtn.addEventListener('click', function() {
            // Hide drinks card with animation
            drinksCard.style.transform = 'scale(0.8)';
            drinksCard.style.opacity = '0';
            
            setTimeout(() => {
                drinksCard.style.display = 'none';
                
                // Show completion card
                completionCard.style.display = 'block';
                
                setTimeout(() => {
                    completionCard.classList.add('show');
                    
                    // Scroll to top
                    document.body.scrollTop = 0; // For Safari
                    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
                    
                    // Create completion celebration effects
                    createCompletionCelebration();
                }, 50);
            }, 500);
        });
    }
    
    // Create completion celebration with lots of hearts
    function createCompletionCelebration() {
        // Initial burst of hearts
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.classList.add('heart');
                
                // Random position
                const startX = 50 + (Math.random() * 20 - 10); // Center-ish
                const startY = 70 + (Math.random() * 20 - 10); // Bottom-ish
                
                heart.style.left = startX + '%';
                heart.style.top = startY + '%';
                
                // Random size
                const size = Math.random() * 30 + 10; // 10-40px
                heart.style.width = size + 'px';
                heart.style.height = size + 'px';
                
                // Random animation duration
                const duration = Math.random() * 3 + 2; // 2-5 seconds
                heart.style.animationDuration = duration + 's';
                
                // Random opacity
                heart.style.opacity = Math.random() * 0.7 + 0.3;
                
                completionHearts.appendChild(heart);
                
                // Remove after animation
                setTimeout(() => {
                    heart.remove();
                }, duration * 1000);
            }, i * 30);
        }
        
        // Continuous hearts
        setInterval(() => {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            
            // Random position from bottom
            const startX = Math.random() * 100;
            heart.style.left = startX + '%';
            heart.style.top = '100%';
            
            // Random size
            const size = Math.random() * 20 + 10; // 10-30px
            heart.style.width = size + 'px';
            heart.style.height = size + 'px';
            
            // Random animation
            const duration = Math.random() * 4 + 3; // 3-7 seconds
            heart.style.animationDuration = duration + 's';
            
            // Random starting delay
            heart.style.animationDelay = Math.random() + 's';
            
            completionHearts.appendChild(heart);
            
            // Remove after animation
            setTimeout(() => {
                heart.remove();
            }, duration * 1000 + 1000);
        }, 300);
    }
    
    // Celebration animation for success
    function celebrateSuccess() {
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.classList.add('heart');
                heart.style.left = Math.random() * 100 + '%';
                heart.style.top = Math.random() * 100 + '%';
                heart.style.animationDuration = Math.random() * 2 + 2 + 's';
                heart.style.opacity = Math.random() * 0.7 + 0.3;
                heart.style.transform = `scale(${Math.random() * 0.8 + 0.5})`;
                celebration.appendChild(heart);
                
                setTimeout(() => {
                    heart.remove();
                }, 4000);
            }, i * 40);
        }
    }
    
    // If somehow the No button is clicked, convert it to Yes
    noBtn.addEventListener('click', function() {
        yesBtn.click();
    });

    // Improved scrollbar decoration function that works on all pages
    function createScrollbarDecoration() {
        const scrollDecoration = document.createElement('div');
        scrollDecoration.className = 'scrollbar-decoration';
        
        // Add floating hearts
        for (let i = 1; i <= 3; i++) {
            const heart = document.createElement('div');
            heart.className = `scrollbar-heart scroll-h${i}`;
            scrollDecoration.appendChild(heart);
        }
        
        document.body.appendChild(scrollDecoration);
        
        // Show scrollbar decoration when scrolling is possible
        function checkScrollable() {
            const isBodyScrollable = document.body.scrollHeight > window.innerHeight;
            const scrollableContainers = Array.from(document.querySelectorAll('.container')).filter(
                el => el.scrollHeight > el.clientHeight
            );
            
            if (isBodyScrollable || scrollableContainers.length > 0) {
                scrollDecoration.style.opacity = '0.7';
            } else {
                scrollDecoration.style.opacity = '0.4';
            }
        }
        
        // Check on load and resize
        checkScrollable();
        window.addEventListener('resize', checkScrollable);
        
        // Enhance visibility during scrolling
        document.addEventListener('scroll', function() {
            scrollDecoration.style.opacity = '1';
            
            // Return to normal opacity after a delay
            clearTimeout(scrollDecoration.timeoutId);
            scrollDecoration.timeoutId = setTimeout(() => {
                checkScrollable();
            }, 800);
        }, true);
        
        // Monitor DOM changes that might affect scrollability
        const observer = new MutationObserver(checkScrollable);
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['style', 'class']
        });
    }

    // Call function to create scrollbar decoration
    createScrollbarDecoration();


    // Enhanced nervous cat with automatic sweat drop creation
    if (nervousCat) {
        // Function to add random sweat drops dynamically
        function addRandomSweatDrop() {
            const sweatDrops = nervousCat.querySelector('.sweat-drops');
            if (sweatDrops) {
                const extraDrop = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
                extraDrop.classList.add('sweat-drop');
                
                // Randomize the position of the sweat drop
                const baseX = 1650 + Math.random() * 400;  
                const baseY = 1750 + Math.random() * 200;
                const radiusX = 15 + Math.random() * 15;
                const radiusY = radiusX * 1.4;
                
                extraDrop.setAttribute('cx', baseX.toString());
                extraDrop.setAttribute('cy', baseY.toString());
                extraDrop.setAttribute('rx', radiusX.toString());
                extraDrop.setAttribute('ry', radiusY.toString());
                extraDrop.setAttribute('fill', '#a3d9ff');
                
                // Random animation delay
                extraDrop.style.animationDelay = (Math.random() * 0.8) + 's';
                
                sweatDrops.appendChild(extraDrop);
                
                // Remove extra drop after animation
                setTimeout(() => {
                    extraDrop.remove();
                }, 1500);
            }
        }
        
        // Create sweat drops periodically to show intense nervousness
        const sweatInterval = setInterval(addRandomSweatDrop, 300);
        
        // Also add intensity to shaking when mouse moves
        document.addEventListener('mousemove', function(e) {
            // Increase shake intensity when mouse is moving
            nervousCat.style.animation = 'nervousShake 0.15s infinite';
            
            // Add extra sweat drop on mouse movement
            if (Math.random() > 0.7) {  // 30% chance on mouse move
                addRandomSweatDrop();
            }
            
            // Return to normal shake after some time
            clearTimeout(nervousCat.timeoutId);
            nervousCat.timeoutId = setTimeout(() => {
                nervousCat.style.animation = 'nervousShake 0.3s infinite';
            }, 500);
        });
        
        // Clean up interval when page changes
        document.addEventListener('visibilitychange', function() {
            if (document.visibilityState === 'hidden') {
                clearInterval(sweatInterval);
            }
        });
    }

    // Auto-clear data when leaving the page
    window.addEventListener('beforeunload', function() {
        localStorage.removeItem('selectedLocations');
        localStorage.removeItem('dateOptions');
    });

    // Check for any pre-selected buttons and remove the selection
    document.querySelectorAll('.location-btn.selected').forEach(button => {
        if (!button.getAttribute('data-manually-selected')) {
            button.classList.remove('selected');
        }
    });
    
    // Alternative approach without confirmation (will run automatically)
    window.addEventListener('beforeunload', function() {
        localStorage.removeItem('selectedLocations');
        localStorage.removeItem('dateOptions'); 
        // localStorage.removeItem('darkMode');
    });
    
    // Define empty updateLocationCounter function to prevent errors
    function updateLocationCounter() {
        // This function is intentionally left empty as we're not displaying the counter
    }

    // Add heart trail effect for mouse movement
    const heartTrailContainer = document.createElement('div');
    heartTrailContainer.className = 'heart-trail-container';
    document.body.appendChild(heartTrailContainer);
    
    // Track mouse position for heart trail
    let mouseX = 0;
    let mouseY = 0;
    
    // Update mouse position
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Create heart every few movements - increased probability for density
        if (Math.random() > 0.7) { // Changed from 0.9 to 0.7 for more hearts
            createHeartAtCursor();
        }
    });
    
    // Enhanced heart cursor function with more random effects
    function createHeartAtCursor() {
        const heart = document.createElement('div');
        heart.className = 'cursor-heart';
        heart.style.left = mouseX + 'px';
        heart.style.top = mouseY + 'px';
        
        // Random size and opacity for variation
        const size = Math.random() * 15 + 8; // Between 8px and 23px
        const opacity = Math.random() * 0.5 + 0.5; // Between 0.5 and 1
        
        // Random movement direction
        const randomX = (Math.random() * 2 - 1); // Between -1 and 1
        heart.style.setProperty('--random-x', randomX);
        
        heart.style.width = size + 'px';
        heart.style.height = size + 'px';
        heart.style.opacity = opacity;
        
        heartTrailContainer.appendChild(heart);
        
        // Remove heart after animation completes
        setTimeout(() => {
            heart.remove();
        }, 1500); // Match this with CSS animation duration
    }

    // Function to update food selection status - UPDATED
    function updateFoodSelectionStatus() {
        console.log("Updating food selection status");
        
        // Get status container (now placed above options)
        const statusContainer = document.getElementById('food-selection-status');
        
        if (!statusContainer) return;
        
        // Update status text
        if (selectedFoods.length === 0) {
            statusContainer.classList.remove('active');
            statusContainer.innerHTML = '<p>Select your food preferences</p>';
        } else {
            statusContainer.classList.add('active');
            statusContainer.innerHTML = `<p>${selectedFoods.length} option${selectedFoods.length > 1 ? 's' : ''} selected</p>`;
        }
    }

    // Function to update drink selection status - UPDATED
    function updateDrinkSelectionStatus() {
        console.log("Updating drink selection status");
        
        // Get status container (now placed above options)
        const statusContainer = document.getElementById('drink-selection-status');
        
        if (!statusContainer) return;
        
        // Update status text
        if (selectedDrinks.length === 0) {
            statusContainer.classList.remove('active');
            statusContainer.innerHTML = '<p>Chọn sở thích đồ uống của bạn.</p>';
        } else {
            statusContainer.classList.add('active');
            statusContainer.innerHTML = `<p>${selectedDrinks.length} option${selectedDrinks.length > 1 ? 's' : ''} selected</p>`;
        }
    }

    // Food selection with toggle functionality - FIXED
    if (foodButtons && foodButtons.length > 0) {
        console.log("Setting up food buttons handlers, found:", foodButtons.length, "buttons");
        
        foodButtons.forEach(button => {
            button.classList.remove('selected');
            
            button.addEventListener('click', function() {
                const selectedFood = this.getAttribute('data-food');
                const isSelected = this.classList.contains('selected');

                if (isSelected) {
                    this.classList.remove('selected');
                    selectedFoods = selectedFoods.filter(food => food !== selectedFood);
                }
                else {
                    this.classList.add('selected');
                    selectedFoods.push(selectedFood);
                    
                    // Add heart burst effect
                    createHeartBurst(this, 15);
                }

                // Show/hide continue button based on selection
                if (selectedFoods.length > 0) {
                    confirmFoodBtn.style.display = 'inline-block';
                    selectedFoodMessage.classList.remove('hidden');
                    selectedFoodMessage.classList.add('show');
                }
                else {
                    confirmFoodBtn.style.display = 'none';
                    selectedFoodMessage.classList.remove('show');
                    selectedFoodMessage.classList.add('hidden');
                }
                    
                // Update status - now located above the options
                updateFoodSelectionStatus();
            });
        });
    }

    // Similar fix for drink buttons - UPDATED
    if (drinkButtons && drinkButtons.length > 0) {
        console.log("Setting up drink buttons handlers, found:", drinkButtons.length, "buttons");
        
        drinkButtons.forEach(button => {
            button.classList.remove('selected');
            
            button.addEventListener('click', function() {
                const selectedDrink = this.getAttribute('data-drink');
                const isSelected = this.classList.contains('selected');
                
                if (isSelected) {
                    this.classList.remove('selected');
                    selectedDrinks = selectedDrinks.filter(drink => drink !== selectedDrink);
                } else {
                    this.classList.add('selected');
                    selectedDrinks.push(selectedDrink);
                        
                    // Add heart burst effect
                    createHeartBurst(this, 15);
                }
                    
                // Show/hide continue button based on selection
                if (selectedDrinks.length > 0) {
                    confirmDrinkBtn.style.display = 'inline-block';
                    selectedDrinkMessage.classList.remove('hidden');                        selectedDrinkMessage.classList.add('show');
                } else {
                    confirmDrinkBtn.style.display = 'none';
                    selectedDrinkMessage.classList.remove('show');
                    selectedDrinkMessage.classList.add('hidden');
                }
                // Update status - now located above the options
                updateDrinkSelectionStatus();
            });
        });
    }

    // Initialize status containers if needed
    if (foodCard) updateFoodSelectionStatus();
    if (drinksCard) updateDrinkSelectionStatus();
    
    
    // Handle next button to show completion page with proper centering
    if (completionNextBtn) {
        completionNextBtn.addEventListener('click', function() {
            // Hide drinks card with animation
            drinksCard.style.transform = 'scale(0.8)';
            drinksCard.style.opacity = '0';
            
            setTimeout(() => {
                drinksCard.style.display = 'none';
                
                // Show completion card
                completionCard.style.display = 'block';
                
                setTimeout(() => {
                    completionCard.classList.add('show');
                    
                    // Scroll to top
                    document.body.scrollTop = 0; // For Safari
                    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
                    
                    // Create completion celebration effects
                    createCompletionCelebration();
                }, 50);
            }, 500);
        });
    }
    
    // Create completion celebration with lots of hearts
    function createCompletionCelebration() {
        // Initial burst of hearts
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.classList.add('heart');
                
                // Random position
                const startX = 50 + (Math.random() * 20 - 10); // Center-ish
                const startY = 70 + (Math.random() * 20 - 10); // Bottom-ish
                
                heart.style.left = startX + '%';
                heart.style.top = startY + '%';
                
                // Random size
                const size = Math.random() * 30 + 10; // 10-40px
                heart.style.width = size + 'px';
                heart.style.height = size + 'px';
                
                // Random animation duration
                const duration = Math.random() * 3 + 2; // 2-5 seconds
                heart.style.animationDuration = duration + 's';
                
                // Random opacity
                heart.style.opacity = Math.random() * 0.7 + 0.3;
                
                completionHearts.appendChild(heart);
                
                // Remove after animation
                setTimeout(() => {
                    heart.remove();
                }, duration * 1000);
            }, i * 30);
        }
        
        // Continuous hearts
        setInterval(() => {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            
            // Random position from bottom
            const startX = Math.random() * 100;
            heart.style.left = startX + '%';
            heart.style.top = '100%';
            
            // Random size
            const size = Math.random() * 20 + 10; // 10-30px
            heart.style.width = size + 'px';
            heart.style.height = size + 'px';
            
            // Random animation
            const duration = Math.random() * 4 + 3; // 3-7 seconds
            heart.style.animationDuration = duration + 's';
            
            // Random starting delay
            heart.style.animationDelay = Math.random() + 's';
            
            completionHearts.appendChild(heart);
            
            // Remove after animation
            setTimeout(() => {
                heart.remove();
            }, duration * 1000 + 1000);
        }, 300);
    }
});