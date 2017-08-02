(function (global) {
  'use strict';
  var $form = $('.ui.form');
  $form.form({
    inline: true,
    on: 'blur',
    fields: {
      cameraCount: {
        identifier: 'cameraCount',
        rules: [{
          type: 'integer[1..36]',
          prompt: '1 - 36'
        }],
      },
      hddSize: {
        identifier: 'hddSize',
        rules: [{
          type: 'integer[1..32]',
          prompt: '1 - 32'
        }],
      }
    }
  });

  var $recordDay = $('#record-day');

  $form.on('submit', function(e) {
    if (e.isDefaultPrevented())
      return;
    e.preventDefault();

    var o = {};
    $(this).serializeArray().forEach(function(attr) {
      o[attr.name] = attr.value;
    });

    var days = calculateDays(o);
    $recordDay.text('預估錄影天數: ' + days + ' 天');
    $(this).addClass('success');
  });

  function calculateDays(obj) {
    var cameraCount = Number(obj.cameraCount);
    var mainStream = Number(obj.mainStream);
    var subStream = Number(obj.subStream);
    var hddSize = Number(obj.hddSize);

    var hddSizeKb = hddSize * 1000000000 * 0.95;
    var totalCameraPerDayKb = (mainStream + subStream) / 8 * 3600 * 24 * cameraCount;
    return Number(hddSizeKb/totalCameraPerDayKb).toFixed(1);
  }

}(window))
