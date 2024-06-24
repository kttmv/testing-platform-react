import { Box, Flex } from '@chakra-ui/react'
import { UseFormReturn } from 'react-hook-form'
import { Test } from './test'
import { AnswersData } from './Testing'

type Props = {
    test: Test
    form: UseFormReturn<AnswersData, any, undefined>
    currentQuestionIndex: number
}

export function Progress({ test, form, currentQuestionIndex }: Props) {
    return (
        <Flex direction='row' gap={1} width='100%' marginTop={25}>
            {test.questions.map((_, index) => (
                <Box
                    flexGrow={1}
                    minWidth={1}
                    key={index}
                    height={5}
                    backgroundColor={
                        index === currentQuestionIndex
                            ? 'dimgray'
                            : form.watch()[index] === null
                              ? 'lightgray'
                              : 'black'
                    }
                />
            ))}
        </Flex>
    )
}
