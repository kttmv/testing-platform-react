import { Heading } from '@chakra-ui/react'
import { Test } from './test'

type Props = {
    test: Test
    currentQuestionIndex: number
    timer: number
}

export function Timer({ test, currentQuestionIndex, timer }: Props) {
    if (currentQuestionIndex >= test.questions.length) {
        return <></>
    }

    return (
        <Heading borderWidth={4} padding={2} size='md' marginTop={25}>
            {`${Math.floor(timer / 60)}`.padStart(2, '0')}:
            {`${timer % 60}`.padStart(2, '0')}
        </Heading>
    )
}
