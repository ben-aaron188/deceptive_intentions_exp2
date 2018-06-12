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

// retrieve actitvities
function get_activities(n, batch) {
  var batch_selection = [];
  $(t_activities).each(function(i, eli) {
    if (eli.batch == batch) {
      batch_selection.push(eli);
    }
  });
  var n_selection = shuffle(batch_selection).slice(0, n);
  return n_selection;
}


// show activities for deceptive condition
function show_activities(array_with_activities, ID) {
  ID.append('</br>');
  $(array_with_activities).each(function(i, eli) {
    var button_x = $('<button/>', {
      text: eli.activity,
      class: 'normal_button',
      id: 'activity_button' + i,
      click: function() {
        if ($(this).hasClass('active_button') == true) {
          $(this).removeClass('active_button');
        } else {
          $(this).addClass('active_button');
        }
      }
    });
    $("#sub_div5").append(button_x);
  });
}

// assign activity from selection
function assign_activity() {
  var activated_buttons = [];
  var final_activity;
  $(".active_button").each(function(i, eli) {
    activated_buttons[i] = eli;
  });
  if (activated_buttons.length < 1) {
    alert('Select at least one activity that you are NOT going to do in the next 7 days.');
  } else if (activated_buttons.length > 1) {
    final_activity = shuffle(activated_buttons)[0];
    assigned_activity = final_activity.textContent;
    return true;
  } else if(activated_buttons.length == 1){
    final_activity = activated_buttons[0];
    assigned_activity = final_activity.textContent;
    return true;
  }
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

function sum(arr) {
  var r = 0;
  $.each(arr, function(i, v) {
    r += v;
  });
  return r;
}

function shuffle(array) {
  var newarr = [];
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    newarr[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return newarr;
}
