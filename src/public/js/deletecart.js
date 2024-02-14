
document.querySelectorAll('.delete-to-cart-button').forEach(button => {
    button.addEventListener('click', async function(event) {
      event.preventDefault();
  
      const productId = this.dataset.productId; 
        console.log(productId)
      try {
        const response = await fetch('/delete-to-cart', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ productId })
        });
  
        const data = await response.json();
  
        if (data.success) {

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Producto eliminado correctamente",
            showConfirmButton: false,
            timer: 1000
          });
        

        } else {

          Swal.fire('Error', data.message, 'error');
        }
      } catch (error) {
        console.error('Error al procesar la solicitud:', error);

        Swal.fire('Error', 'Error al procesar la solicitud', 'error');
      }
    });
});
