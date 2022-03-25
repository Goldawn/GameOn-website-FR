function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
// const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close")
// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
closeBtn.addEventListener("click", closeModal);

// launch modal form
function launchModal() {
  loadData("formData") ? formData = JSON.parse(loadData("formData")) : formData

  form.first.value=formData.first
  form.last.value=formData.last
  form.email.value=formData.email
  form.birthdate.value=formData.birthdate
  form.quantity.value=formData.quantity
  form.location.value=formData.location
  
  modalbg.style.display = "block";
}

//close modal function
function closeModal() {
  modalbg.style.display = "none";
}