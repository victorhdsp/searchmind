import { PrismaClient } from "@prisma/client";
import QuestionHoursService from "./questionHours";
import ErrorMessage from "../../libs/ErrorMessage";

class SettingsService {
    private prisma: PrismaClient;
    private questionHoursService: QuestionHoursService;
    
    constructor() {
        this.prisma = new PrismaClient();
        this.questionHoursService = new QuestionHoursService(this.prisma);
    }

    async addHour(email: string, hour: string) {
        const user = await this.prisma.user.findUnique({ 
            where:{ email },
            include: { config: true }
        })
        if (!user) throw new Error(ErrorMessage.userNotExist);
        if (!user.config) throw new Error(ErrorMessage.userNoHasSettings);
        
        return this.questionHoursService.post(user.config.uid, hour)
    }
    async changeHour(email: string, hour: string, newHour: string) {
        const user = await this.prisma.user.findUnique({ 
            where:{ email },
            include: { config: true }
        })
        if (!user) throw new Error(ErrorMessage.userNotExist);
        if (!user.config) throw new Error(ErrorMessage.userNoHasSettings);

        return this.questionHoursService.put(user.config.uid, hour, newHour)
    }
    async removeHour(email: string, hour: string) {
        const user = await this.prisma.user.findUnique({ 
            where:{ email },
            include: { config: true }
        })
        if (!user) throw new Error(ErrorMessage.userNotExist);
        if (!user.config) throw new Error(ErrorMessage.userNoHasSettings);

        return this.questionHoursService.delete(user.config.uid, hour)
    }

    async getSettings(email: string) {
        const user = await this.prisma.user.findUnique({ 
            where:{ email },
            include: { config: true }
        })
        if (!user) throw new Error(ErrorMessage.userNotExist);
        if (!user.config) throw new Error(ErrorMessage.userNoHasSettings);
        return user.config;
    }
}
export default SettingsService;