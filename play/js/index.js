(function() {
    'use strict';

    var
        elAudio, elButton, ctx, mediaElementSource, isPlaying;

    elAudio  = document.getElementById('audio');
    elButton = document.getElementById('button');

    // コンテキストを生成
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    ctx = new AudioContext();

    // 音源を表すAudioNodeを生成
    mediaElementSource = ctx.createMediaElementSource(elAudio);

    // 音源を表すAudioNodeを、最終出力を表すAudioNodeに接続
    mediaElementSource.connect(ctx.destination);

    // DOMへのイベント登録
    elButton.addEventListener('click', function() {
        elAudio[!isPlaying ? 'play' : 'pause']();
        isPlaying = !isPlaying;
    });
})();