function handleSearchSubmission(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let city = searchInput.value;
  let cityToUpdate = document.querySelector("#city");
  cityToUpdate.innerHTML = `${city} weather`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchSubmission);
