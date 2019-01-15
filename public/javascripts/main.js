$(document).ready(function(){
 $('.deleteUser').on('click',deleteUser);

});

$(document).ready(function(){
 $('.updateUser').on('click',myFunction);

});




function myFunction(){
    console.log($(this).data('id'));
	var x=document.getElementsByClassName('same')[$(this).data('id')];
    if (x.style.display === "none")
        x.style.display = "block";
    else
      x.style.display = "none";
}


function deleteUser(){
var confirmation=confirm("Are You sure?");
if(confirmation){
    $.ajax({
    	type:'DELETE',
    	url:'/delete/'+$(this).data('id')
    }).done(function(response){
    	location.reload(true);
    	
    })
}
else{
	return false;
}
}

