/**
 * valentine.js — Логика страницы-валентинки (результат).
 * 
 * Что делает:
 * 1. Декодирует данные из URL (?d=...)
 * 2. Применяет выбранную тему (GIF-ки, цвета, тексты)
 * 3. Обрабатывает кнопку «Нет» (уменьшение + уговоры)
 * 4. Обрабатывает кнопку «Да» (конфетти + сердечки + празднование)
 */

import { themes } from './themes.js';

// =============================================
// 1. Декодирование данных из URL
// =============================================

/**
 * Парсим параметр ?d= из URL.
 * Формат: Base64(encodeURIComponent(JSON))
 * 
 * @returns {Object|null} — данные валентинки или null при ошибке
 */
function decodeValentineData() {
    try {
        const params = new URLSearchParams(window.location.search);
        const encoded = params.get('d');
        if (!encoded) return null;

        // atob раскодирует Base64, decodeURIComponent — UTF-8 (кириллицу)
        const jsonString = decodeURIComponent(atob(encoded));
        const data = JSON.parse(jsonString);

        // Проверяем обязательные поля
        if (!data.from || !data.to || !data.question || !data.style) {
            return null;
        }

        // Проверяем что стиль существует
        if (!themes[data.style]) {
            return null;
        }

        return data;
    } catch (error) {
        console.error('Failed to decode valentine data:', error);
        return null;
    }
}

// =============================================
// 2. Инициализация страницы
// =============================================

/** Счётчик нажатий кнопки «Нет» */
let noClickCount = 0;

/** Текущая тема (объект из themes.js) */
let currentTheme = null;

/** Данные валентинки */
let valentineData = null;

/**
 * Настраиваем страницу по данным из URL
 */
function initValentine(data) {
    valentineData = data;
    currentTheme = themes[data.style];

    // Устанавливаем фон темы
    document.body.style.background = currentTheme.bgGradient;

    // Имя получателя
    document.getElementById('recipientName').textContent = `${data.to}, это для тебя ✨`;

    // Вопрос
    document.getElementById('questionText').textContent = data.question;

    // Первая GIF-ка (начальная, милая)
    document.getElementById('themeGif').src = currentTheme.gifs[0];

    // Подготавливаем экран празднования
    document.getElementById('celebrationGif').src = currentTheme.yesGif;
    document.getElementById('yesText').textContent = currentTheme.yesText;
    document.getElementById('coupleNames').innerHTML =
        `${data.from} <span class="heart-icon">❤️</span> ${data.to}`;

    // Показываем экран вопроса
    document.getElementById('questionScreen').style.display = 'block';
}

// =============================================
// 3. Кнопка «Нет» — уменьшение + уговоры
// =============================================

function handleNo() {
    noClickCount++;

    const btnNo = document.getElementById('btnNo');
    const btnYes = document.getElementById('btnYes');
    const persuasionText = document.getElementById('noPersuasion');
    const gif = document.getElementById('themeGif');

    const maxStages = currentTheme.noTexts.length;

    if (noClickCount >= maxStages) {
        // После всех попыток кнопка «Нет» исчезает
        btnNo.style.display = 'none';
        persuasionText.textContent = 'Кнопка "Нет" самоуничтожилась... Нажми Да! 😤❤️';
        return;
    }

    // Обновляем текст-уговор (с анимацией shake через CSS)
    persuasionText.textContent = currentTheme.noTexts[noClickCount - 1];
    // Перезапускаем анимацию
    persuasionText.style.animation = 'none';
    // Trigger reflow для перезапуска анимации
    void persuasionText.offsetHeight;
    persuasionText.style.animation = 'shake 0.4s ease';

    // Уменьшаем кнопку «Нет»
    btnNo.className = `btn-no shrink-${Math.min(noClickCount, 7)}`;

    // Увеличиваем кнопку «Да» с каждым нажатием
    const yesScale = 1 + noClickCount * 0.1;
    btnYes.style.transform = `scale(${yesScale})`;
    btnYes.classList.add('growing');
    setTimeout(() => btnYes.classList.remove('growing'), 500);

    // Меняем GIF-ку (всё более грустную)
    const gifIndex = Math.min(noClickCount, currentTheme.gifs.length - 1);
    gif.src = currentTheme.gifs[gifIndex];
}

// =============================================
// 4. Кнопка «Да» — празднование!
// =============================================

function handleYes() {
    // Прячем экран вопроса
    document.getElementById('questionScreen').style.display = 'none';

    // Показываем экран празднования
    const yesScreen = document.getElementById('yesScreen');
    yesScreen.classList.add('visible');

    // Меняем фон на праздничный
    document.body.style.background =
        'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fdfcfb 100%)';

    // Запускаем конфетти
    launchConfetti();

    // Запускаем падающие сердечки
    launchFallingHearts();
}

// =============================================
// 5. Конфетти (Canvas анимация)
// =============================================

function launchConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettiPieces = [];
    const colors = ['#ff6b8a', '#ff4757', '#6c5ce7', '#fd79a8', '#ffeaa7', '#00b894', '#e17055', '#dfe6e9'];

    // Создаём 150 кусочков конфетти
    for (let i = 0; i < 150; i++) {
        confettiPieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height, // Начинают сверху
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

    let animationFrame;

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let activeCount = 0;
        confettiPieces.forEach((piece) => {
            if (piece.opacity <= 0) return;
            activeCount++;

            piece.x += piece.speedX;
            piece.y += piece.speedY;
            piece.rotation += piece.rotationSpeed;

            // Замедляем и гасим конфетти, когда оно ниже экрана
            if (piece.y > canvas.height) {
                piece.opacity -= 0.02;
            }

            ctx.save();
            ctx.translate(piece.x, piece.y);
            ctx.rotate((piece.rotation * Math.PI) / 180);
            ctx.globalAlpha = piece.opacity;
            ctx.fillStyle = piece.color;
            ctx.fillRect(-piece.width / 2, -piece.height / 2, piece.width, piece.height);
            ctx.restore();
        });

        if (activeCount > 0) {
            animationFrame = requestAnimationFrame(animate);
        }
    }

    animate();

    // Повторяем конфетти через 3 секунды
    setTimeout(() => {
        confettiPieces.forEach((piece) => {
            piece.y = Math.random() * canvas.height - canvas.height;
            piece.opacity = 1;
            piece.x = Math.random() * canvas.width;
        });
    }, 3000);
}

// =============================================
// 6. Падающие сердечки
// =============================================

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

// =============================================
// 7. Запуск
// =============================================

function init() {
    const data = decodeValentineData();

    if (!data) {
        // Показываем ошибку, если данные не валидны
        document.getElementById('questionScreen').style.display = 'none';
        document.getElementById('errorScreen').classList.add('visible');
        return;
    }

    initValentine(data);

    // Привязываем кнопки
    document.getElementById('btnYes').addEventListener('click', handleYes);
    document.getElementById('btnNo').addEventListener('click', handleNo);
}

document.addEventListener('DOMContentLoaded', init);
