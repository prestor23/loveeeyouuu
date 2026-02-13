/**
 * constructor.js — Логика страницы-конструктора валентинок.
 * 
 * Что делает:
 * 1. Заполняет форму вариантами вопросов и стилей из themes.js
 * 2. Валидирует ввод пользователя
 * 3. Кодирует данные в Base64 и генерирует уникальную ссылку
 * 4. Позволяет скопировать ссылку и открыть предпросмотр
 */

import { themes, questionPresets, yesTextPresets } from './themes.js';

// =============================================
// 1. Инициализация формы
// =============================================

function initQuestionSelect() {
    const select = document.getElementById('questionSelect');

    questionPresets.forEach((preset) => {
        const option = document.createElement('option');
        option.value = preset.text;
        option.textContent = preset.text;
        select.appendChild(option);
    });

    const customOption = document.createElement('option');
    customOption.value = '__custom__';
    customOption.textContent = '✏️ Свой вариант...';
    select.appendChild(customOption);

    select.addEventListener('change', () => {
        const wrapper = document.getElementById('customQuestionWrapper');
        if (select.value === '__custom__') {
            wrapper.classList.add('visible');
            document.getElementById('customQuestion').focus();
        } else {
            wrapper.classList.remove('visible');
        }
        document.getElementById('questionGroup').classList.remove('error');
    });
}

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

function initYesTextSelect() {
    const select = document.getElementById('yesTextSelect');

    yesTextPresets.forEach((preset) => {
        const option = document.createElement('option');
        option.value = preset.text;
        option.textContent = preset.text;
        select.appendChild(option);
    });

    const customOption = document.createElement('option');
    customOption.value = '__custom__';
    customOption.textContent = '✏️ Свой вариант...';
    select.appendChild(customOption);

    select.addEventListener('change', () => {
        const wrapper = document.getElementById('customYesTextWrapper');
        if (select.value === '__custom__') {
            wrapper.classList.add('visible');
            document.getElementById('customYesText').focus();
        } else {
            wrapper.classList.remove('visible');
        }
        document.getElementById('yesTextGroup').classList.remove('error');
    });
}

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

function validateForm() {
    let isValid = true;
    const data = {};

    const fromName = document.getElementById('fromName').value.trim();
    if (!fromName) {
        document.getElementById('fromGroup').classList.add('error');
        isValid = false;
    } else {
        document.getElementById('fromGroup').classList.remove('error');
        data.from = fromName;
    }

    const toName = document.getElementById('toName').value.trim();
    if (!toName) {
        document.getElementById('toGroup').classList.add('error');
        isValid = false;
    } else {
        document.getElementById('toGroup').classList.remove('error');
        data.to = toName;
    }

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

    const selectedStyle = document.querySelector('input[name="style"]:checked');
    if (!selectedStyle) {
        document.getElementById('styleGroup').classList.add('error');
        isValid = false;
    } else {
        document.getElementById('styleGroup').classList.remove('error');
        data.style = selectedStyle.value;
    }

    const yesTextSelect = document.getElementById('yesTextSelect');
    const customYesText = document.getElementById('customYesText').value.trim();

    if (!yesTextSelect.value) {
        document.getElementById('yesTextGroup').classList.add('error');
        isValid = false;
    } else if (yesTextSelect.value === '__custom__' && !customYesText) {
        document.getElementById('yesTextGroup').classList.add('error');
        isValid = false;
    } else {
        document.getElementById('yesTextGroup').classList.remove('error');
        data.yesText = yesTextSelect.value === '__custom__' ? customYesText : yesTextSelect.value;
    }

    return isValid ? data : null;
}

// =============================================
// 3. Генерация ссылки
// =============================================

function encodeData(data) {
    const jsonString = JSON.stringify(data);
    const encoded = btoa(encodeURIComponent(jsonString));
    return encoded;
}

function generateLink(data) {
    const encoded = encodeData(data);
    const currentPath = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
    const baseUrl = window.location.origin + currentPath;
    return `${baseUrl}valentine.html?d=${encoded}`;
}

// =============================================
// 4. Event Listeners
// =============================================

function init() {
    initQuestionSelect();
    initStyleGrid();
    initYesTextSelect();
    initFloatingHearts();

    document.getElementById('fromName').addEventListener('input', () => {
        document.getElementById('fromGroup').classList.remove('error');
    });
    document.getElementById('toName').addEventListener('input', () => {
        document.getElementById('toGroup').classList.remove('error');
    });

    const form = document.getElementById('valentineForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const data = validateForm();
        if (!data) return;

        const link = generateLink(data);

        const linkResult = document.getElementById('linkResult');
        const linkInput = document.getElementById('linkInput');
        const btnPreview = document.getElementById('btnPreview');

        linkInput.value = link;
        btnPreview.href = link;
        linkResult.classList.add('visible');

        linkResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

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
            linkInput.select();
            document.execCommand('copy');
            btnCopy.textContent = '✅ Скопировано!';
            setTimeout(() => {
                btnCopy.textContent = '📋 Копировать';
            }, 2000);
        }
    });
}

document.addEventListener('DOMContentLoaded', init);
