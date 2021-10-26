import React, { useState } from 'react';
import './App.css';
import GetImages from './components/GetImages';
import api from './config/configApi';

// Vídeo tutorial em https://www.youtube.com/watch?v=kBSckls-Ih4&t=557s
// https://www.youtube.com/watch?v=2QURsze7kyw&list=PLmY5AEiqDWwDWwg4_0lle-3qcLGi-0V5c&index=4
// https://www.youtube.com/watch?v=9kPDwoI4LiE&list=PLmY5AEiqDWwDWwg4_0lle-3qcLGi-0V5c&index=6

function App() {

  //  A variável option conforme o valor setado, carrega o formulario de Upload ou de Select
  const [option, setOption] = useState(null)

  const [image, setImage] = useState()
  const [endImg] = useState('./not-found.png')
  const [status, setStatus] = useState({
    type: '',
    mensagem: ''
  })

  const uploadImage = async e => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('image', image)

    const headers = {
      'headers': {
        'Content-Type': 'application-json'
      }
    }

    await api.post("/upload-image", formData, headers)
      .then((response) => {
        setStatus({
          type: 'success',
          mensagem: response.data.mensagem
        })
      }).catch((err) => {
        if (err.response) {
          setStatus({
            type: 'error',
            mensagem: err.response.data.mensagem
          })
        } else {
          console.log('Erro: tente mais tarde!')
          setStatus({
            type: 'error',
            mensagem: 'Erro: tente mais tarde!'
          })
        }
      })
  }

  const formUpload = () => {
    return (
      <>
        <h1>Upload</h1>
        {status.type === 'success' ? <p style={{ color: "green" }}>{status.mensagem}</p> : ""}
        {status.type === 'error' ? <p style={{ color: "#ff0000" }}>{status.mensagem}</p> : ""}
        <form onSubmit={uploadImage}>
          <label>Imagem</label>
          <input type="file" name="image" onChange={e => setImage(e.target.files[0])} /><br /><br />
          {image ? <img src={URL.createObjectURL(image)} alt="Imagem" width="auto" height="120px" /> : <img src={endImg} alt="Imagem" width="150" height="150" />}
          <button type="submit">Salvar</button>
        </form>
      </>
    )
  }

  const notSelect = () => {
    return (
      <h3 style={{color: "red"}}>Selecione uma das opções acima.</h3>
    )
  }

  const optionSelect = (e) => {
    e.preventDefault()
    try {
      let selectOpt = document.querySelector('input[name=select]:checked').value
      setOption(selectOpt)
    } catch {
      setOption("notSelect")
    }
  }


  return (
    <div className="App">

      <form>
        <p>Selecione a opção desejada:</p>
        <div className="form-radio">
          <div className="dados-form">
            <input type="radio" id="upload1"
              name="select" value="upload" />
            <label htmlFor="contactChoice1">Carregar imagens para a base de dados</label>
          </div>
          <div className="dados-form">
            <input type="radio" id="upload2"
              name="select" value="select" />
            <label htmlFor="contactChoice2">Selecionar imagens na base de dados</label>
          </div>
        </div>
        <div className="dados-form">
          <button type="submit" onClick={(e) => optionSelect(e)} >Submit</button>
        </div>
      </form>

      {option === "upload" ? formUpload() : null}
      {option === "select" ? <GetImages /> : null}
      {option === "notSelect" ? notSelect() : null}
    </div>
  );
}

export default App;
