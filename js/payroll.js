$("form").submit(function(e){
    e.preventDefault();
    const fullname = $("input[Full Name='fullname']").val();
    const qualification = $("input[Qualification='qualification']").val();
    const role = $("input[Role='role']").val();
    const level = $("input[Level='level']").val();
    const salary = $("input[Salary='salary']").val();
