const loadPhone = async (searchText) => {
  const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
  const data = await response.json()
  const phones = data.data
  // console.log(phone)
  displayPhones(phones)
}



const displayPhones = phones => {
  // console.log(phones);
 
  // step-1: hold the container
  const phoneContainer = document.getElementById('phone-container');

  // clear phone container cards before adding new cards
  phoneContainer.textContent = '';

  // display show all btn if there are more than 12 phones.
  const searchAllBtn = document.getElementById('show-all-search')
  if(phones.length>12){
    searchAllBtn.classList.remove('hidden');
  }
  else{
    searchAllBtn.classList.add('hidden');
  }

   // display only first 12 phones
   phones = phones.slice(0, 12);

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
            <div class="card-actions justify-end">
              <button class="btn btn-primary">Buy Now</button>
            </div>
          </div>
    `
    // step-4: append child
    phoneContainer.appendChild(phoneCard);
  });
  toggleLoadingSpinner(false)
}

// handle the search btn
const handleButton = () => {
  // console.log('Alhamdulillah')
  toggleLoadingSpinner(true);
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  console.log(searchText);
  loadPhone(searchText);
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
  if(isLoading){
    loadingSpinner.classList.remove('hidden')
  }
  else{
    loadingSpinner.classList.add('hidden')
  }
}