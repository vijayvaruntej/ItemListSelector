document.addEventListener('DOMContentLoaded', () => {
    const selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
  
    if (selectedItems.length === 0) {
      const displayItemGrid = document.querySelector('.grid');
      const noItemsMessage = document.createElement('p');
      noItemsMessage.textContent = 'No items selected.';
      displayItemGrid.appendChild(noItemsMessage);
      return;
    }
  
    const displayItemGrid = document.querySelector('.grid');
    let i=1;
    selectedItems.forEach(item => {

        if(item.quantity == 0){
            
        }else{
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('display-item'); // Add a class for styling
        
            const itemNameSpan = document.createElement('span');
            itemNameSpan.classList.add('nameSpan'); // Add a class for styling
            itemNameSpan.textContent = `${i}. ${item.itemName}:     `; 
            i++;
            itemDiv.appendChild(itemNameSpan);
        
            const itemQuantitySpan = document.createElement('span');
            itemQuantitySpan.classList.add('quantitySpan'); // Add a class for styling
            itemQuantitySpan.textContent = item.quantity;
            itemDiv.appendChild(itemQuantitySpan);
        
            displayItemGrid.appendChild(itemDiv);
        }
    });
  
    function getFormattedDate() {
        const date = new Date();
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based
        const year = date.getFullYear();
    
        return `${day}/${month}/${year}`;
    }
        const formattedDate = getFormattedDate();
        document.getElementById("formattedDate").textContent = formattedDate;
    
  
  // Save as Image functionality
  
  
    document.getElementById("downlaodButton").addEventListener("click", () => {
        const heads = document.getElementById('headings');
         const content = document.getElementById('itemGrid');
        //const content = document.querySelectorAll('.display-item');

            console.log(content);
          if (content.length === 0) {
            console.error("No elements with class 'display-item' found.");
            alert("No content available to save as an image.");
            return;
        }

        // Combine heads and content into a wrapper for capturing both
        const wrapper = document.createElement("div");
        wrapper.style.display = "inline-block";
        wrapper.appendChild(heads.cloneNode(true)); // Clone the heads element
        wrapper.appendChild(content.cloneNode(true)); // Clone the content element

        document.body.appendChild(wrapper); // Temporarily add the wrapper to the DOM


        html2canvas(wrapper, {
            scale: window.devicePixelRatio // Scale the canvas based on the device's pixel ratio
            //useCORS: true,  // Enable CORS to handle external images
            // backgroundColor: null, // Transparent background for the image
        }).then((canvas) => {
            const link = document.createElement("a");
            link.download = "selected-items.png"; // Image filename
            link.href = canvas.toDataURL("image/png"); // Image format: PNG
            link.click(); // Trigger the download
        }).catch((error) => {
            console.error("Error generating image:", error);
            alert("There was an issue saving the image.");
        });
    });
 
  });