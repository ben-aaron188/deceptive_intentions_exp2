// page meta
var number_of_start_screens = 2;
var number_of_ic_screens = 1;
var number_of_introduction_screens = 2;
var number_of_task_screens = 1;
var number_of_outro_screens = 2;
// stop page meta

var sum_pages = number_of_start_screens + number_of_ic_screens + number_of_introduction_screens + number_of_task_screens + number_of_outro_screens;

// page build
$(document).ready(function() {
  get_unid();
  get_condition();
  for (i = 1; i < sum_pages + 1; i++) {
    var div_to_append = '<div class="pt_child vertical" id="div' + i + '"></div>';
    $("#pt_wrapper").append(div_to_append);
  }
  // set specific classes
  $("#div3").addClass('informed_consent');
  $("#div6").addClass('task');
  // add content
  $("#div1").text(intro1);
  $("#div2").text(intro2);
  $("#div3").text(ic);
  $("#div4").text(instructions1);
  $("#div5").text(instructions2);
  $("#div6").text(task);
  $("#div7").text(outro1);
  $("#div8").text(outro2);

  init_page_transition();
});

// flow
// check for page changes
$(document).keyup(function(e) {
  var pressed_key = e.keyCode || e.which;
  if (pressed_key == 32) {
    console.log(get_visible_element());
    if (get_visible_element() == "div3") {
      // allow for y and n agreement
      console.log('passed ic');
      // at == "div4" -> run collect_1
    }
    if (get_visible_element() == "div4") {
      console.log('passed ic');
      // at == "div4" -> run collect_1
    }
    if (get_visible_element() == "div5") {
      console.log('prepare task');
      $("#div6").append('<textarea id="input_area" spellcheck="true" autofocus required="true" rows="20" cols="30"></textarea>');
    }
    if (get_visible_element() == "div8") {
      console.log('check for submission');
      if (confirm("This will end the experiment and redirect you to prolific...")) {
        console.log('ok');
        // after == "div8" -> run collect_2
      }
    }
  }
});
