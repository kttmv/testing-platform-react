import { Box, Button, Flex, FormLabel } from '@chakra-ui/react'
import { UseFormReturn } from 'react-hook-form'
import { Test } from './test'
import { AnswersData } from './Testing'

type Props = {
    test: Test
    form: UseFormReturn<AnswersData, any, undefined>
    currentQuestionIndex: number
    setCurrentQuestionIndex: (value: number) => void
}

export function Questions({
    test,
    form,
    currentQuestionIndex,
    setCurrentQuestionIndex
}: Props) {
    const currentQuestion = test.questions[currentQuestionIndex]

    const onSubmit = () => {
        setCurrentQuestionIndex(test.questions.length)
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <Box marginTop={25} width='80vw'>
                <FormLabel fontWeight='bold'>
                    {currentQuestionIndex + 1}. {currentQuestion.text}
                </FormLabel>

                {currentQuestion.answers.map((answer, answerIndex) => (
                    <Box key={answerIndex}>
                        <input
                            type='radio'
                            value={answerIndex}
                            id={`${currentQuestionIndex}_${answerIndex}`}
                            {...form.register(`${currentQuestionIndex}`)}
                        />
                        <FormLabel
                            htmlFor={`${currentQuestionIndex}_${answerIndex}`}
                            marginLeft={2}
                            display='inline'
                        >
                            {answer.text}
                        </FormLabel>
                    </Box>
                ))}
                <Flex
                    marginTop={25}
                    direction='row'
                    gap={2.5}
                    justifyContent='center'
                >
                    <Button
                        type='button'
                        isDisabled={currentQuestionIndex === 0}
                        onClick={() => {
                            setCurrentQuestionIndex(currentQuestionIndex - 1)
                        }}
                    >
                        Предыдущий вопрос
                    </Button>
                    {currentQuestionIndex < test.questions.length - 1 && (
                        <Button
                            type='button'
                            onClick={() => {
                                setCurrentQuestionIndex(
                                    currentQuestionIndex + 1
                                )
                            }}
                        >
                            Следующий вопрос
                        </Button>
                    )}
                    {currentQuestionIndex === test.questions.length - 1 && (
                        <Button type='submit'>Завершить тестирование</Button>
                    )}
                </Flex>
            </Box>
        </form>
    )
}
