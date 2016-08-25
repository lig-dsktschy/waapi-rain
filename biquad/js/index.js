(function() {
    'use strict';

    var
        elAudio, elButton, elGain, elBiquadFilterType, elBiquadFilterFrequency,
        elGainValue, elBiquadFilterFrequencyValue, elBiquadFilterFrequencyContainer,
        setGain, setBiquadFilterType, setBiquadFilterFrequency, ctx, gain,
        biquadFilter, mediaElementSource, isPlaying;

    elAudio                          = document.getElementById('audio');
    elButton                         = document.getElementById('button');
    elGain                           = document.getElementById('gain');
    elGainValue                      = document.getElementById('gain-value');
    elBiquadFilterType               = document.getElementById('biquad-filter-type');
    elBiquadFilterFrequency          = document.getElementById('biquad-filter-frequency');
    elBiquadFilterFrequencyValue     = document.getElementById('biquad-filter-frequency-value');
    elBiquadFilterFrequencyContainer = document.getElementById('biquad-filter-frequency-container');

    // コンテキストを生成
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    ctx = new AudioContext();

    // 各AudioNodeを生成
    mediaElementSource = ctx.createMediaElementSource(elAudio);
    gain = ctx.createGain();
    biquadFilter = ctx.createBiquadFilter();

    // 中間処理を表すAudioNodeが持つAudioParamに
    // input要素の値を代入。表示にも値を反映する
    setGain = function() {
        gain.gain.value = elGainValue.innerText = elGain.value;
    };
    setBiquadFilterType = function() {
        var text = elBiquadFilterType.options[elBiquadFilterType.selectedIndex].text;
        gain.disconnect();
        biquadFilter.disconnect();
        if (text === 'off') {
            elBiquadFilterFrequencyContainer.classList.add('is-hidden');
            gain.connect(ctx.destination);
        } else {
            elBiquadFilterFrequencyContainer.classList.remove('is-hidden');
            biquadFilter.type = elBiquadFilterType.options[elBiquadFilterType.selectedIndex].text;
            gain.connect(biquadFilter);
            biquadFilter.connect(ctx.destination);
        }
    };
    setBiquadFilterFrequency = function() {
        biquadFilter.frequency.value = elBiquadFilterFrequencyValue.innerText = elBiquadFilterFrequency.value;
    };
    setGain();
    setBiquadFilterFrequency();

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
    elBiquadFilterType.addEventListener('change', setBiquadFilterType);
    elBiquadFilterFrequency.addEventListener('mouseup', setBiquadFilterFrequency);
})();