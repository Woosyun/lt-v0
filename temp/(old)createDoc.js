// lib/utils/createDoc.js
export const createDoc = (containerId) => {
    // Check if we are in a browser environment
    if (typeof window !== 'undefined') {
      const noteContainer = document.getElementById(containerId);
  
      function addTextBlock() {
        const textBlock = document.createElement("div");
        textBlock.classList.add("block", "text-block");
        textBlock.contentEditable = true;
  
        // Set a placeholder text
        textBlock.textContent = "Type your text here";
  
        // Clear the placeholder when the user clicks on the text block
        textBlock.addEventListener("click", function () {
          if (textBlock.textContent === "Type your text here") {
            textBlock.textContent = "";
          }
        });
  
        textBlock.addEventListener("keydown", function (e) {
          if (e.key === 'Enter') {
            console.log(textBlock.textContent);
          }
        });
  
        noteContainer.appendChild(textBlock);
      }
  
      function addListBlock() {
        const listBlock = document.createElement("ul");
        listBlock.classList.add("block", "list-block");
  
        for (let i = 0; i < 3; i++) {
          const listItem = document.createElement("li");
          listItem.id = i;
          listItem.contentEditable = true;
          listItem.textContent = "List item " + (i + 1);
          listBlock.appendChild(listItem);
        }
  
        // Set a placeholder text for the list block
        // listBlock.textContent = "Type your list items here";
  
        // Clear the placeholder when the user clicks on the list block
        listBlock.addEventListener("click", function () {
          if (listBlock.textContent === "Type your list items here") {
            listBlock.textContent = "";
          }
        });
  
        noteContainer.appendChild(listBlock);
      }
  
      // Example: Add a text block and a list block
      addTextBlock();
      addListBlock();
    }
};