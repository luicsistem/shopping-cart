// variables

const shoCart = document.querySelector("#carrito");
const containerShoCart = document.querySelector("#lista-carrito tbody");
const emptyShoCartBtn = document.querySelector("#vaciar-carrito");

const coursesList = document.querySelector("#lista-cursos");
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
  // cuando agregas un course
  coursesList.addEventListener("click", agregarCourse);
  // delete course del cart
  shoCart.addEventListener('click', deleteCourse);

  // empty el cart
  emptyShoCartBtn.addEventListener('click', () => {
      articulosCarrito = [];
      limpiarHtml();
  } )
}

// functions
function agregarCourse(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const selectedCourse = e.target.parentElement.parentElement;
    leerDatosCurso(selectedCourse);
  }
}

// delete course del cart
function  deleteCourse(e) {
  if(e.target.classList.contains('borrar-curso')) {
   const courseId = e.target.getAttribute('data-id');
   // delete del array articulos carrito por el data-id
   articulosCarrito = articulosCarrito.filter( course => course.id !== courseId )
   
   carritoHtml(); // itera sobre el cart y show su html
   

  }
}

// lee el contenido del html con clic y extrae info del course

function leerDatosCurso(curso) {
  // crear un objeto con el contenido del course actual

  const infoCourse = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  // Revisa si un elemento ya existe en el cart
const exist = articulosCarrito.some( course => course.id === infoCourse.id);

  if(exist) {
    // actualizamos la cantidad
    const cursos = articulosCarrito.map( course => {
      if(course.id === infoCourse.id) {
        course.cantidad++;
        return course; // retorna el objeto actualizado
      } else {
        return course; // retorna los objetos que no son duplicados
      }

    });
      articulosCarrito = [...cursos]

  } else {

      // agrega elementos al carrito
  articulosCarrito = [...articulosCarrito, infoCourse];

}
carritoHtml();


}



// muestra el carrito de compras en le Html
function carritoHtml() {
  // limpiar el html
  limpiarHtml();

  // recorre el carrito y genera el html
  articulosCarrito.forEach((curso) => {
      const { imagen,titulo, precio, cantidad, id } = curso;
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>
            <img src="${imagen}" width="100" >
        </td>
        <td> ${titulo} </td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
        <a href="#" class="borrar-curso" data-id="${id}" > X </a>
        </td>

        `;
    // agrega el html del carrito en el tbody
    containerShoCart.appendChild(row);
  });
}


// elimina los cursos del tbody
function limpiarHtml() {
  // containerShoCart.innerHTML = '';

  while (containerShoCart.firstChild) {
    containerShoCart.removeChild(containerShoCart.firstChild);
  }
}
