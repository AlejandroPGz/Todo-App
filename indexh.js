const botonCell = document.querySelector('#nav-icon');
const divHamburger = document.querySelector('#direcciones');
const divHamburLinks = document.querySelector('#direcciones-hamburger-div')

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
