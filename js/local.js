var j = 0,
  temp = [];
$(document).ready(function() {

  $("#login1").click(function() {
    alert("hi");
    var flag = 0;
    var usernm = $("#usr").val();;
    var pwd = $("#pwd").val();
    var obj = JSON.parse(localStorage.getItem("userdetail"));
    for (var i = 0; i < obj.length; i++) {

      if (usrnm == obj[i].emailid && pwd == obj[i].pswd) {
        flag++;
        break;
      }
    }
    if (flag!=0) {
      console.log("login Successful");
      event.preventDefault();
      call();
      return;
    } else {
      console.log("login fail");
      event.preventDefault();
      call();
    }
  });
  $("#submit").click(function() {

    nm = JSON.parse(localStorage.getItem("userdetail"));
    console.log(nm);
    if (nm !== null) {
      console.log("in");
      temp = nm;
      detail();
      return;
    } else {
      console.log("nm null");
      detail();
      return;
    }

  });
});

function detail() {
  //var userinfo={};
  var status = 0;
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var rep = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  var name = $("#name").val();
  var emailid = $("#emid").val();
  var pswd = $("#pswd").val();
  var rpswd = $("#rpwd").val();
  if (!re.test(emailid)) {
    alert("Invalid email");
    $('#emid').after('Please Enter Valid Email id');
    status = 1;
  } else if (!rep.test(pswd)) {
    alert('invalid Password');
    $('#pswd').after('Minimum 8 characters at least 1 Alphabet, 1 Number and 1 Special Character');
    status = 1;
  } else if (pswd != rpswd) {
    alert("Password mismatch");
    status = 1;
  }
  if (status == 0) {
    var userinfo = new input(name, emailid, pswd, rpswd);
    console.log(userinfo);
    temp[temp.length] = userinfo;
    console.log(temp.length);
    if (typeof(Storage) !== undefined) {
      localStorage.setItem('userdetail', JSON.stringify(temp));
    }
    event.preventDefault();
    call();
  }

  function input(name, email_id, pswd, rpswd) {
    this.name = name;
    this.emailid = email_id;
    this.pswd = pswd;
    this.rpswd = rpswd;
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
