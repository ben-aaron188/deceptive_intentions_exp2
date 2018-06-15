// page meta
var number_of_start_screens = 2;
var number_of_ic_screens = 1;
var number_of_introduction_screens = 3;
var number_of_task_screens = 1;
var number_of_outro_screens = 4;
var navigation_key = 13;
// stop page meta

var sum_pages = number_of_start_screens + number_of_ic_screens + number_of_introduction_screens + number_of_task_screens + number_of_outro_screens;

// page build
$(document).ready(function() {
  get_unid();
  get_condition();
  init_data();
  for (i = 1; i < sum_pages + 1; i++) {
    var div_to_append = '<div class="pt_child vertical" id="div' + i + '"><div class="pt_child_child" id="sub_div' + i + '"></div><div class="btn_proceed">Continue</div></div>';
    // <span id="press_enter">press enter to proceed</span>
    $("#pt_wrapper").append(div_to_append);
  }
  // set specific classes
  $("#sub_div3").addClass('informed_consent');
  // $("#sub_div6").addClass('task');

  // add content
  $("#sub_div1").text(intro1);
  $("#sub_div2").text(intro2);
  $("#sub_div3").text(ic);
  if(data.condition == 1){
    $("#sub_div4").text(instructions1_d);
    $("#sub_div5").text(instructions2_d);
    $("#sub_div6").text(instructions3_d);
  } else if(data.condition == 0){
    $("#sub_div4").text(instructions1_t);
    $("#sub_div5").text(instructions2_t);
    $("#sub_div6").text(instructions3_t);
  }

  $("#sub_div7").text(task);
  $("#sub_div8").text(outro1);
  $("#sub_div9").text(outro2);
  $("#sub_div10").text(outro3);
  $("#sub_div11").text(outro4);

  init_page_transition_button();

  $(".btn_proceed").on('click', function(e) {

// TODO:
// flow:
// intro1, intro2
// ic
// d: instr1, instr2 (activity), instr3 (selection), instr4, instr5, instr6
// t: instr1, instr2 (activity), instr4, instr5, instr6
// task
// d: outro1, outro2, outro3, outro4, outro5, outro6, outro7
// t: outro1, outro2, outro3, outro4, outro5, outro7


    if (get_visible_element() == "div4") {
      if (data.condition == 0) {
        // truthful
        $("#sub_div5").append('<input id="input_activity" required="true" maxlength="50" size="30"></input>');
      } else if (data.condition == 1) {
        // deceptive
        show_activities(get_activities(3, 'batch1'), $("#sub_div5"));
        scroll_to_location();
      }
    } else if (get_visible_element() == "div5") {
      if (data.condition == 0) {
        // truthful
        if ($("#input_activity").val().length > 5) {
          data.activity = $("#input_activity").val();
          scroll_to_location();
        }
      } else if (data.condition == 1) {
        // deceptive
        if (assign_activity()) {
          data.activity = assigned_activity;
          scroll_to_location();
        }
      }


    } else if (get_visible_element() == "div6") {
      $("#sub_div7").append('<textarea id="input_area" spellcheck="true" autofocus required="true" rows="20" cols="30"></textarea>');
      scroll_to_location();
    } else if (get_visible_element() == "div7") {
      if (validate_text($("#input_area"), 1, 'both', 0.01)) {
        data.input_area = $("#input_area").val();
        scroll_to_location();
        $("#sub_div8").append(
          '<div class="slidecontainer"><input type="range" min="0" max="100" value="50" class="slider" id="slider_1">' +
          '<output class="slider_output" id="slider_1_output">move the slider</output>' +
          '<div class="slider_output_labels"><span id="label_left">(nothing)</span><span id="label_right">(all of it)</span></div>' +
          '</div>'
        );
        $("#slider_1").on("input change", function() {
          $("#slider_1_output").val($("#slider_1").val() + '%');
        });
      }
    } else if (get_visible_element() == "div8") {
      if ($("#slider_1_output").val() != 'move the slider') {
        scroll_to_location();
        $("#sub_div9").append(
          '<div class="slidecontainer"><input type="range" min="0" max="100" value="50" class="slider" id="slider_2">' +
          '<output class="slider_output" id="slider_2_output">move the slider</output>' +
          '<div class="slider_output_labels"><span id="label_left">(nothing)</span><span id="label_right">(all of it)</span></div>' +
          '</div>'
        );
        $("#slider_2").on("input change", function() {
          $("#slider_2_output").val($("#slider_2").val() + '%');
        });
      } else {
        console.log('not moved');
      }
    } else if (get_visible_element() == 'div9') {
      if ($("#slider_2_output").val() != 'move the slider') {
        scroll_to_location();
      } else {
        console.log('not moved');
      }
    } else if (get_visible_element() == "div11") {
      console.log('check for submission');
      // add input for prolific id
      unblock_copy_pasting();
      var prolific_id = prompt("Please confirm your Prolific ID to finish");
      if (prolific_id.length > 10) {
        data.user_id = prolific_id;
        console.log(data);
        // collect_2_php(data);
      } else {
        alert("Please enter a valid prolific participant number.");
      }
    } else {
      scroll_to_location();
    }

    // add activity selection

    // add input for activity
  });
});
