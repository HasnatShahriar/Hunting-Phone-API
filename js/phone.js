const loadPhone =async () =>{
  const response = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone')
  const data = await response.json()
  const phones = data.data
  // console.log(phone)
  displayPhones(phones)
}



const displayPhones = phones =>{
  // console.log(phones);

  // step-1: hold the container
  const phoneContainer = document.getElementById('phone-container');
  phones.forEach(phone=>{
    console.log(phone);

    // step-2: create a div
    const phoneCard = document.createElement('div');
    phoneCard.classList = `card w-96 bg-gray-100 p-4 shadow-xl`
    
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

  })
}



loadPhone();