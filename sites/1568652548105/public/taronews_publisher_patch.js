var taronews_setup_sliders = Publisher_Theme.setup_sliders;

Publisher_Theme.setup_sliders = function () {
    jQuery(window).on('load', function () {
        setTimeout(taronews_setup_sliders, 300);
    });
};
