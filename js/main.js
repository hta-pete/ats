$(function(){

  var $window = $(window),
	cachedWidth = $window.width(),
  fsImg         = $('.img-fs'),
  startwidth    = 640, 
  startheight   = 360,
  ratio         = startheight/startwidth,
  imagewidth    = $(this).width(),
  imageheight   = $(this).height(),
  browserwidth  = $window.width(),
  browserheight = $window.height();

  $window.on('resize', function(){ 
        
      imagewidth    = $(this).width();
      imageheight   = $(this).height();
      browserwidth  = $window.width();
      browserheight = $window.height();
                  
      fsImage();  
                      
  });

  function fsImage(){
   
      if ((browserheight/browserwidth) > ratio){
          fsImg.height(browserheight);
          fsImg.width(browserheight / ratio);
      } else {
          fsImg.width(browserwidth);
          fsImg.height(browserwidth * ratio);
      };
      fsImg.css('left', (browserwidth - fsImg.width())/2);
      fsImg.css('top', (browserheight - fsImg.height())/2);

  };
  fsImage();  



  var raf           = requestAnimationFrame;
  var lastScrollTop = $window.scrollTop();

  if (raf) {
      loop();
  }

  function loop() {

      var scrollTop = $window.scrollTop();
      var y         = (scrollTop > lastScrollTop) ? 'down' : ((scrollTop === lastScrollTop) ? 'none' : 'up');

      if (lastScrollTop === scrollTop) {
          raf(loop);
          return;
      } else {
          lastScrollTop = scrollTop;
          raf(loop);
      }
      if( scrollTop > 90 ){
          $('header').addClass('active');
          $('#apply-sticky-btn').addClass('show');
      } else{
          $('header').removeClass('active');
          $('#apply-sticky-btn').removeClass('show');
      }
      lastScrollTop = scrollTop;


      if ($('#youmatter').isInViewport()) {

          $('#why-ats-tab-menu li').removeClass('active');
          $('#why-ats-tab-menu li:nth-child(1)').addClass('active');

      } else if ($('#stability').isInViewport()) {

          $('#why-ats-tab-menu li').removeClass('active');
          $('#why-ats-tab-menu li:nth-child(2)').addClass('active');
          
      } else if ($('#quality').isInViewport()) {

          $('#why-ats-tab-menu li').removeClass('active');
          $('#why-ats-tab-menu li:nth-child(3)').addClass('active');
          
      } else if ($('#safety').isInViewport()) {

          $('#why-ats-tab-menu li').removeClass('active');
          $('#why-ats-tab-menu li:nth-child(4)').addClass('active');
          
      } else if ($('#our-drivers').isInViewport()) {

          $('#why-ats-tab-menu li').removeClass('active');
          $('#why-ats-tab-menu li:nth-child(5)').addClass('active');
          
      }

      



    

      //console.log( $('#youmatter').offset().top - scrollTop )

  }


  $.fn.isInViewport = function() {
      var elementTop = $(this).offset().top -210;
      var elementBottom = elementTop + $(this).outerHeight();

      var viewportTop = $(window).scrollTop();
      var viewportBottom = viewportTop + $(window).height();

      return elementBottom > viewportTop && elementTop < viewportBottom;
  };


  $window.resize(function(){

        var newWidth = $window.width();

        if(newWidth !== cachedWidth){

            sizeStuff();
            cachedWidth = newWidth;
        }

    });

    function sizeStuff(){

      var question_width = $('#quick-app .quick-questions').width(); 
      var question_width2 = $('.quick-app .quick-questions').width(); 
      var question_count = $('.quick-questions li').length;

      $('#quick-app .questions-wrap').width(question_width * question_count);
      $('.quick-app .questions-wrap').width(question_width2 * question_count);

      $('#quick-app .quick-questions li').each(function(){

        $(this).width(question_width + 'px');

      });
      $('.quick-app .quick-questions li').each(function(){

        $(this).width(question_width2 + 'px');

      });

    }
    sizeStuff();

    $('#quick-app .quick-questions li .question-btn').on('click', function(){

        var question_width  = $('#quick-app .quick-questions').width(); 
        var index           = $(this).parent().index()+1;

        $(this).addClass('checked').siblings().removeClass('checked');

        if( $(this).parent().next().length > 0 ){

          $(this).parent().parent().parent().css({ transform:'translateX('+ -question_width*index +'px)' });
          $('#quick-app .quick-questions-nav span').removeClass('active').eq(index).addClass('active');

        }

    });


    $('.quick-app .quick-questions li .question-btn').on('click', function(){

        var question_width  = $('.quick-app .quick-questions').width(); 
        var index           = $(this).parent().index()+1;

        $(this).addClass('checked').siblings().removeClass('checked');

        if( $(this).parent().next().length > 0 ){

          $(this).parent().parent().parent().css({ transform:'translateX('+ -question_width*index +'px)' });
          $('.quick-app .quick-questions-nav span').removeClass('active').eq(index).addClass('active');

        }

    });



	//Slick slider

  if( $('.home-hero').length ){
    $('.home-hero .slider-wrap').slick({
          infinite:true,
          autoplay:true,
          autoplaySpeed:6000,
          pauseOnHover:false,
          pauseOnDotsHover:true,
          dots:true,
          arrows:true,
          nextArrow: $('.slider-next'),
          prevArrow: $('.slider-prev'),
          slidesToShow:1,
          slidesToScroll:1,
          fade:true,
          customPaging : function(slider, i) {
            return '<a></a>';
        },
    });
  }
  if( $('.history-slider').length ){
    $('.history-slider').slick({
          infinite:true,
          autoplay:true,
          autoplaySpeed:6000,
          speed:2000,
          pauseOnHover:false,
          pauseOnDotsHover:true,
          dots:true,
          arrows:false,
          slidesToShow:1,
          slidesToScroll:1,
          fade:true,
          customPaging : function(slider, i) {
            return '<a></a>';
        },
    });
  }
    $('.mobile-nav-btn').on('click', function(){

        $(this).toggleClass('active');
        $('#mobile-nav').fadeToggle('fast');
        $('body').toggleClass('no-scroll');

    });


    $('.btn-search').on('click', function(e){

      e.preventDefault();
      $('.overlay-search').fadeToggle('fast');
      $('body').addClass('no-scroll');

    });

    $('.close-overlay').on('click', function(){

      $('.overlay-search').fadeOut('fast');
      $('#quick-app').removeClass('active').fadeOut('fast');
      $('body').removeClass('no-scroll');

    });

    $('.apply-btn, #apply-sticky-btn').on('click', function(e){

      e.preventDefault();

      $('#quick-app').addClass('active').fadeIn('fast', function(){
        $('body').addClass('no-scroll');
      });
      sizeStuff();

    });
    $('.btn_cancel').on('click', function(){

      $('#quick-app').removeClass('active').fadeOut('fast');
      $('body').removeClass('no-scroll');

    });


    $('.has-sub-menu > a').on('click', function(e){

      e.preventDefault();

      $(this).parent().addClass('open');
      $(this).parent().siblings().removeClass('open');

    });

    
    $('.video-thumb, .btn_play').on('click', function(){

      var videoURL = $(this).data('url');
      console.log(videoURL)

      $('.video-modal iframe').attr('src', videoURL);
      $('.video-modal').fadeIn('fast');

      //$('body').addClass('no-scroll');

    });

    $('.video-modal .close-overlay').on('click', function(){

        $('.video-modal').fadeOut('fast', function(){
            $('.video-modal iframe').attr('src', '');
        });

        $('body').removeClass('no-scroll');
    
    });

    $('.video-modal').on('click', function(e){

      if( !$(e.target).is('.video-container') ){

        $('.video-modal').fadeOut('fast', function(){
            $('.video-modal iframe').attr('src', '');
        });

        $('body').removeClass('no-scroll');

      }

    });


    $('.toggle-content h3').on('click', function(){

      $(this).toggleClass('active');
      $(this).parent().siblings('.toggle-content').find('h3').removeClass('active');
      $(this).parent().siblings('.toggle-content').find('.slide-down-content').slideUp();
      $(this).parent().find('.slide-down-content').slideToggle(function(){

        if( $window.width() <= 600 ){

          var offset = $(this).offset().top;
          $('html, body').animate({scrollTop: offset-72});

        }

      });

    });


    $('#why-ats-tab-menu li').on('click', function(){
      $(this).siblings().removeClass('active');
      $(this).addClass('active');
    });




    $(document).on('click', 'a[href^="#"]', function (event) {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top - 90
        }, 500);
    });



  


	
});


