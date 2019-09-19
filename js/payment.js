
  function payWithPaystack(){
    var handler = PaystackPop.setup({
      key: 'pk_test_87976b2349a2778f7d991d8cf1d751c7e3ea3edd',
      email: 'onyinyechukwuma14@gmail.com',
      amount: 13222,
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

