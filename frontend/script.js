// Get reference to the "Show random Quote" button
const showQuoteButton = document.getElementById("showQuoteBtn");

// Get reference to the paragraph where the quote will be displayed
const quoteText = document.getElementById("quoteText");
const quoteInsertForm = document.getElementById("quoteForm");

const quoteInput=document.getElementById("newQuote");
const authorInput = document.getElementById("newQuoteAuthor");

console.log("Button:", showQuoteButton);
console.log("Quote element:", quoteText);

// Add a click event listener to the button
showQuoteButton.addEventListener("click", async () => {
  try {
    // Send a GET request to the backend server
    const response = await fetch(
      "https://sheidashab-quoteserver-backend.hosting.codeyourfuture.io/"
    );

    // Read the response body as plain text
    const quote = await response.text();

    // Display the quote inside the paragraph
    quoteText.textContent = quote;
  } catch (error) {
    // If something goes wrong (server down, CORS, network error)
    console.log(error);
    quoteText.textContent = "Failed to load quote.";
  }
});
quoteInsertForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const quote = quoteInput.value.trim();
  const author = authorInput.value.trim();

  const data = { quote: quote, author: author };

  const response = await fetch(
    "https://sheidashab-quoteserver-backend.hosting.codeyourfuture.io/",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );

  const result = await response.text();
  console.log(result);

  if (result==="ok"){
    quoteText.textContent=`${quote} - ${author}` ;
    quoteInput.value="";
    authorInput.value="";
  }
});
