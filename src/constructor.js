/**
 * constructor.js — Логика страницы-конструктора валентинок.
 * 
 * Что делает:
 * 1. Заполняет форму вариантами вопросов и стилей из themes.js
 * 2. Валидирует ввод пользователя
 * 3. Кодирует данные в Base64 и генерирует уникальную ссылку
 * 4. Позволяет скопировать ссылку и открыть предпросмотр
 */

import { themes, questionPresets } from './themes.js';

// =============================================
// 1. Инициализация формы
// =============================================

/** Заполняем select вариантами вопросов */
function initQuestionSelect() {
    const select = document.getElementById('questionSelect');

    // Добавляем предустановленные варианты
    questionPresets.forEach((preset) => {
        const option = document.createElement('option');
        option.value = preset.text;
        option.textContent = preset.text;
        select.appendChild(option);
    });

    // Вариант "Свой вариант"
    const customOption = document.createElement('option');
    customOption.value = '__custom__';
    customOption.textContent = '✏️ Свой вариант...';
    select.appendChild(customOption);

    // Показываем/скрываем текстовое поле для своего варианта
    select.addEventListener('change', () => {
        const wrapper = document.getElementById('customQuestionWrapper');
        if (select.value === '__custom__') {
            wrapper.classList.add('visible');
            document.getElementById('customQuestion').focus();
        } else {
            wrapper.classList.remove('visible');
        }
        // Убираем ошибку при выборе
        document.getElementById('questionGroup').classList.remove('error');
    });
}

/** Заполняем grid стилей карточками */
function initStyleGrid() {
    const grid = document.getElementById('styleGrid');

    Object.entries(themes).forEach(([key, theme], index) => {
        const label = document.createElement('label');
        label.className = 'style-option';
        label.innerHTML = `
      <input type="radio" name="style" value="${key}" ${index === 0 ? 'checked' : ''} />
      <div class="style-card">
        <span class="style-emoji">${theme.emoji}</span>
        <span class="style-name">${theme.name}</span>
        <span class="style-desc">${theme.description}</span>
      </div>
    `;
        grid.appendChild(label);
    });
}

/** Создаём плавающие сердечки на фоне */
function initFloatingHearts() {
    const container = document.getElementById('floatingHearts');
    const heartEmojis = ['💕', '💖', '💗', '💝', '💘', '❤️', '🩷', '🩵'];

    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('span');
        heart.className = 'heart';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.animationDuration = `${8 + Math.random() * 12}s`;
        heart.style.animationDelay = `${Math.random() * 10}s`;
        heart.style.fontSize = `${1 + Math.random() * 1.5}rem`;
        container.appendChild(heart);
    }
}

// =============================================
// 2. Валидация формы
// =============================================

/**
 * Проверяет заполненность обязательных полей.
 * Возвращает объект с данными формы или null при ошибке.
 */
function validateForm() {
    let isValid = true;
    const data = {};

    // Имя отправителя
    const fromName = document.getElementById('fromName').value.trim();
    if (!fromName) {
        document.getElementById('fromGroup').classList.add('error');
        isValid = false;
    } else {
        document.getElementById('fromGroup').classList.remove('error');
        data.from = fromName;
    }

    // Имя получателя
    const toName = document.getElementById('toName').value.trim();
    if (!toName) {
        document.getElementById('toGroup').classList.add('error');
        isValid = false;
    } else {
        document.getElementById('toGroup').classList.remove('error');
        data.to = toName;
    }

    // Вопрос
    const questionSelect = document.getElementById('questionSelect');
    const customQuestion = document.getElementById('customQuestion').value.trim();

    if (!questionSelect.value) {
        document.getElementById('questionGroup').classList.add('error');
        isValid = false;
    } else if (questionSelect.value === '__custom__' && !customQuestion) {
        document.getElementById('questionGroup').classList.add('error');
        isValid = false;
    } else {
        document.getElementById('questionGroup').classList.remove('error');
        data.question = questionSelect.value === '__custom__' ? customQuestion : questionSelect.value;
    }

    // Стиль
    const selectedStyle = document.querySelector('input[name="style"]:checked');
    if (!selectedStyle) {
        document.getElementById('styleGroup').classList.add('error');
        isValid = false;
    } else {
        document.getElementById('styleGroup').classList.remove('error');
        data.style = selectedStyle.value;
    }

    return isValid ? data : null;
}

// =============================================
// 3. Генерация ссылки
// =============================================

/**
 * Кодирует данные формы в Base64 строку.
 * Используем encodeURIComponent для корректной работы с кириллицей.
 * 
 * @param {Object} data — объект с полями from, to, question, style
 * @returns {string} — Base64-закодированная строка
 */
function encodeData(data) {
    const jsonString = JSON.stringify(data);
    // encodeURIComponent нужен для корректной работы btoa с UTF-8 (кириллица)
    const encoded = btoa(encodeURIComponent(jsonString));
    return encoded;
}

/**
 * Формирует полный URL валентинки.
 */
function generateLink(data) {
    const encoded = encodeData(data);
    const baseUrl = window.location.origin;
    return `${baseUrl}/valentine.html?d=${encoded}`;
}

// =============================================
// 4. Event Listeners
// =============================================

function init() {
    initQuestionSelect();
    initStyleGrid();
    initFloatingHearts();

    // Убираем ошибки при вводе
    document.getElementById('fromName').addEventListener('input', () => {
        document.getElementById('fromGroup').classList.remove('error');
    });
    document.getElementById('toName').addEventListener('input', () => {
        document.getElementById('toGroup').classList.remove('error');
    });

    // Обработка отправки формы
    const form = document.getElementById('valentineForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const data = validateForm();
        if (!data) return;

        const link = generateLink(data);

        // Показываем блок с ссылкой
        const linkResult = document.getElementById('linkResult');
        const linkInput = document.getElementById('linkInput');
        const btnPreview = document.getElementById('btnPreview');

        linkInput.value = link;
        btnPreview.href = link;
        linkResult.classList.add('visible');

        // Скроллим к ссылке
        linkResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    // Копирование ссылки в буфер обмена
    const btnCopy = document.getElementById('btnCopy');
    btnCopy.addEventListener('click', async () => {
        const linkInput = document.getElementById('linkInput');
        try {
            await navigator.clipboard.writeText(linkInput.value);
            btnCopy.textContent = '✅ Скопировано!';
            btnCopy.classList.add('copied');
            setTimeout(() => {
                btnCopy.textContent = '📋 Копировать';
                btnCopy.classList.remove('copied');
            }, 2000);
        } catch {
            // Fallback для старых браузеров
            linkInput.select();
            document.execCommand('copy');
            btnCopy.textContent = '✅ Скопировано!';
            setTimeout(() => {
                btnCopy.textContent = '📋 Копировать';
            }, 2000);
        }
    });
}

// Запуск при загрузке
document.addEventListener('DOMContentLoaded', init);
