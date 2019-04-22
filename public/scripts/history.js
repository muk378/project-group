// public/scripts/history.js

'use strict';
(function Repairing($) {
  $(document).ready(function() {
    $('#historyTable').DataTable({
      processing: true,
      serverSide: true,
      ajax: '/history/list',
      columns: [
        { data: 'repairType' },
        { data: 'repairStatus' },
        { data: 'description' },
        { data: 'updateBy' },
        { data: 'createdAt' },
        { data: 'updatedAt' }
      ]
    });

    $('#export').click(function() {
      $.ajax({
        url: '/history/list/export',
        method: 'POST',
        xhrFields: {
          responseType: 'blob'
        },
        data: { search: $('[type=search]').val() }
      }).then(function(blob) {
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'History_' + Date.now() + '.pdf';
        link.click();
      });
    });
  });
})($);
