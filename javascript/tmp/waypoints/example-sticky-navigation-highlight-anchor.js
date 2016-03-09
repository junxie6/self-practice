$(document).ready(function(){

  var images = $('#section1 img');
  var count = images.length;
  var transitions = 1;
  var callCount = 0;
    
  TweenMax.set(images, {autoAlpha:0});
  TweenMax.set($(".active"), {autoAlpha:1});

  function fadeImage()
  {
    var active = $(".active");
    var next = active.next();
    
    TweenMax.set(active, {autoAlpha:0, className:"-=active"});
    TweenMax.set(next, {autoAlpha:1, className:'+=active', onComplete:nextImage});
    
    transitions++;
    
    console.log(transitions);
  }

  function nextImage()
  {
    if(transitions < count)
    {
      setTimeout(fadeImage, 1000);
    }
    else
    {
      transitions = 0;
      TweenMax.set(images[0], {autoAlpha:1, className:'+=active'});
      //setTimeout(fadeImage,2000);
    }
  }

  // ======================================
  // Helper functions
  // ======================================
  // Get section by href
  function getRelatedContent(_element){
    return $($(_element).attr('href'));
  }

  // Get link by section id
  function getRelatedNavigation(_id){
    return $('#sticky-nav a[href=#' + _id + ']');
  }

  // ======================================
  // Smooth scroll to content
  // ======================================
  $('#sticky-nav a').on('click',function(event){
    event.preventDefault();

    var _screenHeightMiddle = (window.innerHeight / 2) - (getRelatedContent(this).height() / 2);

    $('html,body').animate({
      scrollTop: getRelatedContent(this).offset().top - _screenHeightMiddle,
    });
  });

  // ======================================
  // Sticky Navigation
  // ======================================
  new Waypoint.Sticky({
    element: $('#sticky-nav')[0],
    stuckClass: 'sticky-nav-stuck',
  });

  $(window).on('scroll', function (event) {
    if ($(this).scrollTop() > 0) {
      if (callCount == 0) {
        ++callCount;
        setTimeout(fadeImage, 100);
      }
    }
  });

  // ======================================
  // Creating Waypoint
  // ======================================
  $('.main-section').each(function(){
    // set a Waypoint when scrolling down.
    new Waypoint({
      element: $(this).get(0),
      handler: function(direction) {
        if (direction == 'down') {
          $('.sticky-nav-a').removeClass('sticky-nav-a-active');
          getRelatedNavigation(this.element.id).addClass('sticky-nav-a-active');
        }
      },
      offset: function() {
        // returning the bottom of the div when it is in the middle of the screen.
        return (window.innerHeight / 2) + (this.element.clientHeight / 2);
      },
    });

    // set a Waypoint when scrolling up.
    new Waypoint({
      element: $(this).get(0),
      handler: function(direction) {
        if (direction == 'up') {
          $('.sticky-nav-a').removeClass('sticky-nav-a-active');
          getRelatedNavigation(this.element.id).addClass('sticky-nav-a-active');
        }
      },
      offset: function() {
        // returning the top of the div when it is in the middle of the screen.
        return (window.innerHeight / 2) - (this.element.clientHeight / 2);
      },
    });
  });
});

