# submit_buton_chat_gpt

Add a submit text file buton to chat gpt

This script creates a button and progress bar to allow the user to upload and submit large files as multiple chunks in chat gpt. It splits the file into chunks of 15000 characters and submits each chunk using the submitConversation() function.

## How to use

Include the script in your HTML file or add it to your JavaScript file.
Find the HTML element you want to insert the button and progress bar before by using querySelector.
Insert the elements into the DOM by calling the insertBefore method on the parent node of the target element.
Add an event listener to the button using the addEventListener method.
Define the submitConversation() function to handle submitting the chunks of the file to the web application.

Example
```javascript
// create button
const submitButton = document.createElement("button");
submitButton.textContent = "Submit File";
submitButton.style.backgroundColor = "green";
submitButton.style.color = "white";
submitButton.style.padding = "5px";
submitButton.style.border = "none";
submitButton.style.borderRadius = "5px";
submitButton.style.margin = "5px";

// create progress bar
const progressBarContainer = document.createElement("div");
progressBarContainer.style.width = "99%";
progressBarContainer.style.height = "5px";
progressBarContainer.style.backgroundColor = "grey";
const progressBar = document.createElement("div");
progressBar.style.width = "0%";
progressBar.style.height = "100%";
progressBar.style.backgroundColor = "blue";
progressBarContainer.appendChild(progressBar);

// insert elements into DOM
const targetElement = document.querySelector("#upload-form");
targetElement.parentNode.insertBefore(progressBarContainer, targetElement);
targetElement.parentNode.insertBefore(submitButton, targetElement);

// add event listener to button
submitButton.addEventListener("click", async () => {
  // ... rest of the code
});

// submitConversation function
async function submitConversation(text, part, filename) {
  // ... rest of the code
}

```
