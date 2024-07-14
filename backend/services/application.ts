import { CronJob } from "cron";
import controller from "../controllers/application";
import model from "../model/authentication"

async function startSeason(email:string) {
    const question = await controller.createQuestion(email)
    
    setTimeout(() => {
        const _question = controller.changeVisibilityOnQuestion(email, question.uid);
        console.log(_question); //Chamar a notificação
    }, 1000 * 60 * 5)
}

async function generateQuestionJobs(email:string) {
    model.login(email).config.questionHours.forEach((time) => {
        const cronTime = `${time.split(":")[1]} ${time.split(":")[0]} * * *`
        const questionJob = CronJob.from({
            cronTime,
            onTick: async () => {
                await startSeason(email)
                questionJob.stop()
            },
            start: true
        })
        questionJob.start()
    })
}

async function createInitialQuestions(email:string) {
    await startSeason(email);
    await generateQuestionJobs(email);
}

export default {
    createInitialQuestions,
    generateQuestionJobs
}