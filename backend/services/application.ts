import { CronJob } from "cron";
import controller from "../controllers/application";
import model from "../model/authentication"

async function generateQuestionJobs(email:string) {
    const user = await model.login(email)
    user.config?.question_hours.forEach((time) => {
        const cronTime = `${time.split(":")[1]} ${time.split(":")[0]} * * *`
        const questionJob = CronJob.from({
            cronTime,
            onTick: async () => {
                await controller.createQuestion(email)
                questionJob.stop()
            },
            start: true
        })
        questionJob.start()
    })
}

async function createInitialQuestions(email:string) {
    await controller.createQuestion(email)
    await generateQuestionJobs(email);
}

export default {
    createInitialQuestions,
    generateQuestionJobs
}