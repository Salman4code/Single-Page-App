$(document).ready(function()
{
  $('#signup').click(function(e)
  {
    // e.preventDefault();
    var page=$(this).attr('href');
    console.log(page);
    loadpage(page)
  });

  $('#login').click(function(e)
  {
    // event.preventDefault();
    var page=$(this).attr('href');
    console.log(page);
    loadpage(page)
  });
  $('#logOut').click(function(){
    var page=$(this).attr('href');
    console.log(page);
    loadpage(page);
  });
});
function loadpage(page)
{
  $.ajax({
    url:page,
    type:"GET",
    dataType:'html',
    success:function(response)
    {
      console.log('page was loaded',response);
      $('.content').html(response);
    },
    error:function(error)
    {
      console.log("page was not loaded ",error);
    },
    complete:function(xhr,status)
    {
      console.log("the request is completed");
    }
  });
}
