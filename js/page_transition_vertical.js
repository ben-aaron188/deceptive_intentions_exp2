function scroll_to_location() {
  var current_top = $(window).scrollTop();
  var new_top = current_top + $(window).height();
  window.scrollBy(0, $(window).height());
}

function init_page_transition_button() {
  $(document).on('keydown', function(e) {
    if (e.keyCode == 32 && e.target == document.body) {
      e.preventDefault();
    }
  });
  // $(".btn_proceed").on('click', function(e) {
  //   scroll_to_location();
  //   console.log(get_visible_element());
  // });
  $(".pt_child").css({
    width: $(window).width(),
    height: $(window).height()
  });
}


function init_page_transition_key(navigation_key) {
  $(document).on('keydown', function(e) {
    if (e.keyCode == 32 && e.target == document.body) {
      e.preventDefault();
    }
    if (e.keyCode == navigation_key) {
      if (e.originalEvent.target.id !== 'input_area') {
        scroll_to_location();
        return;
      }
    }

  });

  $(".pt_child").css({
    width: $(window).width(),
    height: $(window).height()

  });
}

// TODO:
