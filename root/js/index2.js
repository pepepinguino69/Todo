/*To Do*/

init()
construirBotonera()
capturarComentarios()

function init(){
    
    dblClickObject={timer: 0,delay:200,prevent:false}
    if(localStorage.getItem('comentariosGuardados2')==undefined)
    {comentariosArr=[]}
    else{
    comentariosArr=JSON.parse(localStorage.getItem('comentariosGuardados2'))
    mostrarComentariosGuardados()}
}
function construirBotonera(){
    newDivPosition=document.querySelector('.contenedor')
    newDiv=document.createElement('div')
    newDiv.setAttribute('id','buttonPanel')
    newDiv.style.display='flex'
    newDiv.style.justifyContent='spaceAround'
    newDiv.style.alignContent='center'
    newDivPosition.appendChild(newDiv)
    newButtonPosition=document.querySelector('#buttonPanel')
    const  buttonPanel=[
    {'id':'borrar','label':'Borrar Tareas'},
    {'id':'comentar','label':'Agregar Tareas'},
    {'id':'selectFiles','label':'Fotos c/ Tareas'}]
    buttonPanel.forEach((e,index)=>{
        newButton=document.createElement('button')
        newButton.setAttribute('id',buttonPanel[index].id)
        newButton.innerText=buttonPanel[index].label
        newButtonPosition.appendChild(newButton)})
    document.querySelector('#borrar').addEventListener('click',(e)=>{localStorage.removeItem('comentariosGuardados2');location.reload()})
    document.querySelector('#selectFiles').addEventListener('click',(e)=>selectFile())   
    document.querySelector('#comentar').addEventListener('click', (e)=>{capturarComentarios(e)})
}
function selectFile(accept = null) {
    return new Promise(async resolve => {
    const fileInputElement = document.createElement('input');
    fileInputElement.type = 'file';
    fileInputElement.style.opacity = '0';
    if (accept) fileInputElement.accept = accept;
    fileInputElement.addEventListener('change', () => {
        const file = fileInputElement.files[0];
        fileSelection= file.name;     
        document.body.removeChild(fileInputElement);
        fotoSelection(fileSelection)
        resolve(file);
        
    });
        document.body.appendChild(fileInputElement);
        setTimeout(_ => {
            fileInputElement.click();
            const onFocus = () => {
                window.removeEventListener('focus', onFocus);
                document.body.addEventListener('mousemove', onMouseMove);
            };
            const onMouseMove = () => {
                document.body.removeEventListener('mousemove', onMouseMove);
                if (!fileInputElement.files.length) {
                    document.body.removeChild(fileInputElement);
                    fileSelection='';
                    resolve(null);
                }
            }
            window.addEventListener('focus', onFocus);
        }, 0);
    });
}
function fotoSelection(fileName){
        prueba={'fecha':fechaEvento(),'tipo':'foto','contenido':fileName ,'terminada':false}
        comentariosArr.push(prueba);
        saveState()
        displayCosas(comentariosArr[comentariosArr.length-1])
}                                              
function mostrarComentariosGuardados(){
    comentariosArr.forEach(e=>{
    displayCosas(e)})
}   
function isDblclick(e){
    dblClickObject.timer = setTimeout(function() {
        if (!dblClickObject.prevent) {
          tachado(e);
        }
        dblClickObject.prevent = false;
      }, dblClickObject.delay);}
    function tachado(event){
    idClicked=event.target.id
    arrPos=parseInt(idClicked.substring(2))   
    comentariosArr[arrPos]['terminada']=!comentariosArr[arrPos]['terminada']
    saveState()
    tipoClick=(document.querySelector('#'+idClicked).textContent)
    if(tipoClick!=""){
        document.querySelector('#'+idClicked).classList.toggle('colorFondo')}
        
    else
        {document.querySelector('#cr'+arrPos).classList.toggle('estadoCruzado')}
}
function borrado(e){
    clearTimeout(dblClickObject.timer);
    dblClickObject.prevent = true;
    idClicked=e.target.id
    arrPos=parseInt(idClicked.substring(2))
    if(confirm("Esta Seguro")){
    removedElements=comentariosArr.splice(arrPos)
    saveState()
    removeFromDom=document.querySelector('#id'+arrPos)
    removeFromDom.parentElement.removeChild(removeFromDom)}
}
function displayCosas(elemento){
    pCount = document.querySelectorAll('p').length
    nuevoP=document.createElement('p')
    nuevoP.setAttribute('id','id'+pCount)
    nuevoP.addEventListener('click',(e)=>isDblclick(e))
    nuevoP.addEventListener('dblclick',(e)=>borrado(e))
    if (elemento.tipo==='comentario'){
        nuevoP.textContent=elemento['fecha']+": "+elemento['contenido']
        if (elemento.terminada){nuevoP.classList.add('colorFondo')}
    }
    else{
        nuevoP.style.heigth='200px'
        imageString='images/'+elemento['contenido']
        nuevoP.classList.add('wrapper')
        idImg='im'+pCount
        nuevoP.innerHTML=`<img id="${idImg}" height="150px" src="${imageString}"/>`
        idCross="cr"+pCount
        if (!elemento.terminada)
            {nuevoP.innerHTML+=`<img id="${idCross}" class="cross-img estadoCruzado" src="http://www.clker.com/cliparts/0/7/e/a/12074327311562940906milker_X_icon.svg.med.png" />`}
        else
            {nuevoP.innerHTML+=`<img id="${idCross}" class="cross-img" src="http://www.clker.com/cliparts/0/7/e/a/12074327311562940906milker_X_icon.svg.med.png" />`}}
        const divComentarios=document.querySelector('.comentarios')
        const porque=divComentarios.appendChild(nuevoP)
}   
function capturarComentarios(event){
    captura=document.querySelector('#comentario').value
    document.querySelector('#comentario').value=''
    if(captura.length>0){
        prueba={'fecha':fechaEvento(),'tipo':'comentario','contenido':limpiarTexto(captura),'terminada':false}
    comentariosArr.push(prueba)
    saveState()
    displayCosas(comentariosArr[comentariosArr.length-1])}
}
function saveState(){
    localStorage.setItem('comentariosGuardados2',JSON.stringify(comentariosArr))
}
function limpiarTexto(elemento){
    return elemento.trim().toUpperCase().substring(0,1)+elemento.trim().substring(1).toLowerCase()
}
function fechaEvento(){
    const date1 = new Date()
return normalDate(date1)
}
function twoDigits(valueDigit){
    return valueDigit<10?'0'+valueDigit:''+valueDigit
}
function normalDate(date){
    yr=date.getFullYear();
    mm=twoDigits(date.getMonth()+1);
    dd=twoDigits(date.getDate());
    hr=twoDigits(date.getHours());
    mts =twoDigits(date.getMinutes());
    return dd+'/'+mm+'/'+yr+' - '+hr+':'+mts
}










