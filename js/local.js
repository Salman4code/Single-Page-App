
var temp = [];
$(document).ready(function() {
  if (sessionStorage.getItem("userEmail") !== null) {
    call();

  }
  // $("#logOut").click(function(){
  //   sessionStorage.getItem("userEmail").remove();
  //   window.location.hash="";
  //   location.reload();
  //   return;
  // });

  $("#login1").click(function() {
    //alert("hi");
    var flag = 0;
    var userEmail = $("#email_id").val();;
    var userPassword = $("#password").val();
    sessionStorage.setItem('userEmail', userEmail);
    var obj = JSON.parse(localStorage.getItem("userdetail"));
    //var obj =JSON.parse(sessionStorage.getItem("userdetail"));
    for (var i = 0; i < obj.length; i++) {

      if (userEmail == obj[i].email_id && userPassword == obj[i].password) {

        flag++;
        break;
      }
    }

    if (flag != 0) {

      console.log("login Successful");
      event.preventDefault();
      call();
      return;
    } else {
      document.getElementById('d').innerHTML = "";
      console.log("login fail");
      //  $('#pwd').after("<span id='reset'>incorrect Password</span>");
      document.getElementById('d').innerHTML = "incorrect Password";

    }
  });
  $("#submit").click(function() {
    var getdetail = JSON.parse(localStorage.getItem("userdetail"));
    //  getdetail= JSON.parse(sessionStorage.getItem("userdetail"));
    console.log(getdetail);
    if (getdetail !== null) {
      console.log("in");
      temp = getdetail;
      detail();
      return;
    } else {
      console.log("detail null");
      detail();


    }

  });
});

function detail() {
  //var userinfo={};
  var status = 0;
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var rep = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  var name = $("#name").val();
  var email_id = $("#email_id").val();
  var password = $("#Password").val();
  var rPassword = $("#rPassword").val();
  console.log(typeof(name));
  if (name = "" || typeof(name) !== 'string') {
    alert("Enter your name");
    return;                     
  } else if (!re.test(email_id)) {
    alert("Invalid email");
    $('#emid').after('Please Enter Valid Email id');
    status = 1;
  } else if (!rep.test(password)) {
    alert('invalid Password');
    $('#pswd').after('Minimum 8 characters at least 1 Alphabet, 1 Number and 1 Special Character');
    status = 1;
  } else if (password != rPassword) {
    alert("Password mismatch");
    status = 1;
  }
  var obj = JSON.parse(localStorage.getItem("userdetail"));
  for (var i = 0; i < obj.length; i++) {
    if (email_id == obj[i].email_id) {
      alert("email_id is already register");
      return;
    }

  }
  if (status == 0) {
    var userinfo = new input(name, email_id, password, rPassword);

    console.log(userinfo);
    temp[temp.length] = userinfo;
    console.log(temp.length);
    if (typeof(Storage) !== undefined) {
      localStorage.setItem('userdetail', JSON.stringify(temp));
      //sessionStorage.setItem('userdetail',JSON.stringify(temp));

    }
    event.preventDefault();
    call();
  }

  function input(name, email_id, password, rPassword) {
    this.name = name;
    this.email_id = email_id;
    this.password = password;
    this.rPassword = rPassword;
  }
}

function call() {
  $.ajax({
    url: "home.html",
    type: "GET",
    dataType: 'html',
    success: function(response) {
      console.log('page was loaded', response);
      $('body').html(response);
    },
    error: function(error) {
      console.log("page was not loaded ", error);
    },
    complete: function(xhr, status) {
      console.log("the request is completed");
    }
  });
}
