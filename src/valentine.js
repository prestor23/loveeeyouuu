/**
 * valentine.js — Логика страницы-валентинки (результат).
 */

import { themes } from './themes.js';

let noClickCount = 0;
let currentTheme = null;
let valentineData = null;

function decodeValentineData() {
    try {
        const params = new URLSearchParams(window.location.search);
        const encoded = params.get('d');
        if (!encoded) return null;
        const jsonString = decodeURIComponent(atob(encoded));
        const data = JSON.parse(jsonString);
        if (!data.from || !data.to || !data.question || !data.style) return null;
        if (!themes[data.style]) return null;
        return data;
    } catch (error) {
        console.error('Failed to decode valentine data:', error);
        return null;
    }
}

function initValentine(data) {
    valentineData = data;
    currentTheme = themes[data.style];
    document.body.style.background = currentTheme.bgGradient;
    document.getElementById('recipientName').textContent = `${data.to}, это для тебя ✨`;
    document.getElementById('questionText').textContent = data.question;
    document.getElementById('themeGif').src = currentTheme.gifs[0];
    document.getElementById('celebrationGif').src = currentTheme.yesGif;
    document.getElementById('yesText').textContent = data.yesText || currentTheme.yesText;
    document.getElementById('coupleNames').innerHTML =
        `${data.from} <span class="heart-icon">❤️</span> ${data.to}`;
    document.getElementById('questionScreen').style.display = 'block';
}

function handleNo() {
    noClickCount++;
    const btnNo = document.getElementById('btnNo');
    const btnYes = document.getElementById('btnYes');
    const persuasionText = document.getElementById('noPersuasion');
    const gif = document.getElementById('themeGif');
    const maxStages = currentTheme.noTexts.length;

    if (noClickCount >= maxStages) {
        btnNo.style.display = 'none';
        persuasionText.textContent = 'Кнопка "Нет" самоуничтожилась... Нажми Да! 😤❤️';
        return;
    }

    persuasionText.textContent = currentTheme.noTexts[noClickCount - 1];
    persuasionText.style.animation = 'none';
    void persuasionText.offsetHeight;
    persuasionText.style.animation = 'shake 0.4s ease';

    btnNo.className = `btn-no shrink-${Math.min(noClickCount, 7)}`;

    const yesScale = 1 + noClickCount * 0.1;
    btnYes.style.transform = `scale(${yesScale})`;
    btnYes.classList.add('growing');
    setTimeout(() => btnYes.classList.remove('growing'), 500);

    const gifIndex = Math.min(noClickCount, currentTheme.gifs.length - 1);
    gif.src = currentTheme.gifs[gifIndex];
}

function handleYes() {
    document.getElementById('questionScreen').style.display = 'none';
    const yesScreen = document.getElementById('yesScreen');
    yesScreen.classList.add('visible');
    document.body.style.background = 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fdfcfb 100%)';
    launchConfetti();
    launchFallingHearts();
}

function launchConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const confettiPieces = [];
    const colors = ['#ff6b8a', '#ff4757', '#6c5ce7', '#fd79a8', '#ffeaa7', '#00b894', '#e17055', '#dfe6e9'];

    for (let i = 0; i < 150; i++) {
        confettiPieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            width: Math.random() * 10 + 5,
            height: Math.random() * 6 + 3,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 10,
            speedX: (Math.random() - 0.5) * 3,
            speedY: Math.random() * 3 + 2,
            opacity: 1,
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let activeCount = 0;
        confettiPieces.forEach((piece) => {
            if (piece.opacity <= 0) return;
            activeCount++;
            piece.x += piece.speedX;
            piece.y += piece.speedY;
            piece.rotation += piece.rotationSpeed;
            if (piece.y > canvas.height) piece.opacity -= 0.02;
            ctx.save();
            ctx.translate(piece.x, piece.y);
            ctx.rotate((piece.rotation * Math.PI) / 180);
            ctx.globalAlpha = piece.opacity;
            ctx.fillStyle = piece.color;
            ctx.fillRect(-piece.width / 2, -piece.height / 2, piece.width, piece.height);
            ctx.restore();
        });
        if (activeCount > 0) requestAnimationFrame(animate);
    }

    animate();
    setTimeout(() => {
        confettiPieces.forEach((piece) => {
            piece.y = Math.random() * canvas.height - canvas.height;
            piece.opacity = 1;
            piece.x = Math.random() * canvas.width;
        });
    }, 3000);
}

function launchFallingHearts() {
    const container = document.getElementById('fallingHearts');
    const heartEmojis = ['💕', '💖', '💗', '💝', '💘', '❤️', '🩷', '💓', '💞'];

    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('span');
        heart.className = 'heart';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.fontSize = `${1.5 + Math.random() * 2}rem`;
        heart.style.animationDuration = `${3 + Math.random() * 5}s`;
        heart.style.animationDelay = `${Math.random() * 5}s`;
        container.appendChild(heart);
    }
}

function init() {
    const data = decodeValentineData();
    if (!data) {
        document.getElementById('questionScreen').style.display = 'none';
        document.getElementById('errorScreen').classList.add('visible');
        return;
    }
    initValentine(data);
    document.getElementById('btnYes').addEventListener('click', handleYes);
    document.getElementById('btnNo').addEventListener('click', handleNo);
}

document.addEventListener('DOMContentLoaded', init);
