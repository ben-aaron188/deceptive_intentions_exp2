// page meta
var number_of_start_screens = 2;
var number_of_ic_screens = 1;
var number_of_introduction_screens = 2;
var number_of_task_screens = 1;
var number_of_outro_screens = 4;
var navigation_key = 13;
// stop page meta

var sum_pages = number_of_start_screens + number_of_ic_screens + number_of_introduction_screens + number_of_task_screens + number_of_outro_screens;

// page build
$(document).ready(function() {
  get_unid();
  get_condition();
  for (i = 1; i < sum_pages + 1; i++) {
    var div_to_append = '<div class="pt_child vertical" id="div' + i + '"><div class="pt_child_child" id="sub_div' + i + '"></div><div class="btn_proceed">button</div></div>';
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
  $("#sub_div4").text(instructions1);
  $("#sub_div5").text(instructions2);
  $("#sub_div6").text(task);
  $("#sub_div7").text(outro1);
  $("#sub_div8").text(outro2);
  $("#sub_div9").text(outro3);
  $("#sub_div10").text(outro4);

  init_page_transition_button();

  $(".btn_proceed").on('click', function(e) {
    console.log(get_visible_element());
    if (get_visible_element() != "div6" && get_visible_element() != "div7" && get_visible_element() && "div8") {
      scroll_to_location();
      if (get_visible_element() == "div5") {
        $("#sub_div6").append('<textarea id="input_area" spellcheck="true" autofocus required="true" rows="20" cols="30"></textarea>');
      }
    } else if (get_visible_element() == 'div6') {
      if (validate_text($("#input_area"), 1, 'both', 0.01)) {
        scroll_to_location();
        $("#sub_div7").append(
          '<div class="slidecontainer"><input type="range" min="0" max="100" value="50" class="slider" id="slider_1">' +
          '<output class="slider_output" id="slider_1_output">move the slider</output>' +
          '<div class="slider_output_labels"><span id="label_left">(nothing)</span><span id="label_right">(all of it)</span></div>' +
          '</div>'
        );
        $("#slider_1").on("input change", function() {
          $("#slider_1_output").val($("#slider_1").val() + '%');
        });
      }
    }
      if (get_visible_element() == "div7") {
        if ($("#slider_1_output").val() != 'move the slider') {
          scroll_to_location();
          $("#sub_div8").append(
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
      }
      if (get_visible_element() == 'div8') {
        if ($("#slider_2_output").val() != 'move the slider') {
          scroll_to_location();
        } else {
          console.log('not moved');
        }
      }
      if (get_visible_element() == "div10") {
        console.log('check for submission');
        // add input for prolific id
        // unblock CP
        var prolific_id = prompt("Please confirm your Prolific ID to finish");
        if (prolific_id.length > 10) {
          console.log('ok');
          // after == "div8" -> run collect_2
        } else {
          alert("Please enter a valid prolific participant number.");
        }
      }

    // add activity selection

    // add input for activity
  });
});
