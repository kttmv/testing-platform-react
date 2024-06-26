import { Test } from './test'

export const exampleTest: Test = {
    name: 'Основы программирования на JavaScript',
    time: 60,
    grades: [
        {
            name: 'Удовлетворительно',
            score: 4
        },
        {
            name: 'Хорошо',
            score: 6
        },
        {
            name: 'Отлично',
            score: 7
        }
    ],
    questions: [
        {
            text: 'Как объявить переменную для хранения числа?',
            answers: [
                { text: 'let number = "one"', isRight: false },
                { text: 'let number = 1', isRight: true },
                { text: 'let number = true', isRight: false }
            ],
            type: 'single'
        },
        {
            text: 'Как расшифровывается NaN в JavaScript?',
            answers: [{ text: 'Not a Number', isRight: true }],
            type: 'short'
        },
        {
            text: 'Какие из следующих являются циклами в JavaScript?',
            answers: [
                { text: 'for', isRight: true },
                { text: 'while', isRight: true },
                { text: 'repeat until', isRight: false }
            ],
            type: 'multi'
        },
        {
            text: 'Укажите название типа данных (на английском) для логических значений в JavaScript',
            answers: [{ text: 'Boolean', isRight: true }],
            type: 'short'
        },
        {
            text: 'Какие из перечисленных методов массива изменяют исходный массив в JavaScript?',
            answers: [
                { text: 'map()', isRight: false },
                { text: 'filter()', isRight: false },
                { text: 'push()', isRight: true },
                { text: 'pop()', isRight: true },
                { text: 'shift()', isRight: true }
            ],
            type: 'multi'
        },
        {
            text: 'Какие операторы сравнения в JavaScript выполняют приведение типов?',
            answers: [
                { text: '===', isRight: false },
                { text: '!==', isRight: false },
                { text: '==', isRight: true },
                { text: '!=', isRight: true }
            ],
            type: 'multi'
        },
        {
            text: 'Напишите код для создания объекта в JavaScript.',
            type: 'detailed'
        }
    ]
}
