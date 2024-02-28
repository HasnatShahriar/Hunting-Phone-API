const loadPhone = async (searchText = '13', isShowAll) => {
  const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
  const data = await response.json()
  const phones = data.data
  // console.log(phone)
  displayPhones(phones, isShowAll)
}



const displayPhones = (phones, isShowAll) => {
  // console.log(phones);

  // step-1: hold the container
  const phoneContainer = document.getElementById('phone-container');

  // clear phone container cards before adding new cards
  phoneContainer.textContent = '';

  // display show all btn if there are more than 12 phones.
  const searchAllBtn = document.getElementById('show-all-search')
  if (phones.length > 12 && !isShowAll) {
    searchAllBtn.classList.remove('hidden');
  }
  else {
    searchAllBtn.classList.add('hidden');
  }

  // display only first 12 phones if show all doesn't exist
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  phones.forEach(phone => {
    console.log(phone);

    // step-2: create a div
    const phoneCard = document.createElement('div');
    phoneCard.classList = `card bg-gray-100 p-4 shadow-xl`

    // step-3: set innerHTML
    phoneCard.innerHTML = `
    <figure><img src="${phone.image}" alt="Phone" /></figure>
          <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
              <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
          </div>
    `
    // step-4: append child
    phoneContainer.appendChild(phoneCard);
  });
  toggleLoadingSpinner(false)
}

// handle the search btn
const handleButton = (isShowAll) => {
  // console.log('Alhamdulillah')
  toggleLoadingSpinner(true);
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  console.log(searchText);
  loadPhone(searchText, isShowAll);
}

// handle the another search btn
// const handleButton2 = () =>{
//   const searchField = document.getElementById('search-field2');
//   searchText = searchField.value;
//   toggleLoadingSpinner(true)
//   loadPhone(searchText);
// }

// loadPhone();

const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById('loadingSpinner');
  // loadingSpinner.classList.remove('hidden')
  if (isLoading) {
    loadingSpinner.classList.remove('hidden')
  }
  else {
    loadingSpinner.classList.add('hidden')
  }
}

//handle showAll 

const handleShowAll = () => {
  handleButton(true)
}

// handle show details

const handleShowDetail = async (id) => {
  // console.log('alhamdulillah');
  // console.log(id);
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
  const data = await res.json()
  const phone = data.data;
  showPhoneDetails(phone)
}

const showPhoneDetails = (phone) => {
  console.log(phone);
  const phoneName = document.getElementById('show-detail-phone-name');
  phoneName.innerText = phone.name;

  const showDetailsContainer = document.getElementById('show-details-container')
  showDetailsContainer.innerHTML = `
       <img class="mx-auto" src="${phone?.image}" alt="" />
       <p><span class="font-bold">Storage:</span>${phone?.mainFeatures?.storage}</p>
       <p><span class="font-bold">Display Size:</span>${phone?.mainFeatures?.displaySize}</p>
       <p><span class="font-bold">ChipSet:</span>${phone?.mainFeatures?.chipSet}</p>
       <p><span class="font-bold">Memory:</span>${phone?.mainFeatures?.memory}</p>
       <p><span class="font-bold">Slug:</span>${phone?.slug}</p>
       <p><span class="font-bold"Release Data:</span>${phone?.releaseDate}</p>
       <p><span class="font-bold">Brand:</span>${phone?.brand}</p>
       <p><span class="font-bold">GPS:</span>${phone?.others?.GPS || "No GPS"}</p>      
  
  `

  // show the modal
  show_modal_details.showModal()
}