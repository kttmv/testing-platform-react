import { Button, Text } from '@chakra-ui/react'
import { UseFormReturn } from 'react-hook-form'
import { Grade, Test } from './test'
import { AnswersData } from './Testing'

type Props = {
    test: Test
    form: UseFormReturn<AnswersData, any, undefined>
    setCurrentQuestionIndex: (value: number) => void
    setTimer: (value: number) => void
}

export function Result({
    test,
    form,
    setCurrentQuestionIndex,
    setTimer
}: Props) {
    const answersData = form.watch()

    const score = calculateScore(answersData, test)

    const gradesSorted = structuredClone(test.grades)
    gradesSorted.sort((a, b) => b.score - a.score)

    let grade: Grade | undefined
    for (let g of gradesSorted) {
        if (score >= g.score) {
            grade = g
            break
        }
    }

    const detailedCount = test.questions.filter(
        (x) => x.type === 'detailed'
    ).length

    return (
        <>
            <Text fontWeight='bold' marginTop={25}>
                Правильных ответов: {score}/{test.questions.length}
            </Text>

            {detailedCount > 0 && (
                <Text fontWeight='bold'>
                    Количество развернутых ответов, требующих проверки:{' '}
                    {detailedCount}
                </Text>
            )}

            <Text
                fontWeight='bold'
                marginTop={5}
                color={grade ? 'green' : 'red'}
            >
                Ваша {detailedCount > 0 ? 'предварительная' : 'окончательная'}{' '}
                оценка: {grade ? grade.name : 'Неудовлетворительно'}
            </Text>

            <Button
                marginTop={25}
                onClick={() => {
                    setCurrentQuestionIndex(0)
                    setTimer(test.time)
                    form.reset()
                }}
            >
                Начать заново
            </Button>
        </>
    )
}

function calculateScore(answersData: AnswersData, test: Test) {
    let score = 0

    for (let key in answersData) {
        const questionIndex = parseInt(key)
        const answer = answersData[key]

        if (
            isNaN(questionIndex) ||
            questionIndex < 0 ||
            questionIndex >= test.questions.length
        ) {
            throw new Error('Неверный номер вопроса')
        }

        if (!answer) {
            continue
        }

        const question = test.questions[questionIndex]

        switch (question.type) {
            case 'single': {
                if (typeof answer !== 'string') {
                    throw new Error(
                        'Неправильный тип данных при чтении ответов'
                    )
                }

                if (!question.answers) {
                    throw new Error('Отсутствуют правильные варианты ответов')
                }

                const answerIndex = parseInt(answer)

                if (question.answers[answerIndex].isRight) {
                    score++
                }

                break
            }
            case 'multi': {
                if (!Array.isArray(answer)) {
                    throw new Error(
                        'Неправильный тип данных при чтении ответов'
                    )
                }

                if (!question.answers) {
                    throw new Error('Отсутствуют правильные варианты ответов')
                }

                const answerIndexes = structuredClone(answer).map((x) =>
                    parseInt(x)
                )

                if (
                    answerIndexes.length !==
                    question.answers.filter((x) => x.isRight).length
                ) {
                    continue
                }

                for (let answerIndex of answerIndexes) {
                    if (!question.answers[answerIndex].isRight) {
                        continue
                    }
                }

                score++
                break
            }
            case 'short': {
                if (typeof answer !== 'string') {
                    throw new Error(
                        'Неправильный тип данных при чтении ответов'
                    )
                }

                if (question.answers.length > 0) {
                    for (let questionAnswer of question.answers) {
                        if (
                            formatString(answer) ===
                            formatString(questionAnswer.text)
                        ) {
                            score++
                            break
                        }
                    }
                }

                break
            }
            case 'detailed': {
                break
            }
            default: {
                throw new Error('Неизвестный тип вопроса')
            }
        }
    }

    return score
}

function formatString(str: string) {
    return str.trim().toLowerCase().replace(/\s+/g, ' ')
}
