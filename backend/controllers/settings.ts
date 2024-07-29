import ErrorMessage from "../libs/ErrorMessage";
import SettingsService from "../model/settings"

class SettingsController {
    private model: SettingsService;

    constructor() {
        this.model = new SettingsService();
    }

    async getSettings(email: string) {
        return this.model.getSettings(email);
    }

    async addHour(email: string, hour: string) {
        await this.model.addHour(email, hour);
        return this.getSettings(email);
    }
    async changeHour(email: string, hour: string, newHour: string) {
        await this.model.changeHour(email, hour, newHour);
        return this.getSettings(email);
    }
    async removeHour(email: string, hour: string) {
        return this.model.removeHour(email, hour);
    }
}

export default SettingsController;