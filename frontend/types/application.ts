export interface QuestionInterface {
    user_uid: string
    uid: string
    date: Date
    words: string[]
    is_visible: boolean
    is_answer: boolean
}

export interface ResponseInterface {
    question_uid: string
    user_uid: string
    uid: string
    words: string[]
    hit_rate: number
}