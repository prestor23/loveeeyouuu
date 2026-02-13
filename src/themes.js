/**
 * themes.js — Данные для 4 стилей валентинок.
 * 
 * GIF-ки подобраны вручную с GIPHY по темам:
 * - cute: обнимающиеся мишки Milk & Mocha, зайчики, плюшевые мишки
 * - dogs: щенки с грустными/радостными глазами
 * - cats: мемные котики (sad cat, crying cat и т.д.)
 * - memes: популярные мемы (sad Keanu, crying Tobey и т.д.)
 */

export const themes = {
    cute: {
        name: 'Милые стикеры 🧸',
        emoji: '🧸',
        description: 'Мишки, зайчики, обнимашки',
        gifs: [
            // Cute bear hug
            'https://media1.giphy.com/media/3oEjHV0z8S7WM4MwnK/giphy.gif',
            // Sad cute face
            'https://media1.giphy.com/media/OPU6wzx8JrHna/giphy.gif',
            // Puppy eyes
            'https://media1.giphy.com/media/l0MYunAI4j10uWbTy/giphy.gif',
            // Crying cute
            'https://media1.giphy.com/media/d2lcHJTzUCRrYDma/giphy.gif',
            // Please cute
            'https://media1.giphy.com/media/Qw4X3FnmFFCPANtlhtK/giphy.gif',
            // Begging
            'https://media1.giphy.com/media/l0HlvtIPdJrkPMEBq/giphy.gif',
            // Very sad
            'https://media1.giphy.com/media/ISOckXDlJQdFi/giphy.gif',
        ],
        yesGif: 'https://media1.giphy.com/media/3oEjI4sFlp73fvEYgw/giphy.gif',
        noTexts: [
            'Нет? Ты уверен(а)?.. 🥺',
            'Может передумаешь?.. 😢',
            'Мишка грустит... 🧸💔',
            'Ну пожааалуйста! 🥹',
            'Я буду ждать... вечно 😭',
            'Последний шанс! 💝',
            'Серьёзно?! Посмотри на этого мишку! 🐻',
            'Ладно... нажми Да и всё 😤❤️',
        ],
        yesText: 'Ура!! 🎉💕 Я знал(а)!!!',
        bgGradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
        accentColor: '#ff6b6b',
    },

    dogs: {
        name: 'Собачки 🐶',
        emoji: '🐶',
        description: 'Грустные и счастливые пёсики',
        gifs: [
            // Happy puppy
            'https://media1.giphy.com/media/4Zo41lhzKt6iZ8xff9/giphy.gif',
            // Sad puppy
            'https://media1.giphy.com/media/hxGlnfOLsMVzy/giphy.gif',
            // Puppy eyes begging
            'https://media1.giphy.com/media/3o6wrvdHFbwBrUFtqo/giphy.gif',
            // Dog sad eyes
            'https://media1.giphy.com/media/VbnUQpnihPSIgIXuZv/giphy.gif',
            // Sad dog meme
            'https://media1.giphy.com/media/W0c3xcZ3F1waI/giphy.gif',
            // Disappointed dog
            'https://media1.giphy.com/media/fSYmbgG5Ij8EF1TBZL/giphy.gif',
            // Crying puppy
            'https://media1.giphy.com/media/ZBQhoZC0nqknSviPqT/giphy.gif',
        ],
        yesGif: 'https://media1.giphy.com/media/hZfm9Pj95F9Mk/giphy.gif',
        noTexts: [
            'Гав?.. Нет?.. 🐕💔',
            'Пёсик расстроен... 🐶😢',
            'Вот такие грустные глазки теперь 🥺',
            'Ну погладь хотя бы... то есть нажми Да! 🐾',
            'Хвостик перестал вилять... 😭',
            'Я принесу тебе палку! Только нажми Да!',
            'Гав-гав-гав (переводим: НАЖМИ ДА) 🐕',
            'Последний гав... 🐶❤️',
        ],
        yesText: 'ГАВ ГАВ ГАВ!!! 🐶🎉💕',
        bgGradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        accentColor: '#e17055',
    },

    cats: {
        name: 'Котики 🐱',
        emoji: '🐱',
        description: 'Грустные и довольные котяры',
        gifs: [
            // Cute cat
            'https://media1.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif',
            // Cat please
            'https://media1.giphy.com/media/BEob5qwFkSJ7G/giphy.gif',
            // Sad cat
            'https://media1.giphy.com/media/VIPdgcooFJHtC/giphy.gif',
            // Cat crying
            'https://media1.giphy.com/media/11BAxHG7paxJcI/giphy.gif',
            // Sad cat meme
            'https://media1.giphy.com/media/qQB37BLnBCmyLNjJGB/giphy.gif',
            // Cat begging
            'https://media1.giphy.com/media/13CoXDiaCcCoyk/giphy.gif',
            // Very sad cat
            'https://media1.giphy.com/media/BezRFKuvBnkKt5ozWp/giphy.gif',
        ],
        yesGif: 'https://media1.giphy.com/media/PoGEIYoaUBEoOWfDoj/giphy.gif',
        noTexts: [
            'Мяу?.. Нет?.. 🐱💔',
            'Котик в шоке... 😿',
            'Усики опустились... 🐈😢',
            'Мур-мур-мур... нажми Да... 🥺',
            'Котик больше не мурлычет 😭',
            'Я скину вазу со стола если не нажмёшь Да! 🏺',
            'Серьёзно?! Котик плачет! 😿😿😿',
            'Последнее мяу... 🐱❤️',
        ],
        yesText: 'МЯЯЯЯУ!!! 🐱🎉💕 МУРРРР!',
        bgGradient: 'linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)',
        accentColor: '#6c5ce7',
    },

    memes: {
        name: 'Русские мемы 😂',
        emoji: '😂',
        description: 'Ждун, Шлёпа и классика',
        gifs: [
            // Shrek happy
            'https://media1.giphy.com/media/tXL4FHPSnVJ0A/giphy.gif',
            // Please meme
            'https://media1.giphy.com/media/l2JhORT5IFnj6ioko/giphy.gif',
            // Sad Keanu
            'https://media1.giphy.com/media/OPU6wzx8JrHna/giphy.gif',
            // Crying meme
            'https://media1.giphy.com/media/d2lcHJTzUCRrYDma/giphy.gif',
            // Cat thumbs up
            'https://media1.giphy.com/media/3ohzdIuqJoo8QdKlnW/giphy.gif',
            // Sad
            'https://media1.giphy.com/media/ISOckXDlJQdFi/giphy.gif',
            // Very sad
            'https://media1.giphy.com/media/d10dMmzBFUVctG/giphy.gif',
        ],
        yesGif: 'https://media1.giphy.com/media/5GoVLqeAOo6PK/giphy.gif',
        noTexts: [
            'Серьёзно? Нет?! 😐',
            'Ну ты даёшь... 🤡',
            'Ждун ждёт твоего "Да"... ⏳',
            'Это что, прикол такой?! 😤',
            'Даже Педро расстроился 🦝',
            'Хомяк в шоке!!! 🐹',
            'Тоби Магуайр плачет из-за тебя! 😭',
            'Ладно, нажимай Да, хватит прикалываться 😤❤️',
        ],
        yesText: 'ЛЕЕЕЕЕТС ГОООО!!! 🎉🕺💃',
        bgGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        accentColor: '#fd79a8',
    },
};

/**
 * Варианты вопросов для конструктора
 */
export const questionPresets = [
    { id: 'classic', text: 'Будешь моей Валентинкой? 💝' },
    { id: 'forever', text: 'Ты моё Всё. Будешь моей навсегда? 💍' },
    { id: 'flirty', text: 'Давай будем вместе не только 14 февраля? 😏' },
    { id: 'honest', text: 'Я не умею красиво говорить, но ты лучшее, что со мной случилось ❤️' },
    { id: 'funny', text: 'Ты — мой краш. И нет, это не обсуждается. Нажми Да 😤' },
    { id: 'romantic', text: 'Каждый день с тобой — как праздник. Будь моей Валентинкой? 🌹' },
];
