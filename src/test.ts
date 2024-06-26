export type Grade = {
    name: string
    score: number
}

export type Answer = {
    text: string
    isRight?: boolean
}

type BaseQuestion = {
    text: string
    type: string
}

type DetailedQuestion = BaseQuestion & {
    type: 'detailed'
}

type OtherQuestion = BaseQuestion & {
    type: 'single' | 'multi' | 'short'
    answers: Answer[]
}

export type Question = DetailedQuestion | OtherQuestion

export type Test = {
    name: string
    time: number
    grades: Grade[]
    questions: Question[]
}
