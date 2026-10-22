// OBSブラウザソースでページが読み込まれるたびに、一度だけ開始を要求します。
(() => {
  const obs = window.obsstudio;
  if (!obs || typeof obs.startStreaming !== 'function') {
    console.error('OBSブラウザソース内で開いてください。');
    return;
  }

  obs.getControlLevel((level) => {
    if (level !== 5) {
      console.error('ページ権限を「OBSへのフルアクセス」に設定してください。', level);
      return;
    }

    obs.getStatus((status) => {
      if (status.streaming) {
        console.info('すでに配信中です。');
        return;
      }
      window.addEventListener('obsStreamingStarted', () => {
        console.info('配信開始を確認しました。');
      }, { once: true });
      obs.startStreaming();
      console.info('配信開始を要求しました。成功状況はOBSで確認してください。');
    });
  });
})();
