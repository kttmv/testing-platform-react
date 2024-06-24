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

    let score = 0

    for (let key in answersData) {
        const questionIndex = parseInt(key)

        if (
            isNaN(questionIndex) ||
            questionIndex < 0 ||
            questionIndex >= test.questions.length
        ) {
            throw new Error('Неверный номер вопроса')
        }

        if (!answersData[key]) {
            continue
        }

        const answerIndex = parseInt(answersData[key])

        if (test.questions[questionIndex].answers[answerIndex].isRight) {
            score++
        }
    }

    const gradesSorted = structuredClone(test.grades)
    gradesSorted.sort((a, b) => b.score - a.score)

    let grade: Grade | undefined
    for (let g of gradesSorted) {
        if (score >= g.score) {
            grade = g
            break
        }
    }

    return (
        <>
            <Text fontWeight='bold' marginTop={25}>
                Правильных ответов: {score}/{test.questions.length}
            </Text>
            <Text fontWeight='bold' color={grade ? 'green' : 'red'}>
                Ваша оценка: {grade ? grade.name : 'Неудовлетворительно'}
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
