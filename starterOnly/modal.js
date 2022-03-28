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
const successbg = document.querySelector(".success-bg");
const modalBtn = document.querySelectorAll(".modal-btn");
const successBtn = document.querySelector(".success-btn")
// const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelectorAll(".close")
// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
closeBtn.forEach((btn) => btn.addEventListener("click", closeModal));
successBtn.addEventListener("click", closeModal);

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
  successbg.style.display = "none";
}