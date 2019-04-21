// public/scripts/history.js

'use strict';
(function Repairing($) {
  $(document).ready(() => {
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
  });
})($);
