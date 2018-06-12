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
    if (is_visible(this)) {
      visible_element = this.id;
    }
  });
  return visible_element;
}

// check_content
function validate_text(ID, desired_length, test_kind, threshold) {
  if (test_kind == 'both') {
    if (check_text(ID, desired_length) === true) {
      if (check_input(ID, threshold) === true) {
        return true;
      }
    }
  } else if (test_kind == 'length') {
    if (check_text(ID, desired_length) === true) {
      return true;
    }
  } else if (test_kind == 'content') {
    if (check_input(ID) === true) {
      return true;
    }
  }
}

function check_input(ID, threshold) {
  // threshold of 0.01 is meaningful and advisable
  var tester_array = [];
  var tester2 = 0;
  var keywords = ["the", "to", "in", "at", "with", "by", "of", "a", "an", "from", "on", "there", "here", "I", "you", "they", "we", "us", "is", "it"];
  var alert_msg = "Please use proper English words and sentences in your answer. You will not be able to proceed otherwise. We cannot validate your participation without serious participation.";
  textin = ID.val().toLowerCase().split(" ");
  $.each(keywords, function(index, val) {
    tester = $.inArray(val, textin);
    if (tester < 0) {
      tester2 = 0;
    } else {
      tester2 = 1;
    }
    tester_array.push(tester2);
  });
  checksum_tester = sum(tester_array);
  if ((checksum_tester / textin.length) < threshold) {
    alert(alert_msg);
  } else {
    return true;
  }
}

function check_text(ID, desired_length) {
  var alert_msg = "Please use at least " + desired_length + " words to answer this questions.";
  var raw = ID.val().toLowerCase().split(/\s+/);
  if (raw.length < desired_length) {
    alert(alert_msg);
  } else {
    return true;
  }
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

function set_slider_value(val, output_id) {
  $(output_id).val(val + '%').hide();
}

function sum(arr) {
  var r = 0;
  $.each(arr, function(i, v) {
    r += v;
  });
  return r;
}
