function collect_1_php(var_data) {
  $.ajax({
    type: "POST",
    url: "../php/collect_1.php",
    data: {
      data_pre: var_data
    },
    error: function(data) {
      // alert(data);
    },
    success: function(data) {
      // console.log(data);
      console.log("... collect 1 successful ...");
    },
  });
}
