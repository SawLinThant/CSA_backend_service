"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CycleDateCalculator = void 0;
class CycleDateCalculator {
    addCycle(from, frequency) {
        if (frequency === 'weekly')
            return this.addWeeks(from, 1);
        return this.addMonthsSafe(from, 1);
    }
    addWeeks(date, weeks) {
        const result = new Date(date);
        result.setUTCDate(result.getUTCDate() + weeks * 7);
        return result;
    }
    addMonthsSafe(date, months) {
        const year = date.getUTCFullYear();
        const month = date.getUTCMonth();
        const day = date.getUTCDate();
        const targetMonth = month + months;
        const targetYear = year + Math.floor(targetMonth / 12);
        const normalizedMonth = ((targetMonth % 12) + 12) % 12;
        const maxDay = new Date(Date.UTC(targetYear, normalizedMonth + 1, 0)).getUTCDate();
        const clampedDay = Math.min(day, maxDay);
        return new Date(Date.UTC(targetYear, normalizedMonth, clampedDay, date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds()));
    }
}
exports.CycleDateCalculator = CycleDateCalculator;
//# sourceMappingURL=CycleDateCalculator.js.map