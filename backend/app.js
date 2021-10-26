const express = require('express');
const cors = require('cors');
const path = require('path')

const app = express();
const uploadUser = require('./middlewares/uploadImage');

// http://localhost:8080/files/users/1635167426604_aniversarionova.png

const Image = require('./models/images');

app.use('/files', express.static(path.resolve(__dirname, 'public', 'upload')))

app.use((req, res, next) => {

    // o segundo parametro da função abaixo "*" indica que qualquer dominio pode fazer uma requisição
    // se for colocado um dominio ou faixa de IP como segundo parametro, 
    // somente aquele dominio ou ip pode fazer requisições
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Autorization");
    app.use(cors());
    next();
});

app.get('/list-image', async (req, res) => {
    await Image.findAll()
    .then((images) => {
        return res.json({
            erro: false,
            images: images,
            url: "http://localhost:8080/files/users/"
        })
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: nenhuma imagem encontrada!"
        })
    })
})

app.post("/upload-image", uploadUser.single('image'), async (req, res) => {

    if (req.file) {
        console.log(req.file);

        await Image.create({ image: req.file.filename })
            .then(() => {
                return res.json({
                    erro: false,
                    mensagem: "Upload realizado com sucesso!"
                });
            }).catch(() => {
                return res.status(400).json({
                    erro: true,
                    mensagem: "Erro: Upload não realizado!"
                });
            })
    }
});

app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});