const fs = require('fs');
const { Record } = require('./models');

async function analyzeFile(filePath) {
  await Record.destroy({ where: {} });

  const lines = fs.readFileSync(filePath, 'utf-8')
    .split('\n')
    .filter(line => line.trim() !== '');

  const data = {};
  for (let line of lines) {
    const [core, ...values] = line.trim().split(/\s+/);
    if (!core.startsWith('core')) continue;
    if (!data[core]) data[core] = {};

    values.forEach((v, i) => {
      const task = `task${i + 1}`;
      const value = parseInt(v);
      data[core][task] = value;

      Record.create({
        core: core,
        task: task,
        value: value
      });
    });
  }

  const stats = {};
  for (let task in data['core1']) {
    const values = Object.keys(data).map(core => data[core][task]);
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    const std = Math.sqrt(values.reduce((a, b) => a + (b - avg) ** 2, 0) / values.length);

    stats[task] = {
      min: Math.min(...values),
      max: Math.max(...values),
      avg: Math.round(avg * 100) / 100,
      std: Math.round(std * 100) / 100
    };
  }

  return stats;
}

module.exports = analyzeFile;
