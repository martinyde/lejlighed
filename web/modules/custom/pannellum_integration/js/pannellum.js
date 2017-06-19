(function($) {

  // Called when the document has finished loading.
  Drupal.behaviors.setImages = {
    attach: function (context, settings) {

      /**
       * Initialize the form by hiding elements and attaching event handlers.
       */
      function setImage() {
        pannellum.viewer('panorama', {
          "type": "equirectangular",
          "panorama": "http://drupal8.vm/modules/custom/pannellum_integration/test/test.jpg"
        });
      }

      // Get the show on the road.
      setImage();
    }
  };
}(jQuery));
