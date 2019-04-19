// public/scripts/history.js

'use strict';
(function Repairing($) {
  $(document).ready(() => {
    $('#historyTable').DataTable( {
      "processing": true,
      "serverSide": true,
      "ajax": "/history/list"
  } );
  });
})($);
