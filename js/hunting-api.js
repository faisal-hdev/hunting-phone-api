const loadPhones = async (searchText) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones);
};

const displayPhones = (phones) => {
  console.log(phones);
  // 1. get the mainContainer element
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = "";

  // console.log(phones.length);
  // display show all button if there are more then 12 phones
  const showAllContainer = document.getElementById("show-all-container");

  if (phones.length > 12) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }

  // display only first 12 phones
  phones = phones.slice(0, 12);

  phones.forEach((phone) => {
    // 2. create a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-base-100 p-6 border-2`;
    // 3. set innerHTML
    phoneCard.innerHTML = `
          <figure class="p-8 bg-blue-50 rounded-lg">
            <img src="${phone.image}" alt="Shoes" />
          </figure>
        <div class="card-body items-center text-center">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions">
              <button class="btn btn-primary">Buy Now</button>
            </div>
        </div>
    `;
    // 4. append child
    phoneContainer.appendChild(phoneCard);

    // hide loading spinner
    toggleLoadingSpinner(false);
  });
};

const handleSearch = () => {
  toggleLoadingSpinner(true);
  const inputEl = document.getElementById("search-field").value;
  loadPhones(inputEl);
};

const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

// loadPhones();
