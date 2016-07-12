(function() {
    'use strict';

    var
        elAudio, elButton, elGain, elBiquadFilterType, elBiquadFilterFrequency,
        elGainValue, elBiquadFilterFrequencyValue, elBiquadFilterFrequencyContainer,
        setGain, setBiquadFilterType, setBiquadFilterFrequency, ctx, gain,
        biquadFilter, mediaElementSource, isSP, isPlaying;

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

    setGain = function() {
        gain.gain.value = elGainValue.innerText = elGain.value;
    };
    setBiquadFilterType = function() {
        var text = elBiquadFilterType.options[elBiquadFilterType.selectedIndex].text;
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

    // 音源を中間処理（音量調整処理）に接続
    mediaElementSource.connect(gain);
    // 中間処理から最終出力に接続
    gain.connect(ctx.destination);

    // DOMへのイベント登録
    elButton.addEventListener(isSP ? 'touchstart' : 'click', function() {
        elAudio[!isPlaying ? 'play' : 'pause']();
        isPlaying = !isPlaying;
    });
    elGain.addEventListener(isSP ? 'touchend' : 'mouseup', setGain);
    elBiquadFilterType.addEventListener('change', setBiquadFilterType);
    elBiquadFilterFrequency.addEventListener(isSP ? 'touchend' : 'mouseup', setBiquadFilterFrequency);
})();