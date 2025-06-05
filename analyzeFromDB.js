const { Record } = require('./models');

async function analyzeFromDB() {
  const tasks = ['task1', 'task2', 'task3', 'task4', 'task5'];
  const cores = ['core1', 'core2', 'core3', 'core4', 'core5'];
  const stats = { taskStats: {}, coreStats: {} };

  // Task별 통계
  for (let task of tasks) {
    const records = await Record.findAll({ where: { task } });
    const values = records.map(r => r.value);
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    const std = Math.sqrt(values.reduce((a, b) => a + (b - avg) ** 2, 0) / values.length);

    stats.taskStats[task] = {
      min: Math.min(...values),
      max: Math.max(...values),
      avg: Math.round(avg * 100) / 100,
      std: Math.round(std * 100) / 100
    };
  }

  // Core별 Task 통계
  for (let core of cores) {
    stats.coreStats[core] = {};
    for (let task of tasks) {
      const records = await Record.findAll({ where: { core, task } });
      const values = records.map(r => r.value);
      const avg = values.reduce((a, b) => a + b, 0) / values.length;
      const std = Math.sqrt(values.reduce((a, b) => a + (b - avg) ** 2, 0) / values.length);

      stats.coreStats[core][task] = {
        min: Math.min(...values),
        max: Math.max(...values),
        avg: Math.round(avg * 100) / 100,
        std: Math.round(std * 100) / 100
      };
    }
  }

  return stats;
}

module.exports = analyzeFromDB;