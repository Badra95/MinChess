$('#envoyer').click(function(){

  const nom = document.getElementById('nom').value;
  const mail = document.getElementById('mail').value;
  const mdp = document.getElementById('mdp').value;
  // console.log(document.getElementById('nom').value);
  // console.log(document.querySelector('#email').value);
  // console.log($('#password').value);

  if (!nom){
    alert("Champs du pseudo vide");
    return;
  }

  if (!mail){
    alert("Champs du mail vide");
    return;
  }

  if (!mdp){
    alert("Champs du mdp vide");
    return;
  }


  axios.post('http://localhost:3000/auth/register/', {

    name: nom.trim(),
    email: mail.trim(),
    password: mdp.trim()

  // axios({
  // method: "post",
  // url: "http://localhost:3000/auth/register/",
  // data: {
  //     name: nom.trim(),
  //     email: mail.trim(),
  //     password: mdp.trim()
  // },

  }).then(function (response) {
    console.log(response);
    alert("Inscription faites");
  }).catch(function (error) {
    console.log(error);
    alert("Une erreur c'est produite lors de l'inscription");
  });



});
