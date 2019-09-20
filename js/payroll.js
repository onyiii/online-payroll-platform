$(document).ready(function(){
    $("#myInput").keyup (function() {
      const value = $(this).val().toLowerCase();
      $("#myTable tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });
  $("form").submit(function(e){
    e.preventDefault();
    const name = $('#name').val();
    const position = $('#position').val();
    const startDate = $('#startDate').val();
    const salary = $('#salary').val();
    if (!name || !position || !startDate || !salary) {
        $('.regMessage').html('Kindly fill in all fields');
        return;
     }  else  {
       $.ajax(
        {
          method:'POST',
          url:"http://localhost:3000/records",
          data: {
            name,
            position,
            startDate,
            salary
          },
          success: function(){
            $.get("http://localhost:3000/records",function(data, status){
      data.forEach(record=>{ 
        $("#myTable").append(`<tr ><td value ="${record.name}">${record.name}</td><td value ="${record.position}">"${record.position}"</td><td value ="${record.startDate}">${record.startDate}</td><td value ="${record.salary}">${record.salary}</td><td><button class='btn btn-info btn-xs btn-edit'>Edit</button><button class='btn btn-danger btn-xs btn-delete'>Delete</button></td><td><button type="button" onclick="payWithPaystack()"> Pay </button> </td></tr>`);}) 
  } 

    )
           }
        }
       ) 
     }   
    
    

    $('#name').val('');
    $('#position').val('');
    $('#startDate').val('');
    $('#salary').val('');
});


$("body").on("click", ".btn-delete", function(){
    $(this).parents("tr").remove();
});

$("body").on("click", ".btn-edit", function(){
    const name = $(this).parents("tr").attr('value');
    const position = $(this).parents("tr").attr('value');
    const startDate= $(this).parents("tr").attr('value');
    const salary = $(this).parents("tr").attr('value');

    $(this).parents("tr").find("td:eq(0)").html('<input name="edit_name" value="'+name+'">');
    $(this).parents("tr").find("td:eq(1)").html('<input name="edit_position" value="'+position+'">');
    $(this).parents("tr").find("td:eq(2)").html('<input name="edit_startDate" value="'+startDate+'">');
    $(this).parents("tr").find("td:eq(3)").html('<input name="edit_salary" value="'+salary+'">');

    $(this).parents("tr").find("td:eq(4)").prepend("<button class='btn btn-info btn-xs btn-update'>Update</button><button class='btn btn-warning btn-xs btn-cancel'>Cancel</button>")
    $(this).hide();
});

$("body").on("click", ".btn-cancel", function(){
    const name = $(this).parents("tr").attr('data-name');
    const position = $(this).parents("tr").attr('data-position');
    const startDate= $(this).parents("tr").attr('data-startDate');
    const salary = $(this).parents("tr").attr('data-salary');

    $(this).parents("tr").find("td:eq(0)").text(name);
    $(this).parents("tr").find("td:eq(1)").text(position);
    $(this).parents("tr").find("td:eq(2)").text(startDate);
    $(this).parents("tr").find("td:eq(3)").text(salary);

    $(this).parents("tr").find(".btn-edit").show();
    $(this).parents("tr").find(".btn-update").remove();
    $(this).parents("tr").find(".btn-cancel").remove();
});

$("body").on("click", ".btn-update", function(){
    const name = $(this).parents("tr").find("input[name='edit_name']").val();
    const position = $(this).parents("tr").find("input[name='edit_position']").val();
    const startDate = $(this).parents("tr").find("input[name='edit_startDate']").val();
    const salary = $(this).parents("tr").find("input[name='edit_salary']").val();



    $(this).parents("tr").find("td:eq(0)").text(name);
    $(this).parents("tr").find("td:eq(1)").text(position);
    $(this).parents("tr").find("td:eq(2)").text(startDate);
    $(this).parents("tr").find("td:eq(3)").text(salary);
 
    $(this).parents("tr").attr('data-name', name);
    $(this).parents("tr").attr('data-position', position);
    $(this).parents("tr").attr('data-startDate', startDate);
    $(this).parents("tr").attr('data-salary', salary);
    

    $(this).parents("tr").find(".btn-edit").show();
    $(this).parents("tr").find(".btn-cancel").remove();
    $(this).parents("tr").find(".btn-update").remove();

    
    
  });
 
  function payWithPaystack(){
    var handler = PaystackPop.setup({
      key: 'pk_test_87976b2349a2778f7d991d8cf1d751c7e3ea3edd',
      email: 'onyinyechukwuma14@gmail.com',
      amount: 1000000,
      ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
      metadata: {
         custom_fields: [
            {
                display_name: "Mobile Number",
                variable_name: "mobile_number",
                value: "+2348012345678"
            }
         ]
      },
      callback: function(response){
          alert('success. transaction ref is ' + response.reference);
      },
      onClose: function(){
          alert('window closed');
      }
    });
    handler.openIframe();
  }
