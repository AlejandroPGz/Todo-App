const butonSubmit = document.querySelector('#button-app');
const inputApp = document.querySelector('#input-app');
const list = document.querySelector('#lista-app');
const input = document.querySelector('#input-app');
const formApp = document.querySelector('#form-app');
const divContadores = document.querySelector('#counter-list');
const botonCell = document.querySelector('#nav-icon');

const divHamburger = document.querySelector('#direcciones');
const divHamburLinks = document.querySelector('#direcciones-hamburger-div')

const INPUT_REGEX = /^\s*$|^(.{600,})$/;
let inputValidation = false;
butonSubmit.disabled = true;

const mostrar = (clase) => {
    const todasTareas = document.getElementsByClassName('tareas');
    [...todasTareas].forEach(tarea => tarea.setAttribute('style', "display: none"));
    let tareas = document.getElementsByClassName(clase);
    [...tareas].forEach(tarea => tarea.setAttribute('style', "display: flex"));

}

const contador = (clase, id, mensaje) => {
    let tareas = document.getElementsByClassName(`${clase}`).length;
    let spanCount = document.getElementById(`${id}`);
    spanCount.innerHTML = `${mensaje} ${tareas}`;

}

const contadorTodo = () => {
    contador("tareas", "span-tarea", "Tasks:");
    contador("incompletas", "span-incompletas", "Incomplete:");
    contador("done", "span-completas", "Complete:");
}

const VALIDAR = (validacion) => {
    const mensaje = document.getElementById('mensaje-p');

       if (!input.value) {
        mensaje.classList.add('hide');
        input.classList.remove('input-error')
       } else if (validacion) {
            butonSubmit.disabled = true;
            mensaje.classList.remove('hide');
            input.classList.add('input-error')
        } else {
        butonSubmit.disabled = false;
        mensaje.classList.add('hide');
        input.classList.remove('input-error')
    }
};

input.addEventListener('input', e => {
    inputValidation = INPUT_REGEX.test(input.value)
    VALIDAR(inputValidation);
})

formApp.addEventListener('submit', e => {
    e.preventDefault();
    const li = document.createElement('li');
    li.innerHTML = `
    <div id="item-list-botones"> <button id="delete-button" class="boton-lista">  <svg  id="icon-trash" class="icon" id="iconitem-list-botones" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
              <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clip-rule="evenodd" />
            </svg> </button>
          </div>
        <div id="item-list-task"><p>${inputApp.value}</p></div>
        <div id="item-list-botones"> <button id="empty-Button" class="boton-lista"> <svg class="icon" id="todo-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"/></svg>
        </button> <button class="hide" id="check-button"> <svg class="icon" id="check-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
        <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
      </svg> </button> 
        </div></li>    
    `;
    li.classList.add('tareas','incompletas', 'item-list')
    // li.setAttribute('id', "item-list")

    const firstListItem = document.querySelector('#lista-app li:first-child');
    list.insertBefore(li, firstListItem);

    // contador("tareas", "span-tarea", "Tasks:");
    contadorTodo();
    localStorage.setItem('TASKMANAGER', list.innerHTML);
    inputApp.value = "";
    butonSubmit.disabled = true;
})

list.addEventListener('click', e => {
    //eliminar
    if (e.target.closest('#delete-button')) {
        e.target.closest('#delete-button').parentElement.parentElement.remove();
        contadorTodo();
        localStorage.setItem('TASKMANAGER', list.innerHTML);
    }
   
    //marcar lista
    if (e.target.closest('#empty-Button')) {
        e.target.closest('#empty-Button').parentElement.parentElement.classList.add('done');
        e.target.closest('#empty-Button').parentElement.parentElement.classList.remove('incompletas');
        e.target.closest('#empty-Button').parentElement.parentElement.children[2].children[0].classList.add('hide');
       const check = e.target.closest('#empty-Button').parentElement.parentElement.children[2].children[1];
       check.classList.remove('hide')
       check.classList.add('show')
       let liDone = e.target.closest('#empty-Button').parentElement.parentElement;
       liDone.setAttribute('style', "display: none")
       contadorTodo();
        list.append(liDone);
        localStorage.setItem('TASKMANAGER', list.innerHTML);
    }

    //desmarcar
    if (e.target.closest('#check-button')) {
        e.target.closest('#check-button').parentElement.parentElement.classList.remove('done');
        e.target.closest('#check-button').parentElement.parentElement.classList.add('incompletas');

        const checkdelete = e.target.closest('#check-button').parentElement.parentElement.children[2].children[1];
        const empty = e.target.closest('#check-button').parentElement.parentElement.children[2].children[0];
        checkdelete.classList.remove('show');
        checkdelete.classList.add('hide');
        empty.classList.remove('hide');
        empty.classList.add('show');
        e.target.closest('#check-button').parentElement.parentElement.setAttribute('style', "display: none")
        contadorTodo();
        localStorage.setItem('TASKMANAGER', list.innerHTML);
    }
})

divContadores.addEventListener('click', e => {
   
    //Completas
    if (e.target.closest('#span-completas')) {
        mostrar("done"); 
    };
    
    //Incompletas
    if (e.target.closest('#span-incompletas')) {
        mostrar("incompletas"); 
    };
    //mostrar tareas 
    if (e.target.closest('#span-tarea')) {
        mostrar("tareas");
    }
})

botonCell.addEventListener('click', e => {
    console.log(e.target);
    if (e.target.closest('#nav-icon')) {
        if (divHamburger.classList.contains('direcciones-desactivada')) {
            divHamburger.classList.add('direcciones-active')
            divHamburger.classList.remove('direcciones-desactivada')
            divHamburLinks.classList.remove('hide')
            divHamburLinks.classList.add('direcciones-hamburger')
        } else {
            divHamburger.classList.remove('direcciones-active')
            divHamburger.classList.add('direcciones-desactivada')
            divHamburLinks.classList.add('hide')
            divHamburLinks.classList.remove('direcciones-hamburger')
        } 
        console.log('hola');
    }
});

window.onload = () => {
    list.innerHTML = localStorage.getItem('TASKMANAGER');
    mostrar("tareas");
    contadorTodo();
}