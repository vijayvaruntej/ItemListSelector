fetch('items.json')
  .then(response => response.json())
  .then(data => {
    const itemGrid = document.getElementById('itemGrid');

    // Check if there is a previously selected value and set it
    const selectedItems = JSON.parse(localStorage.getItem("selectedItems")) || [];
    console.log(selectedItems);
    data.forEach(item => {

      const itemDiv = document.createElement('div');
      itemDiv.classList.add('grid-item');

      const itemNameSpan = document.createElement('span');
      itemNameSpan.textContent = item.itemName;
      itemDiv.appendChild(itemNameSpan);

      const originalSelect = document.createElement('select');
      let vijay=0;
        item.itemQuantity.forEach(quantity => {
          const option = document.createElement('option');
          if(vijay==0){
            option.value = "0";
            option.textContent = "0";
            originalSelect.appendChild(option);
            vijay++;
          }else{
            option.value = quantity;
            option.textContent = quantity;
          originalSelect.appendChild(option);
          }
          
        });
      itemDiv.appendChild(originalSelect); 

       // Check if a previous selection exists for this item
       const selectedItem = selectedItems.find(selected => selected.name === item.itemName);
       if (selectedItem) {
         originalSelect.value = selectedItem.quantity; 
       }

      itemDiv.appendChild(originalSelect);

      // Event listener for "Custom" option
        originalSelect.addEventListener('change', function () {
        if (this.value === "custom") {
          const customInput = document.createElement('input');
          customInput.type = "text";
          customInput.placeholder = "Enter";
          customInput.classList.add('custom-input');
          itemDiv.replaceChild(customInput, this); 
        }
      });

      itemGrid.appendChild(itemDiv);
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });



  // Reset Button Functionality
    document.getElementById('resetBtn').addEventListener('click', () => { 
    localStorage.removeItem('selectedItems'); // Clear selected items from localStorage
    location.reload(); // Reload the page to reflect the changes
  });



  // Move to display.html page
  document.getElementById('moveBtn').addEventListener('click', () => {
    const selectedItems = [];
    const itemDivs = document.querySelectorAll('.grid-item');

    itemDivs.forEach(itemDiv => {
      const itemName = itemDiv.querySelector('span').textContent;
      let selectedQuantity;

      const selectElement = itemDiv.querySelector('select');
      const inputElement = itemDiv.querySelector('input');

      if (selectElement) { 
        selectedQuantity = selectElement.value; 
      } else if (inputElement) { 
        selectedQuantity = inputElement.value; 
      }
      // if (selectElement.value !== "0" || inputElement.value !== "0") {
      //   let selectedQuantity;
      //   if (selectElement.value !== "0") { 
      //     selectedQuantity = selectElement.value; 
      //   } else if (inputElement.value !== "0") { 
      //     selectedQuantity = inputElement.value; 
      //   }
      //   selectedItems.push({ itemName: itemName, quantity: selectedQuantity });
      // }

      selectedItems.push({ itemName: itemName, quantity: selectedQuantity }); 
    });

    localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
    window.location.href = 'display.html'; 
  });



  // Get the button and the body element
const themeToggleBtn = document.getElementById("themeToggleBtn");
const body = document.body;

// Check localStorage for saved theme preference
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
  themeToggleBtn.textContent = "Switch to Light Mode";
}

// Toggle between light and dark mode
themeToggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  // Save the theme preference in localStorage
  if (body.classList.contains("dark-mode")) {
    themeToggleBtn.textContent = "Switch to Light Mode";
    localStorage.setItem("theme", "dark");
  } else {
    themeToggleBtn.textContent = "Switch to Dark Mode";
    localStorage.setItem("theme", "light");
  }
});
