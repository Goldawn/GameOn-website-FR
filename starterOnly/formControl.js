let form = document.forms.subscriptionForm;
let radioBtnIsChecked = false;
let mandatoryCheckbox = document.getElementById('checkbox1');

let formData = {
    first: "",
    last: "",
    email: "",
    birthdate: "",
    quantity: "",
    location: ""
}

// On définit ici la fonction de stockage d'un item dans le localstorage
let saveData = (key, value) => {
    if(localStorage){
        localStorage.setItem(key, value);
    }else {
        alert("Web Storage is not supported");
    }
}

// On définit ici la fonction de récupération d'un item dans le localstorage
let loadData = (key) => {
    if(localStorage){
        if(key in localStorage) {
            return localStorage.getItem(key);
        }
    }else {
        alert("Web Storage is not supported");
    }
}

// On enregistre la saisie de l'utilisateur à chaque changement d'input puis on la sauvegarde dans le localStorage
let saveFormData = (event) => {
    formData[event.target.name] = event.target.value
    saveData("formData", JSON.stringify(formData))
}

// On définit ici les fonctions à effectuer en cas d'envoi valide du formulaire
let successSubmit = () => {
    closeModal()
    localStorage.removeItem('formData');
    alert('Merci ! Votre réservation a été reçue.')
    modalBtn[0].innerText="Inscrit !"
    modalBtn[0].style.background="green"
}


// On vérifie les informations saisies par l'utilisateur avant de valider le formulmaire
let validateForm = (event) => {
    event.preventDefault()
    const formArray = Array.from(form.elements);
    const errorMessage = document.getElementsByClassName("formMessage");
    const radioBtnList = document.querySelectorAll('input[type="radio"]')

    for (let i = 0; i < 5; i++) {
        // On vérifie que les champs de saisie ne sont pas vides
        if (formArray[i].type="text" && formArray[i].value == "") {
            errorMessage[i].innerText="Le champ ne peut pas être vide"
            return false;
        }
        // On vérifie que les champs de prénom et nom contiennent au moins deux caractères
        else if((formArray[i].name===('first') || formArray[i].name===('last')) && formArray[i].value.length < 2) {
            errorMessage[i].innerText="Le champ doit comporter au moins 2 caractères";
            return false;
        }
        // On vérifie que les champs de prénom et nom ne contiennent que des lettres
        else if((formArray[i].name===('first') || formArray[i].name===('last')) && !(/^[a-zA-Z]+$/.test(formArray[i].value))) {
            errorMessage[i].innerText="Le champ ne doit contenir que de lettres";
            return false;
        }
        // On vérifie que l'adresse email contient bien "@" , "." et un minimum de caractères pour compléter
        else if(formArray[i].name ===('email') && !(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/).test(formArray[i].value)) {
            errorMessage[i].innerText="L'adresse email doit être valide";
            return false;
        }
        // On vérifie que la date de naissance est bien sous la forme JJ/MM/AAAA et que le jour et le mois sont valides 
        else if(formArray[i].name ===('birthdate') && !(/(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/).test(formArray[i].value)) {
            errorMessage[i].innerText="Veuillez saisir une date valide et sous la forme jj/mm/aaaa";
            return false;
        }
        // On vérifie que le champ ne peut contenir que des chiffres
        else if(formArray[i].name ===('quantity') && !(/\d$/).test(formArray[i].value)) {
            errorMessage[i].innerText="Veuillez saisir une valeur numérique";
            return false;
        }
        // Si tout est ok, alors on n'affiche aucune erreur
        else {
            errorMessage[i].innerText="";
        }
    }

    // On vérifie qu'un bouton radio est bien coché
    radioBtnList.forEach(e => {
        if ((e.checked)) {
            radioBtnIsChecked = true;
        }
    });

    // On affiche ou non une erreur en fonction de la réponse ci-dessus
    if (!radioBtnIsChecked) {
        document.getElementById("radioMessage").innerText="Vous devez choisir une option.";
        return false;
    } else {
        document.getElementById("radioMessage").innerText="";
    }

    // On vérifie que la checkbox est bien cochée, sinon on affiche une erreur
    if(!mandatoryCheckbox.checked) {
        document.getElementById("checkboxMessage").innerText="Vous devez vérifier que vous acceptez les termes et conditions.";
        return false;
    }
    else {
        document.getElementById("checkboxMessage").innerText="";
    }

    // Une fois toutes les vérifications effectuées, on valide l'envoi du formulaire
    successSubmit();
}

// On configure ici nos déclencheurs d'événements pour l'enregistrement et la vérification des données du formulaire
form.addEventListener("input", saveFormData);
form.addEventListener("submit", validateForm)