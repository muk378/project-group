// public/scripts/repairing.js

'use strict';
(function Repairing($) {
  $(document).ready(function() {
    $('#repairingForm').submit(function(e) {
      $('.submit-modal').modal('show');
    });
  });
})($);
