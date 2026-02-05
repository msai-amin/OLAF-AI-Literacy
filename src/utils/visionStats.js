/**
 * Compute detection stats for vision lab. Pure function for testing.
 * @param {Array<{type: string, score: number}>} objects
 * @param {number} threshold - 1-99
 * @returns {{ logsFound: number, falsePositives: number, actualLogs: number }}
 */
export function computeVisionStats(objects, threshold) {
    let found = 0;
    let fps = 0;
    let actual = 0;
    const thresholdRatio = threshold / 100;
    objects.forEach((obj) => {
        if (obj.type === 'log') actual++;
        if (obj.score >= thresholdRatio) {
            if (obj.type === 'log') found++;
            else fps++;
        }
    });
    return { logsFound: found, falsePositives: fps, actualLogs: actual };
}
