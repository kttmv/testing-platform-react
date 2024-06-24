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
    [key: string]: string | null
}

export function Testing({ test }: Props) {
    const defaultValues: AnswersData = {}
    for (let i = 0; i < test.questions.length; i++) {
        defaultValues[i] = null
    }

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [timer, setTimer] = useState(test.time)

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer(timer - 1)
            }, 1000)

            return () => clearInterval(interval)
        }

        setCurrentQuestionIndex(test.questions.length)
    }, [timer])

    const form = useForm<AnswersData>({ defaultValues })

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
