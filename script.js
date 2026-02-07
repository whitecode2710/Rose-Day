let noCount = 0;
let heartbreakInterval;
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const music = document.getElementById('bgMusic');

// 1. Loading screen
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loading-screen').style.opacity = '0';
        setTimeout(() => document.getElementById('loading-screen').classList.add('hidden'), 1000);
    }, 2000);
});

// 2. Fixed "No" button movement
function moveButton() {
    if (noCount < 3) {
        const maxWidth = window.innerWidth - noBtn.offsetWidth - 20;
        const maxHeight = window.innerHeight - noBtn.offsetHeight - 20;
        noBtn.style.position = 'fixed';
        noBtn.style.left = Math.max(10, Math.random() * maxWidth) + 'px';
        noBtn.style.top = Math.max(10, Math.random() * maxHeight) + 'px';
        noCount++;

        if (noCount === 3) {
            showPopup("I Dare You Click No, Again", 3000);
            setTimeout(() => {
                noBtn.style.position = 'static';
                document.querySelector('.btn-group').appendChild(noBtn);
            }, 3000);
        }
    }
}

noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('touchstart', (e) => { e.preventDefault(); moveButton(); });

// 3. Heartbreak Sequence with SHOWER
noBtn.addEventListener('click', () => {
    if (noCount >= 3) {
        const overlay = document.getElementById('heartbreak-overlay');
        overlay.classList.remove('hidden');
        document.getElementById('heartbreak-text').innerText = "Mera to Dil todd Ditta...";
        
        // Start showing broken hearts shower
        heartbreakInterval = setInterval(() => spawnElement("💔"), 150);

        setTimeout(() => {
            overlay.classList.add('hidden');
            noBtn.classList.add('hidden');
            clearInterval(heartbreakInterval); // Stop hearts
            showPopup("Now click Yes 😒", 4000);
            yesBtn.style.transform = "scale(1.5)";
        }, 3000);
    }
});

// 4. Success / Petals
yesBtn.addEventListener('click', () => {
    document.getElementById('main-card').classList.add('hidden');
    document.getElementById('success-message').classList.remove('hidden');
    music.play();
    setInterval(() => spawnElement("🌹"), 200);
});

function spawnElement(symbol) {
    const el = document.createElement('div');
    el.className = 'falling-element';
    el.innerHTML = symbol;
    el.style.left = Math.random() * 100 + "vw";
    el.style.fontSize = Math.random() * 20 + 20 + "px";
    document.getElementById('animation-container').appendChild(el);
    setTimeout(() => el.remove(), 5000);
}

function showPopup(text, duration) {
    const p = document.getElementById('popup-msg');
    p.innerText = text;
    p.classList.remove('hidden');
    setTimeout(() => p.classList.add('hidden'), duration);
}