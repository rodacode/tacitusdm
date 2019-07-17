$(document).ready(function () {
  const audioCtx = new AudioContext();
  let bpm = 66 / 120 * 1000 // 120bpm in ms 500ms
  
  
  //POWER ON/OFF
  let toggle = new Nexus.Toggle('#power')

  toggle.on('change',function(v) {
    v ?  start() : stop();
  })
  


  //TEMPO DIAL
  let dial = new Nexus.Dial('#dial',{
    'size': [45,45],
    'interaction': 'radial', // "radial", "vertical", or "horizontal"
    'mode': 'relative', // "absolute" or "relative"
    'min': 0,
    'max': 180,
    'step': 1,
    'value': 120
    })

  //TEMPO NUMBER
  var number = new Nexus.Number('#number')

  // LINK NUMBER TO
  number.link(dial)

  // SEQUENCER
  let sequencer = new Nexus.Sequencer('#sequencer', {
    'size': [600, 400],
    'mode': 'toggle',
    'rows': 5,
    'columns': 16
  })

  // SOUNDS
  let sound1 = new Howl({
    src: ['./samples/kick.wav'],
    autoplay: false,
    loop: false,
    volume: 0.5,
    buffer: true,
    onend: function () {
      console.log('Finished!');
    }
  });
  let sound2 = new Howl({
    src: ['./samples/clack.wav'],
    autoplay: false,
    loop: false,
    volume: 0.5,
    buffer: true,
    onend: function () {
    }
  });
  let sound3 = new Howl({
    src: ['./samples/hh.wav'],
    autoplay: false,
    loop: false,
    volume: 0.5,
    buffer: true,
    onend: function () {
    }
  });
  let sound4 = new Howl({
    src: ['./samples/perc.wav'],
    autoplay: false,
    loop: false,
    volume: 0.5,
    buffer: true,
    onend: function () {
    }
  });

  var interval = new Nexus.Interval(function() {
    sequencer.next();
  })




  sequencer.on('step', function (v) {
    if (v[0] === 1) {
      sound1.play()
    }
    if (v[1] === 1) {
      sound2.play()
    }
    if (v[2] === 1) {
      sound3.play()
    }
    if (v[3] === 1) {
      sound4.play()
    }
  })
  dial.on('change',function(v) {
    bpm = v;
    console.log(bpm);
  })

  function start () {
    // Change the interval time
    interval.ms(bpm);
    interval.start();
    sequencer.start();
  }
  function stop () {
    sequencer.stop();
  }
});

