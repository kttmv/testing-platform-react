import { Flex, Heading } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Progress } from './Progress'
import { Questions } from './Questions'
import { Result } from './Result'
import { Test } from './test'
import { Timer } from './Timer'

type Props = {
    test: Test
}

export type AnswersData = {
    [key: string]: string | string[] | null
}

export function Testing({ test }: Props) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(
        parseInt(window.localStorage.getItem('questionIndex') ?? '0')
    )

    useEffect(() => {
        window.localStorage.setItem(
            'questionIndex',
            JSON.stringify(currentQuestionIndex)
        )
    }, [currentQuestionIndex])

    const [timer, setTimer] = useState(
        parseInt(
            window.localStorage.getItem('timer') ?? JSON.stringify(test.time)
        )
    )

    useEffect(() => {
        window.localStorage.setItem('timer', JSON.stringify(timer))
    }, [timer])

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer(timer - 1)
            }, 1000)

            return () => clearInterval(interval)
        }

        setCurrentQuestionIndex(test.questions.length)
        window.localStorage.removeItem('test')
    }, [timer])

    const defaultValues: AnswersData = {}
    for (let i = 0; i < test.questions.length; i++) {
        defaultValues[i] = null
    }

    const form = useForm<AnswersData>({
        defaultValues: JSON.parse(
            window.localStorage.getItem('test') ?? JSON.stringify(defaultValues)
        )
    })

    useEffect(() => {
        window.localStorage.setItem('test', JSON.stringify(form.watch()))
    }, [form.watch()])

    return (
        <Flex width='100vw' height='100vh' justifyContent='center'>
            <Flex
                width='80vw'
                direction='column'
                alignItems='center'
                justifyContent='center'
            >
                <Heading>{test.name}</Heading>
                <Timer
                    test={test}
                    currentQuestionIndex={currentQuestionIndex}
                    timer={timer}
                />

                <Progress
                    test={test}
                    form={form}
                    currentQuestionIndex={currentQuestionIndex}
                />

                {currentQuestionIndex < test.questions.length && (
                    <Questions
                        test={test}
                        form={form}
                        currentQuestionIndex={currentQuestionIndex}
                        setCurrentQuestionIndex={setCurrentQuestionIndex}
                    />
                )}
                {currentQuestionIndex >= test.questions.length && (
                    <Result
                        test={test}
                        form={form}
                        setCurrentQuestionIndex={setCurrentQuestionIndex}
                        setTimer={setTimer}
                    />
                )}
            </Flex>
        </Flex>
    )
}
