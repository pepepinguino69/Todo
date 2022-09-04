// Esta es la base de datos de nuestros usuarios
document.getElementById("myForm").reset();
const baseDeDatos = {
  usuarios: [
    {
      id: 1,
      name: "Steve Jobs",
      email: "steve@jobs.com",
      password: "Steve123",
    },
    {
      id: 2,
      name: "Ervin Howell",
      email: "shanna@melissa.tv",
      password: "Ervin345",
    },
    {
      id: 3,
      name: "Clementine Bauch",
      email: "nathan@yesenia.net",
      password: "Floppy39876",
    },
    {
      id: 4,
      name: "Patricia Lebsack",
      email: "julianne.oconner@kory.org",
      password: "MysuperPassword345",
    },
  ],
};
function contarSegundos(){}
// ACTIVIDAD

// Paso a paso:

// 1) Escuchar el evento necesario para reaccionar cuando la persona
// haga click en el botón iniciar sesión.

// 2) El proceso de inicio de sesión deberá tener una demora de 3 segundos.
// Deberás agregar la función correspondiente para simular dicha demora.

// 3) Durante el tiempo indicado anteriormente, se deberá mostrar el mensaje 
//"Iniciando sesión..."

// 4) A partir de los inputs ingresados en el formulario, se deberan realizar las siguientes validaciones:
// 1) Que el primer input sea un email válido.
// 2) Que la contraseña tenga al menos 5 caracteres.
// 3) Que los datos ingresados corresponden a una
// persona que se encuentre registrada en la base de datos.
// En caso de que alguna de las validaciones no sea exitosa,
// se deberá mostrar un mensaje de error que diga "Alguno de los datos ingresados son incorrectos"

// 5) En caso de que los datos ingresados sean correctos, se deberá ocultar el formulario y mostrar
// un mensaje de bienvenida al sitio.

/* 
TIPS:
  - Puedes averiguar acerca de la manera de validar el formato de un email utilizando Javascript, buscando
    en internet frases como "Validar email con Javascript o similar".

  - Recuerda que puedes seleccionar y manipular los elementos del archivo index.html, usando los
    recursos que Javascript te ofrece para ello. Además, en el archivo styles.css tiene algunas clases y 
    estilos predefinidos para ayudarte a completar la actividad.

  - También te dejamos algunos mensajes que te pueden ser de utilidad:
  
   Mensaje de error => <small>Alguno de los datos ingresados son incorrectos</small>

   Mensaje de bienvenida => "<h1> Bienvenido al sitio 😀 </h1>";

   ¡Manos a la obra!
 */
let errores=[]
document.querySelector('#email-input').value=""
document.querySelector('.login-btn').addEventListener('click',(e)=>{
  cumplirCondiciones(e)})

function validarEmail(str){
  if(str.indexOf('@')<1||str.indexOf('@')>str.length-3){errores.push('email1')}
    else
  if(str.indexOf('.')<3||str.indexOf('.')>str.length-2){errores.push('email2')}
    else
  if(str.indexOf('.',str.indexOf('@'))<0){errores.push('email3')}}

function validarPass(str){

  if(str.length<5){errores.push('pass')}}

function validarLogin(user,pass){
  valid=false
  baseDeDatos.usuarios.forEach(e=>{if(e.email==email&&e.password==pass){valid=true}})
  if(!valid){errores.push('user')}}
  
function newSession(u,p){
  for(i=0;i<4;i++){setTimeout(contarSegundos(),1000)}
  errores.length=0
  formScreen=document.querySelector('form').classList.add('hidden')
  sessionLoading=document.querySelector('#loader').classList.remove('hidden')
  welcomeScreen=document.querySelector('h1').innerHTML='<h1> Bienvenido al sitio 😀 </h1>'
  load = setTimeout(function() { window.open('index3.html','_self')}, 10000);
 
}

function cumplirCondiciones(e){
  e.preventDefault()
  email=document.querySelector('#email-input').value
  validarEmail(email)
  pass=document.querySelector('#password-input').value
  validarPass(pass)
  validarLogin(email,pass)
  document.getElementById("myForm").reset();
  
  
  if(errores.length==0)
    {newSession(email,pass)}
  else
    {mostrarErrores()}}

function mostrarErrores(){
    aw=document.querySelector('#error-container')
    aw.classList.remove('hidden')
    aw.innerHTML='<small>Alguno de los datos ingresados son incorrectos</small>'
    errores.length=0
    setTimeout(borrarErrores,5000)}




function borrarErrores(){
  aw=document.querySelector('#error-container')
  aw.classList.add('hidden')}

