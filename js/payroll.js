$(document).ready(function(){
    $("#myInput").on("keyup", function() {
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
      }
 
    $(".data-table tbody").append("<tr data-name='"+name+"' data-position='"+position+"'data-startDate='"+startDate+"'data-salary='"+salary+"'><td>"+name+"</td><td>"+position+"</td><td>"+startDate+"</td><td>"+salary+"</td><td><button class='btn btn-info btn-xs btn-edit'>Edit</button><button class='btn btn-danger btn-xs btn-delete'>Delete</button></td></tr>");

    $('#name').val('');
    $('#position').val('');
    $('#startDate').val('');
    $('#salary').val('');
});

$("body").on("click", ".btn-delete", function(){
    $(this).parents("tr").remove();
});

$("body").on("click", ".btn-edit", function(){
    const name = $(this).parents("tr").attr('data-name');
    const position = $(this).parents("tr").attr('data-position');
    const startDate= $(this).parents("tr").attr('data-startDate');
    const salary = $(this).parents("tr").attr('data-salary');

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
    $(this).parents("tr").find("td:eq(1)").text(startDate);
    $(this).parents("tr").find("td:eq(1)").text(salary);
 
    $(this).parents("tr").attr('data-name', name);
    $(this).parents("tr").attr('data-position', position);
    $(this).parents("tr").attr('data-startDate', startDate);
    $(this).parents("tr").attr('data-salary', salary);
    

    $(this).parents("tr").find(".btn-edit").show();
    $(this).parents("tr").find(".btn-cancel").remove();
    $(this).parents("tr").find(".btn-update").remove();
});