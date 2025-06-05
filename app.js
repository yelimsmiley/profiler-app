const express = require('express');
const multer = require('multer');
const path = require('path');
const analyzeFile = require('./analyze');
const analyzeFromDB = require('./analyzeFromDB');
const { sequelize } = require('./models');

const app = express();
const port = 3000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, 'inputFile.txt');
  }
});
const upload = multer({ storage });

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('upload', { result: null });
});

app.post('/upload', upload.single('file'), async (req, res) => {
  const filePath = req.file.path;
  await analyzeFile(filePath);
  const result = await analyzeFromDB();
  console.log('📊 DB 기반 분석 결과:', result);
  res.render('upload', { result: JSON.stringify(result, null, 2) });
});

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`✅ 서버가 http://localhost:${port} 에서 실행 중`);
  });
});