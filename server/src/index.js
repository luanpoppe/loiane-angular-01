const express = require("express")
const cors = require("cors")
const multipart = require("connect-multiparty");
const { path } = require("express/lib/application");
const fs = require("fs")

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: '*',
  optionSuccessStatus: 200
}

app.use(cors(corsOptions))

const multipartMiddleware = multipart({
  uploadDir: './uploads'
})
app.post('/upload', multipartMiddleware, (req, res) => {
  const files = req.files
  console.log(files)
  res.json({
    message: files
  })
})

app.get('/downloadExcel', async (req, res) => {
  try {
    const file = await fs.readFileSync('./uploads/report.xlsx')
    console.log('file')
    if (file) {
      res.download('./uploads/report.xlsx')
    }
  } catch (error) {
    res.status(500).json({
      error: "Arquivo não encontrado"
    })
  }
  console.log("Chegou aqui")
})

app.get('/downloadPDF', (req, res) => {
  res.download('./uploads/report.pdf')
})

app.use((err, req, res, next) => res.json({
  error: err.message
}))

app.listen(8000, () => {
  console.log("Servidor porta 8000")
})
