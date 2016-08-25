(function() {
    'use strict';

    var
        elAudio, elButton, elGain, elGainValue, setGain,
        ctx, gain, mediaElementSource, isPlaying;

    elAudio     = document.getElementById('audio');
    elButton    = document.getElementById('button');
    elGain      = document.getElementById('gain');
    elGainValue = document.getElementById('gain-value');

    // コンテキストを生成
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    ctx = new AudioContext();

    // 各AudioNodeを生成
    mediaElementSource = ctx.createMediaElementSource(elAudio);
    gain = ctx.createGain();

    // 中間処理（音量調整処理）を表すAudioNodeが持つAudioParamに
    // input要素の値を代入。表示にも値を反映する
    setGain = function() {
        gain.gain.value = elGainValue.innerText = elGain.value;
    };
    setGain();

    // 音源を表すAudioNodeを、中間処理（音量調整処理）を表すAudioNodeに接続
    mediaElementSource.connect(gain);
    // 中間処理を表すAudioNodeを、最終出力を表すAudioNodeに接続
    gain.connect(ctx.destination);

    // DOMへのイベント登録
    elButton.addEventListener('click', function() {
        elAudio[!isPlaying ? 'play' : 'pause']();
        isPlaying = !isPlaying;
    });
    elGain.addEventListener('mouseup', setGain);
})();