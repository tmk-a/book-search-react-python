document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".search-form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const query = formData.get("search-keyword");
    // const query = document.querySelector("#searchInput").value;
    if (!query) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/search?q=${query}`);
      const data = await response.json();

      const resultsContainer = document.querySelector("#results");
      resultsContainer.innerHTML = "";

      data.results.forEach((book) => {
        const li = document.createElement("li");
        li.textContent = `${book.title} by ${book.author}`;
        resultsContainer.appendChild(li);
      });
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  });
});
