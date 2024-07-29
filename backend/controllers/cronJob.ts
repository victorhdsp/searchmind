import { CronJob } from "cron";
import ApplicationController from "./application";
import AuthentitcationService from "../model/authentication"

class CronJobService {
    private authentitcationService: AuthentitcationService;
    private applicationController: ApplicationController;

    constructor() {
        this.authentitcationService = new AuthentitcationService();
        this.applicationController = new ApplicationController();
    }

    async generateQuestionJobs(email:string) {
        const user = await this.authentitcationService.login(email)
        user.config?.question_hours.forEach((time) => {
            const cronTime = `${time.split(":")[1]} ${time.split(":")[0]} * * *`
            const questionJob = CronJob.from({
                cronTime,
                onTick: async () => {
                    await this.applicationController.createQuestion(email)
                    questionJob.stop()
                },
                start: true
            })
            questionJob.start()
        })
    }
    
    async createInitialQuestions(email:string) {
        await this.applicationController.createQuestion(email)
        await this.generateQuestionJobs(email);
    }
}
export default CronJobService;