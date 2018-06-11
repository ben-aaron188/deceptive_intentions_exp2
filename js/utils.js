// page io

// check whether element is visible
function is_visible(element) {
  var element_top = $(element).offset().top;
  var element_bottom = element_top + $(element).height();

  var window_top = $(window).scrollTop();
  var window_bottom = window_top + $(window).height();

  return element_bottom >= window_top && element_top <= window_bottom;
}

// get visible element
function get_visible_element() {
  var visible_element;
  $.each($(".pt_child"), function(i, eli) {
    // var temp_div_id = '$("#'+eli.id+'")';
    if (is_visible(this)) {
      visible_element = this.id;
    }
    // console.log(is_visible(this));
    // console.log(this);
  });
  return visible_element;
}

// get unid
function get_unid() {
  unid = twoletters() + twoletters() + randomdigit(0, 9) + randomdigit(0, 9) + randomdigit(0, 9) + randomdigit(0, 9) + randomdigit(0, 9) + randomdigit(0, 9);
}

function get_condition() {
  condition = 1;
}


function init_data() {
  data = {
    'id': unid,
    'date': moment().format('l'),
    'time': moment().format('LTS'),
    'condition': condition
  };
}

// collect data for 'collect 1' moment
function collect_data_1() {

}

// collect data for 'collect 2' moment
function collect_data_2() {
  data.input_area = 'abc';
  data.user_id = 'prolific_id';
}

// misc
function randomdigit(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function twoletters() {
  var output = "";
  var choices = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  for (var i = 0; i < 2; i++)
    output += choices.charAt(Math.floor(Math.random() * choices.length));
  return output;
}
