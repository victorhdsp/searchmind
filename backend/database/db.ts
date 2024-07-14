interface config {
    questionHours: `${string}:${string}`[]
}

interface question {
    uid: string;
    date: string;
    words: string[];
    is_visible: boolean;
}

interface response {
    uid: string;
    question_uid: string;
    words: string[];
    hit_rate: number;
}

interface user {
    uid: string;
    email: string;
    password: string;
    questions: question[]
    responses: response[]
    config: config
}

const users: user[] = []

export default users;