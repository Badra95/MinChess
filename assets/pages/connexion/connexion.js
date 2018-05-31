$('#envoyer').click(function(){

  const mail = document.getElementById('mail').value;
  const mdp = document.getElementById('mdp').value;
  // console.log(document.getElementById('nom').value);
  // console.log(document.querySelector('#email').value);
  // console.log($('#password').value);

  if (!mail){
    alert("Champs du mail vide");
    return;
  }

  if (!mdp){
    alert("Champs du mdp vide");
    return;
  }


  axios.post('http://localhost:3000/auth/login/', {

    email: mail.trim(),
    password: mdp.trim()


  }).then(function (response) {

    console.log(response);
    alert("Connexion établie");
    console.log(response.data.token);

  }).catch(function (error) {

    console.log(error.response.data);

    if (error.response.status === 401)
      alert('Mot de passe invalid');
    if (error.response.status === 404)
      alert('Adresse Mail incorrect');

  });



});
