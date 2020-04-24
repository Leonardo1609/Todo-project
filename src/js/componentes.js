import { Todo } from "../classes";
import { todoList } from "../index";

// Referencias en el HTML
const divTodoList   = document.querySelector('.todo-list'),
      txtInput      = document.querySelector('.new-todo'),
      btnBorrar     = document.querySelector('.clear-completed'),
      ulFiltors     = document.querySelector('.filters'),
      anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHtmL = ( todo ) => {
    const htmlTodo = `
    <li class="${ (todo.completado) ? 'completed': '' }" data-id="${ todo.id }">
        <div class="view">
            <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : ''}>
            <label>${ todo.tarea }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>
    `;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append( div.firstElementChild ); // Solo quiero el li, no el div

    return div.firstElementChild;
}


// Eventos
txtInput.addEventListener('keyup', ( event ) => {
    
    if( event.keyCode === 13 && txtInput.value.trim() !== ''){
        const nuevoTodo = new Todo( txtInput.value );        
        todoList.nuevoTodo( nuevoTodo );

        crearTodoHtmL( nuevoTodo );

        txtInput.value = '';
    }
});


divTodoList.addEventListener('click', ( event ) => {
    const nombreElemento  = event.target.localName;
    const todoElement     = event.target.parentElement.parentElement;
    const todoId          = todoElement.getAttribute( 'data-id' );

    // if ( nombreElemento === 'input' ) { // click en el check
    if ( nombreElemento.includes('input') ) { // click en el check

        todoList.marcarCompletado ( todoId );
        todoElement.classList.toggle('completed') // Si no existe la coloca, si existe la quita

    } else if ( nombreElemento.includes('button') ) { // hay que borrar el div
        
        todoList.eliminarTodo( todoId );
        divTodoList.removeChild( todoElement );

    }
    
});

btnBorrar.addEventListener('click', () => {
   todoList.eliminarCompletados();

   for( let i = divTodoList.children.length-1; i >= 0; i--){
       const elemento = divTodoList.children[i]
        if( elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }
    }
});

ulFiltors.addEventListener('click',  e => {
    const filtro = e.target.text
    if( !filtro ) { return; };

    anchorFiltros.forEach( elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');


    for( const element of divTodoList.children ){
        element.classList.remove('hidden');
        const completado = element.classList.contains('completed');

        switch( filtro ) {

            case 'Pendientes':
                if( completado ){
                    element.classList.add('hidden');
                }
            break;
            case 'Completados':
                if( !completado ){
                    element.classList.add('hidden');
                }
            break;
            
        }
    }
})