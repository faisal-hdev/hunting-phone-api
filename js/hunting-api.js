const loadPhones = async (searchText) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones);
};

const displayPhones = (phones) => {
  // 1. get the mainContainer element
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = "";

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
              <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary text-white">Show Details</button>
            </div>
        </div>
    `;
    // 4. append child
    phoneContainer.appendChild(phoneCard);

    // hide loading spinner
    toggleLoadingSpinner(false);
  });
};

const handleShowDetails = async (id) => {
  // load single data
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;
  showPhoneDetails(phone);
};

const showPhoneDetails = (phone) => {
  const showDetailContainer = document.getElementById("show-detail-container");
  showDetailContainer.innerHTML = `
    <div class='flex items-center justify-center text-center p-8 bg-blue-50 rounded-lg'>
      <img src="${phone.image}" class="w-[200px]  " alt="Shoes"/>
    </div>
    <div class='space-y-3'>
      <h2 class="card-title text-2xl">${phone?.name}</h2>
      <p><span class='text-lg font-semibold'>Storage : </span>${phone?.mainFeatures?.storage}</p>
      <p><span class='text-lg font-semibold'>Display Size : </span>${phone?.mainFeatures?.displaySize}</p>
      <p><span class='text-lg font-semibold'>Chip set : </span>${phone?.mainFeatures?.chipSet}</p>
      <p><span class='text-lg font-semibold'>Memory : </span>${phone?.mainFeatures?.memory}</p>
      <p><span class='text-lg font-semibold'>Release data  : </span>${phone?.releaseDate}</p>
      <p><span class='text-lg font-semibold'>Brand : </span>${phone?.brand}</p>
      <p><span class='text-lg font-semibold'>GPS : </span>${phone?.others?.GPS}</p>
    </div>
  `;
  // show the modal
  show_details_modal.showModal();
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
