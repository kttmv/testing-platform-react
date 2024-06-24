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
                {
                    text: 'let number = "one"',
                    isRight: false
                },
                {
                    text: 'let number = 1',
                    isRight: true
                },
                {
                    text: 'let number = true',
                    isRight: false
                }
            ]
        },
        {
            text: 'Что делает оператор ===?',
            answers: [
                {
                    text: 'Присваивает значение',
                    isRight: false
                },
                {
                    text: 'Сравнивает значения и типы без приведения типов',
                    isRight: true
                },
                {
                    text: 'Сравнивает только значения, приводя типы',
                    isRight: false
                }
            ]
        },
        {
            text: 'Какой метод используется для добавления элемента в конец массива?',
            answers: [
                {
                    text: 'array.unshift()',
                    isRight: false
                },
                {
                    text: 'array.push()',
                    isRight: true
                },
                {
                    text: 'array.pop()',
                    isRight: false
                }
            ]
        },
        {
            text: 'Какое значение имеет undefined?',
            answers: [
                {
                    text: 'Отсутствие значения',
                    isRight: true
                },
                {
                    text: 'Нулевое значение',
                    isRight: false
                },
                {
                    text: 'Пустая строка',
                    isRight: false
                }
            ]
        },
        {
            text: 'Выберите правильный способ создания функции в JavaScript.',
            answers: [
                {
                    text: 'function myFunc() {}',
                    isRight: true
                },
                {
                    text: 'let myFunc = function() {};',
                    isRight: true
                },
                {
                    text: 'Оба варианта верны',
                    isRight: true
                }
            ]
        },
        {
            text: 'Какой метод массива возвращает новый массив, содержащий все элементы, прошедшие проверку, заданную в передаваемой функции?',
            answers: [
                {
                    text: 'filter()',
                    isRight: true
                },
                {
                    text: 'map()',
                    isRight: false
                },
                {
                    text: 'reduce()',
                    isRight: false
                }
            ]
        },
        {
            text: 'Какой объект в JavaScript используется для работы с датами?',
            answers: [
                {
                    text: 'Date',
                    isRight: true
                },
                {
                    text: 'Time',
                    isRight: false
                },
                {
                    text: 'Moment',
                    isRight: false
                }
            ]
        }
    ]
}
