const loadingScreen = document.getElementById('loading-screen');
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const mainCard = document.getElementById('main-card');
const successMsg = document.getElementById('success-message');
const music = document.getElementById('bgMusic');
const animContainer = document.getElementById('animation-container');

let noCount = 0;

// 1. Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => loadingScreen.style.display = 'none', 1000);
    }, 2500); 
});

// 2. The "No" Button Movement Logic
function moveNoButton() {
    if (noCount < 3) {
        // CRITICAL FIX: Move button to <body> so it escapes the card's boundaries
        if (noBtn.parentElement !== document.body) {
            document.body.appendChild(noBtn);
        }

        // Calculate screen limits
        const padding = 30;
        const maxX = window.innerWidth - noBtn.offsetWidth - padding;
        const maxY = window.innerHeight - noBtn.offsetHeight - padding;

        // Random coordinates within the screen
        const x = Math.max(padding, Math.floor(Math.random() * maxX));
        const y = Math.max(padding, Math.floor(Math.random() * maxY));

        // Apply new position
        noBtn.style.position = 'fixed'; // Fixed to the viewport
        noBtn.style.left = x + 'px';
        noBtn.style.top = y + 'px';
        noBtn.style.zIndex = "9999"; // Always on top
        
        noCount++;

        // 3. The "Dare" Logic (Stop moving after 3 tries)
        if (noCount === 3) {
            showPopup("I Dare You Click No, Again! 😤", 3000);
            
            // Wait 1 second, then put it back in the card so she can click it
            setTimeout(() => {
                // Put it back in the button group
                const btnGroup = document.querySelector('.btn-group');
                btnGroup.appendChild(noBtn);
                
                // Reset styles so it sits normally
                noBtn.style.position = 'static'; 
                
                // Clone button to remove the 'mouseover' listener so it stops running
                const newNoBtn = noBtn.cloneNode(true);
                noBtn.parentNode.replaceChild(newNoBtn, noBtn);
                
                // Re-attach ONLY the click event for Heartbreak
                newNoBtn.addEventListener('click', triggerHeartbreak);
                
                // Update our reference variable
                // (We don't need to update the const variable, just use the new element)
            }, 1000);
        }
    }
}

// 4. Heartbreak Sequence
function triggerHeartbreak() {
    const hb = document.getElementById('heartbreak-overlay');
    const currentNoBtn = document.querySelector('#noBtn'); // Get the current active button
    
    hb.classList.remove('hidden');
    document.getElementById('heartbreak-text').innerText = "Mera to Dil todd Ditta... 💔😭";
    
    // Shower Broken Hearts
    const shower = setInterval(() => spawn("💔"), 100);
    
    setTimeout(() => {
        hb.classList.add('hidden');
        if(currentNoBtn) currentNoBtn.style.display = 'none'; // Hide permanently
        clearInterval(shower);
        showPopup("Now click Yes 😒", 4000);
        yesBtn.style.transform = "scale(1.5)";
    }, 3000);
}

// Attach listeners to the initial button
noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('touchstart', (e) => { 
    e.preventDefault(); 
    moveNoButton(); 
});

// 5. Yes Button Celebration
yesBtn.addEventListener('click', () => {
    mainCard.classList.add('hidden');
    successMsg.classList.remove('hidden');
    music.play().catch(() => {});
    setInterval(() => spawn("🌹"), 200);
});

// Helper: Spawn Animation
function spawn(symbol) {
    const el = document.createElement('div');
    el.className = 'falling-el';
    el.innerHTML = symbol;
    el.style.left = Math.random() * 100 + "vw";
    el.style.fontSize = (Math.random() * 20 + 20) + "px";
    animContainer.appendChild(el);
    setTimeout(() => el.remove(), 4000);
}

// Helper: Popup
function showPopup(text, duration) {
    const p = document.getElementById('popup-msg');
    p.innerText = text;
    p.classList.remove('hidden');
    setTimeout(() => p.classList.add('hidden'), duration);
}
