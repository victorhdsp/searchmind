import { PrismaClient } from "@prisma/client";
import ErrorMessage from "../../../libs/ErrorMessage";

class QuestionHoursService {
    private prisma: PrismaClient;
    
    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async post(config_uid:string, hour: string) {
        const config = await this.prisma.config.findUnique({
            where:{ uid: config_uid }
        })
        if (!config) 
            throw new Error(ErrorMessage.userNoHasSettings);
        if (config.question_hours.includes(hour)) 
            throw new Error(ErrorMessage.dateAlreadyExist);
        await this.prisma.config.update({
            where: { uid: config_uid },
            data: {
                question_hours: [ ...config.question_hours, hour ]
            }
        })
        return true;
    }

    async put(config_uid:string, hour: string, newHour: string) {
        const config = await this.prisma.config.findUnique({
            where:{ uid: config_uid }
        })
        if (!config) 
            throw new Error(ErrorMessage.userNoHasSettings);
        if (!config.question_hours.includes(hour)) 
            throw new Error(ErrorMessage.dateNotExist);
        await this.prisma.config.update({
            where: { uid: config_uid },
            data: {
                question_hours: config.question_hours.map((_hour) => {
                    if (_hour == hour) return newHour;
                    return _hour;
                })
            }
        })
        return true;
    }

    async delete(config_uid:string, hour: string) {
        const config = await this.prisma.config.findUnique({
            where:{ uid: config_uid }
        })
        if (!config) throw new Error(ErrorMessage.userNoHasSettings);
        await this.prisma.config.update({
            where: { uid: config_uid },
            data: {
                question_hours: config.question_hours.filter(
                    (_hour) => hour !== hour
                )
            }
        })
        return true;
    }
}
export default QuestionHoursService;