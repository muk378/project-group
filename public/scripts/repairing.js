// public/scripts/repairing.js

'use strict';
(function Repairing($) {
  $(document).ready(() => {
    $('#repairingForm').submit((e) => {
      $(".submit-modal").modal('show');
    });
  });
})($);
