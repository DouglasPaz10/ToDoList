const grade = document.querySelector(".grade")

if(!existsIndices()){
  localStorage.setItem('indices', '[]')

}





let indices = JSON.parse(localStorage.getItem('indices'));        

indices.map(indice => {
  let textoResgatado = JSON.parse(localStorage.getItem(indice))
  let textoNota = textoResgatado.texto
  let corNotaPT = (textoResgatado.cor); 
  let corNotaTraduzido = (corNotaPT) => {
    let corNota;
    if (corNotaPT == 'vermelho') {
        corNota = '#FFC3B5';
    } else if (corNotaPT == 'verde') {
        corNota = '#DBFFB4';
    } else if (corNotaPT == 'padrao') {
        corNota = 'antiquewhite';
    } else if (corNotaPT == 'roxo') {
        corNota = '#E0BBE4';
    }
    return corNota;
}

  let divCard =  `
    <div class="card" style="background-color: ${corNotaTraduzido(corNotaPT)}">
      <p>${textoNota}</p>
      <div class="container_attachments">
        <div class="cores">
          <div id="vermelho" onclick="muda_cor(this)"></div>
          <div id="padrao" onclick="muda_cor(this)"></div>
          <div id="verde" onclick="muda_cor(this)"></div>
          <div id="roxo" onclick="muda_cor(this)"></div>
        </div>
        <img onclick="remove(this)" class="lixeira" height="30vw" src="trash.png" alt="">
        <img onclick="atualizar(this)" class="lapis" height="30vw" src="lapis.png" alt="">
      </div>
    </div>`
  grade.innerHTML = grade.innerHTML + divCard
});




function adiciona(){
    let askinfo = prompt('qual a tarefa')
    grade.innerHTML = grade.innerHTML + `
    <div class="card">
    <p>${askinfo}</p>
    <div class="container_attachments">
      <div class="cores">

        <div id="vermelho" onclick="muda_cor(this)"></div>
        <div id="padrao" onclick="muda_cor(this)"></div>
        <div id="verde" onclick="muda_cor(this)"></div>
        <div id="roxo" onclick="muda_cor(this)"></div>

      </div>
    <img onclick="remove(this)" class="lixeira" height="30vw" src="trash.png" alt="">
    <img onclick="atualizar(this)" class="lapis" height="30vw" src="lapis.png" alt="">
    </div>
  </div>
  </div>`

    let informacoes = {
      data: null,
      texto: askinfo,
      cor: null
    }

    let pknota = (localStorage.length+1)

    localStorage.setItem(pknota, JSON.stringify(informacoes))

    ////somando no array de indices
    let array_indices = JSON.parse(localStorage.getItem('indices'))

    array_indices.push(pknota)

    localStorage.setItem('indices',JSON.stringify(array_indices))


}



function remove(self){
  let card = (self.parentNode).parentNode
  let readindices = JSON.parse(localStorage.getItem('indices'))
  let textodiv = card.children[0].textContent


  readindices.map(element =>{
  let textonota = JSON.parse(localStorage.getItem(element))     ////fazer uma func que receba o texto da div e compare com os do 
  textonota = textonota['texto']                                ////localstorage
    

  let indice = readindices.indexOf(element)

  if(textonota == textodiv){
    localStorage.removeItem(element)
    readindices.splice(indice, 1)
    localStorage.removeItem('indices')
    localStorage.setItem("indices", JSON.stringify(readindices))
    

    
  }
  })
  card.remove()

  }




  function atualizar(self){
    let card = self.parentNode.parentNode
    let textodiv = card.children[0].textContent
    let novoTexto = prompt('Qual é o novo texto da tarefa?', textodiv)
    if (novoTexto !== null) {
      card.children[0].textContent = novoTexto;
      let readindices = JSON.parse(localStorage.getItem('indices'));
      readindices.map((element) => {
        let textonota = JSON.parse(localStorage.getItem(element))['texto']
        if(textonota == textodiv){
          let informacoes = JSON.parse(localStorage.getItem(element))
          informacoes['texto'] = novoTexto;
          localStorage.setItem(element, JSON.stringify(informacoes))
        }
      })
    }
  }


function muda_cor(elemnt){
  let cor = elemnt.id;
  let card = elemnt.closest(".card");
  let texto = card.children[0]

  if(cor == 'vermelho'){
    card.style.backgroundColor = '#FFC3B5'
  }

  if(cor == 'verde'){
    card.style.backgroundColor = '#DBFFB4'
  }

  if(cor == 'padrao'){
    card.style.backgroundColor = 'antiquewhite'
  }

  if(cor == 'roxo'){
    card.style.backgroundColor = '#E0BBE4'
  }

  let indices = JSON.parse(localStorage.getItem('indices'))
  let indice = indices.find(i => JSON.parse(localStorage.getItem(i)).texto === texto.textContent)
  let informacao = JSON.parse(localStorage.getItem(indice))
  informacao.cor = cor
  localStorage.setItem(indice, JSON.stringify(informacao))
}


function existsIndices(){
  let result = String(localStorage.getItem('indices'))

  if(result == 'null'){
    return false

  }

  else{
    return true
  }

}

