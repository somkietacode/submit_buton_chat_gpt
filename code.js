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
const targetElement = document.querySelector(".flex.flex-col.w-full.py-2.flex-grow.md\\:py-3.md\\:pl-4");
targetElement.parentNode.insertBefore(progressBarContainer, targetElement);
targetElement.parentNode.insertBefore(submitButton, targetElement);

// add event listener to button
submitButton.addEventListener("click", async () => {
  // create file input element
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = ".txt,.js,.py,.html,.css,.json,.csv";
  fileInput.style.display = "none";
  document.body.appendChild(fileInput);

  // simulate click on file input element
  fileInput.click();

  // wait for file to be selected
  await new Promise((resolve) => {
    fileInput.addEventListener("change", resolve);
  });

  // read file as text
  const file = fileInput.files[0];
  const fileReader = new FileReader();
  fileReader.readAsText(file);

  // split file into chunks of size 15000 and submit each chunk
  const chunkSize = 15000;
  const text = await new Promise((resolve) => {
    fileReader.addEventListener("load", () => {
      resolve(fileReader.result);
    });
  });
  const numChunks = Math.ceil(text.length / chunkSize);
  for (let i = 0; i < numChunks; i++) {
    const chunk = text.slice(i * chunkSize, (i + 1) * chunkSize);
    await submitConversation(chunk, i + 1, file.name);
    progressBar.style.width = `${((i + 1) / numChunks) * 100}%`;
    let chatgptReady = false;
    while (!chatgptReady) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      chatgptReady = !document.querySelector(".text-2xl > span:not(.invisible)");
    }
  }

  // set progress bar to blue when all chunks have been submitted
  progressBar.style.backgroundColor = "blue";
});

// submitConversation function
async function submitConversation(text, part, filename) {
  const textarea = document.querySelector("textarea[tabindex='0']");
  const enterKeyEvent = new KeyboardEvent("keydown", {
    bubbles: true,
    cancelable: true,
    keyCode: 13,
  });
  textarea.value = `Part ${part} of ${filename}: \n\n ${text}`;
  textarea.dispatchEvent(enterKeyEvent);
}
