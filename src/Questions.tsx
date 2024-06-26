import {
    Box,
    Button,
    Flex,
    FormLabel,
    Input,
    Text,
    Textarea
} from '@chakra-ui/react'
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
    console.log(form.watch())

    const onSubmit = () => {
        setCurrentQuestionIndex(test.questions.length)
        window.localStorage.removeItem('test')
    }

    let answerTypeString: string
    switch (currentQuestion.type) {
        case 'single': {
            answerTypeString = 'Один вариант ответа'
            break
        }
        case 'multi': {
            answerTypeString = 'Несколько правильных ответов'
            break
        }
        case 'short': {
            answerTypeString = 'Короткий ответ'
            break
        }
        case 'detailed': {
            answerTypeString = 'Развернутый ответ'
            break
        }
        default: {
            throw new Error('Неизвестный тип вопроса')
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <Button type='submit' isDisabled display='none' />

            <Box marginTop={25} width='80vw'>
                <FormLabel fontWeight='bold'>
                    {currentQuestionIndex + 1}. {currentQuestion.text}
                </FormLabel>

                <Text fontStyle='italic'>{answerTypeString}</Text>

                {currentQuestion.type === 'single' ||
                currentQuestion.type === 'multi'
                    ? currentQuestion.answers.map((answer, answerIndex) => (
                          <Box key={answerIndex}>
                              <input
                                  type={
                                      currentQuestion.type === 'single'
                                          ? 'radio'
                                          : 'checkbox'
                                  }
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
                      ))
                    : undefined}

                {currentQuestion.type === 'short' && (
                    <Input
                        id={`${currentQuestionIndex}`}
                        {...form.register(`${currentQuestionIndex}`)}
                    />
                )}

                {currentQuestion.type === 'detailed' && (
                    <Textarea
                        id={`${currentQuestionIndex}`}
                        {...form.register(`${currentQuestionIndex}`)}
                    />
                )}

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
