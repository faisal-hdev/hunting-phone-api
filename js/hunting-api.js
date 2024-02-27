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

  console.log(phones.length);

  phones.forEach((phone) => {
    // 2. create a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-base-100 shadow-xl p-2 border`;
    // 3. set innerHTML
    phoneCard.innerHTML = `
          <figure class="px-10 pt-10">
            <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
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
  });
};

const handleSearch = () => {
  const inputEl = document.getElementById("search-field").value;
  loadPhones(inputEl);
};

// loadPhones();
