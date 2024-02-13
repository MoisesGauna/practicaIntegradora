
document.querySelectorAll('.add-to-cart-button').forEach(button => {
    button.addEventListener('click', async function(event) {
      event.preventDefault();
  
      const productId = this.dataset.productId; 
        
      try {
        const response = await fetch('/add-to-cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ productId })
        });
  
        const data = await response.json();
  
        if (data.success) {
          // Mostrar un SweetAlert de éxito
          Swal.fire({
            position: "bottom-end",
            width: 200,
            Height: 200,
            background: "#0b5ed7",
            color:  "#fff",
            // icon: "success",
            text: "Producto agregado",
            showConfirmButton: false,
            timer: 1000
          });
        

        //   Swal.fire('¡Éxito!', data.message, 'success');

        } else {
          // Mostrar un SweetAlert de error
          Swal.fire('Error', data.message, 'error');
        }
      } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        // Mostrar un SweetAlert de error en caso de error en la solicitud
        Swal.fire('Error', 'Error al procesar la solicitud', 'error');
      }
    });
});
