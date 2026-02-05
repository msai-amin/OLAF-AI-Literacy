import { describe, it, expect } from 'vitest';
import { computeVisionStats } from './visionStats';

describe('computeVisionStats', () => {
    it('counts actual logs correctly', () => {
        const objects = [
            { type: 'log', score: 0.8 },
            { type: 'log', score: 0.4 },
            { type: 'rock', score: 0.3 },
        ];
        const stats = computeVisionStats(objects, 50);
        expect(stats.actualLogs).toBe(2);
    });

    it('counts logsFound and falsePositives by threshold', () => {
        const objects = [
            { type: 'log', score: 0.8 },
            { type: 'log', score: 0.4 },
            { type: 'rock', score: 0.6 },
            { type: 'rock', score: 0.2 },
        ];
        const stats50 = computeVisionStats(objects, 50);
        expect(stats50.logsFound).toBe(1);
        expect(stats50.falsePositives).toBe(1);
        expect(stats50.actualLogs).toBe(2);

        const stats30 = computeVisionStats(objects, 30);
        expect(stats30.logsFound).toBe(2);
        expect(stats30.falsePositives).toBe(1);

        const stats80 = computeVisionStats(objects, 80);
        expect(stats80.logsFound).toBe(1);
        expect(stats80.falsePositives).toBe(0);
    });

    it('recall and precision can be derived', () => {
        const objects = [
            { type: 'log', score: 0.9 },
            { type: 'log', score: 0.3 },
            { type: 'rock', score: 0.5 },
        ];
        const stats = computeVisionStats(objects, 50);
        const recall = stats.actualLogs > 0 ? (stats.logsFound / stats.actualLogs) * 100 : 0;
        const totalDetected = stats.logsFound + stats.falsePositives;
        const precision = totalDetected > 0 ? (stats.logsFound / totalDetected) * 100 : 0;
        expect(recall).toBe(50);
        expect(stats.logsFound).toBe(1);
        expect(stats.falsePositives).toBe(1);
        expect(precision).toBe(50);
    });
});
