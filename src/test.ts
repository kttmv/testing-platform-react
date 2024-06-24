export type Grade = {
    name: string
    score: number
}

export type Answer = {
    text: string
    isRight: boolean
}

export type Question = {
    text: string
    answers: Answer[]
}

export type Test = {
    name: string
    time: number
    grades: Grade[]
    questions: Question[]
}
