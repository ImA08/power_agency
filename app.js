
$(function () {

  /* ================================================
   * 1. MOBILE NAV TOGGLE
   * ================================================ */
  const $navToggle = $('#nav-toggle');
  const $navMenu   = $('#nav-menu');

  $navToggle.on('click', function () {
    $(this).toggleClass('open');
    $navMenu.toggleClass('open');
  });

  // Close menu when a link is clicked
  $navMenu.find('.nav__link').on('click', function () {
    $navToggle.removeClass('open');
    $navMenu.removeClass('open');
  });

  // Close on outside click
  $(document).on('click', function (e) {
    if (!$(e.target).closest('.nav').length) {
      $navToggle.removeClass('open');
      $navMenu.removeClass('open');
    }
  });


  /* ================================================
   * 2. TESTIMONIALS SLIDER
   * ================================================ */
  const testimonialData = [
    { name: 'Alice Moreau',    role: 'CEO of PixelCraft' },
    { name: 'Daniel Harper',   role: 'CTO of BlueSky Labs' },
    { name: 'Ricky Aprilia',   role: 'Founder of Varibo' },
    { name: 'James Anderson',  role: 'Director at TechFusion' },
    { name: 'Sofia Nguyen',    role: 'Product Lead at Orbix' },
  ];

  function activateTestimonial(index) {
    const normalizedIndex = index % 3; 

    // Slide text
    $('.testimonials__slide').removeClass('active');
    $(`.testimonials__slide[data-index="${normalizedIndex}"]`).addClass('active');

    // Avatar active state
    $('.testimonials__avatar-btn').removeClass('active');
    $(`.testimonials__avatar-btn[data-slide="${index}"]`).addClass('active');

    // Author name/role
    const person = testimonialData[index] || testimonialData[2];
    $('#testimonials-name').text(person.name);
    $('#testimonials-role').text(person.role);
  }

  
  activateTestimonial(1);

  $(document).on('click', '.testimonials__avatar-btn', function () {
    const idx = parseInt($(this).data('slide'), 10);
    activateTestimonial(idx);
  });

  // Auto-rotate every 5s
  let autoPlay = setInterval(function () {
    const $active = $('.testimonials__avatar-btn.active');
    const current = parseInt($active.data('slide'), 10);
    const next    = (current + 1) % testimonialData.length;
    activateTestimonial(next);
  }, 5000);

  
  $(document).on('click', '.testimonials__avatar-btn', function () {
    clearInterval(autoPlay);
  });


  /* ================================================
   * 3. VIDEO MODAL
   * ================================================ */
  const $modal       = $('#video-modal');
  const $modalOverlay = $('#modal-overlay');
  const $modalClose  = $('#modal-close');

  function openModal() {
    $modal.addClass('open');
    $('body').css('overflow', 'hidden');
  }

  function closeModal() {
    $modal.removeClass('open');
    $('body').css('overflow', '');
  }

  $('#btn-video').on('click', function (e) {
    e.preventDefault();
    openModal();
  });

  $modalClose.on('click', closeModal);
  $modalOverlay.on('click', closeModal);

  $(document).on('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });


  /* ================================================
   * 4. NEWSLETTER SUBSCRIPTION
   * ================================================ */
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  $('#btn-subscribe').on('click', function () {
    const $input    = $('#newsletter-email');
    const $feedback = $('#newsletter-feedback');
    const email     = $input.val().trim();

    if (!email) {
      $feedback.removeClass('success').addClass('error').text('Please enter your email address.');
      $input.focus();
      return;
    }

    if (!emailRegex.test(email)) {
      $feedback.removeClass('success').addClass('error').text('Please enter a valid email address.');
      $input.focus();
      return;
    }

    // Simulate async subscription
    const $btn = $(this);
    $btn.text('Subscribing…').prop('disabled', true);

    setTimeout(function () {
      $feedback.removeClass('error').addClass('success')
        .text('🎉 You\'re subscribed! Welcome to our newsletter.');
      $input.val('');
      $btn.text('Subscribe').prop('disabled', false);

      // Clear message after 5s
      setTimeout(function () {
        $feedback.fadeOut(600, function () {
          $(this).text('').show();
        });
      }, 5000);
    }, 1000);
  });

  
  $('#newsletter-email').on('keydown', function (e) {
    if (e.key === 'Enter') $('#btn-subscribe').trigger('click');
  });


  /* ================================================
   * 5. SCROLL-SPY: Active nav link
   * ================================================ */
  const sections = $('section[id]');

  function updateActiveLink() {
    const scrollY = $(window).scrollTop();

    sections.each(function () {
      const sectionTop    = $(this).offset().top - 100;
      const sectionBottom = sectionTop + $(this).outerHeight();
      const id            = $(this).attr('id');

      if (scrollY >= sectionTop && scrollY < sectionBottom) {
        $('.nav__link').removeClass('active');
        $(`.nav__link[href="#${id}"]`).addClass('active');
      }
    });
  }

  $(window).on('scroll', updateActiveLink);
  updateActiveLink();


  /* ================================================
   * 6. CONTACT BUTTONS → smooth scroll to #services
   * ================================================ */
  $('#btn-contact, #footer-contact-btn').on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: $('#services').offset().top - 80 }, 600);
  });


  /* ================================================
   * 7. PORTFOLIO CARDS → hover animation (jQuery)
   * ================================================ */
  $('.portfolio__card').on('mouseenter', function () {
    $(this).find('.portfolio__card-title').css('color', '#6c5ce7');
  }).on('mouseleave', function () {
    $(this).find('.portfolio__card-title').css('color', '');
  });

});