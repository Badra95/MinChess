document.addEventListener("DOMContentLoaded", function() {

  var pseudo = null;
  var token = null;
  var name = null;
  var _id = null;


var navBarNone = function(){

  function resetNavBar(){

    // var tabNone = [$("#inscription"), $("#connexion"), $("#jouer"), $("p-vs-p"), $("p-vs-c")]

    // for (var i = 0; i < tabNone; i++){
    //
    //   if (tabNone[i].hasClass('d-none'))
    //     tabNone[i].addClass('d-none');
    //     }

    $("#accueil").addClass('d-none');
    $("#inscription").addClass('d-none');
    $("#connexion").addClass('d-none');
    $("#jouer").addClass('d-none');
    $("#p-vs-p").addClass('d-none');
    $("#p-vs-c").addClass('d-none')
    $("#p-vs-m").addClass('d-none');
  }

  if(token){
    console.log("j'ai le token");
    resetNavBar();
    $("#jouer").removeClass('d-none');
  }

  $('#btnAccueil').click(function(){
    resetNavBar();
    $("#accueil").removeClass('d-none');
    if (token){
      resetNavBar();
      $("#jouer").removeClass('d-none');
    }

  });

  $('#btnInscription').click(function(){
    resetNavBar();
    $('#inscription').removeClass('d-none');
  });

  $('#inscriptionArr').click(function(){
    resetNavBar();
    $("#accueil").removeClass('d-none');
  });


  $('#btnConnexion').click(function(){
    resetNavBar();
    $('#connexion').removeClass('d-none');
  });

  $('#connexionArr').click(function(){
    resetNavBar();
    $("#accueil").removeClass('d-none');
  });

  $('#btnJouer').click(function(){
    resetNavBar();
    $('#jouer').removeClass('d-none');
  });

  $('#vs-p').click(function(){
    resetNavBar();
    $('#p-vs-p').removeClass('d-none');
  });

  $('#p-start').click(function(){
    $("#p-settings").addClass("d-none");
    $("#p-p").removeClass("d-none");

    $('#playerName1').text($('#player1').val());
    $('#playerName2').text($('#player2').val());
  })

  $('#vs-c').click(function(){
    resetNavBar();
    $('#p-vs-c').removeClass('d-none');
  });

  $('#c-start').click(function(){
    $("#c-settings").addClass("d-none");
    $("#p-c").removeClass("d-none");

  });

  $('#c-save').click(function(){

    const user_id = _id;
    const game = game2.fen();

    axios.post('http://51.15.213.4:3000/saves/', {

      id_users: user_id,
      game: game
    }).then(function (response) {
      console.log(response);
      alert("sauvegarde faites");
    }).catch(function (error) {
      console.log(error);
      alert("Une erreur c'est produite lors de la sauvegarde");
    });
  })

  $('#c-reprendre').click(function(){

    const user_id = _id;

    axios.post('http://51.15.213.4:3000/save/reprendre', {

      id_users: user_id,

    }).then(function (response) {
      console.log(response);
      alert("sauvegarde reprise");
    }).catch(function (error) {
      console.log(error);
      alert("Une erreur c'est produite lors de la sauvegarde");
    });
  })

  $('#vs-m').click(function(){
    resetNavBar();
    $('#p-vs-m').removeClass('d-none');
  });

  $('#m-start').click(function(){
    $('#page-login').addClass('d-none');
    $('#page-lobby').removeClass('d-none');
    $('#page-game').removeClass('d-none');
  })

}();

  $('#envoyer_inscription').click(function(){

    const nomI = document.getElementById('nom_inscription').value;
    const mailI = document.getElementById('mail_inscription').value;
    const mdpI = document.getElementById('mdp_inscription').value;

    function validateEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }

    if (!nomI){
      alert("Champs du pseudo vide");
      return;
    }

    if (!validateEmail(mailI)){
      alert("Mail invalide");
      return;
    }

    if (!mdpI){
      alert("Champs du mdp vide");
      return;
    }

    axios.post('http://http://51.15.213.4:3000/auth/register/', {

      name: nomI.trim(),
      email: mailI.trim(),
      password: mdpI.trim()
    // axios({
    // method: "post",
    // url: "http://51.15.213.4:3000/auth/register/",
    // data: {
    //     name: nom.trim(),
    //     email: mail.trim(),
    //     password: mdp.trim()
    // },
    }).then(function (response) {
      console.log(response);
      alert("Inscription faites");
      $("#inscription").addClass('d-none');
      $("#jouer").removeClass('d-none');

    }).catch(function (error) {
      console.log(error);
      alert("Une erreur c'est produite lors de l'inscription");
    });
  });


  $('#envoyer_connexion').click(function(){

    const mailC = document.getElementById('mail_connexion').value;
    const mdpC = document.getElementById('mdp_connexion').value;
    // console.log(document.getElementById('nom').value);
    // console.log(document.querySelector('#email').value);
    // console.log($('#password').value);

    if (!mailC){
      alert("Champs du mail vide");
      return;
    }

    if (!mdpC){
      alert("Champs du mdp vide");
      return;
    }


    axios.post('http://51.15.213.4:3000/auth/login/', {

      email: mailC.trim(),
      password: mdpC.trim()


    }).then(function (response) {

      console.log(response);
      alert("Connexion établie");
      // console.log(response.data.token);
      token = response.data.token;
      sessionStorage.setItem('token', token);

      $("#connexion").addClass('d-none');
      $("#jouer").removeClass('d-none');

      console.log(response.headers);

      axios.get('http://51.15.213.4:3000/auth/me/',{

        headers: {'x-access-token': token}

      }).then(function (response) {

        console.log(response);
        name = response.data.name;
        _id = response.data._id;
        sessionStorage.setItem('name', name);
        sessionStorage.setItem('_id', _id);
        console.log(sessionStorage.getItem('name'));


      }).catch(function (error) {

        console.log(error.response.data);

        if (error.response.status === 500)
        alert("Un problème est survenu lors de la recherche de l'utilisateur.");
        if (error.response.status === 404)
        alert("Aucun utilisateur trouvé.");

      });


    }).catch(function (error) {

      console.log(error.response.data);

      if (error.response.status === 401)
        alert('Mot de passe invalid');
      if (error.response.status === 404)
        alert('Adresse Mail incorrect');

    });

  });

})
