/*
This code is written about the following video:
https://www.youtube.com/watch?v=HTTaO1IjjlM&list=WL&index=87&t=59s

audio samples from:
SampleSwap - https://sampleswap.org/
*/

const audioClips = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "hihat",
    url: "./Pearl Real Kit/pearlkit-hihat.wav"
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "hihatO",
    url: "./Pearl Real Kit/pearlkit-hihatO.wav"
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "kick",
    url: "./Pearl Real Kit/pearlkit-kick.wav"
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "snare",
    url: "./Pearl Real Kit/pearlkit-snare1.wav"
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "hitom1",
    url: "./Pearl Real Kit/pearlkit-hitom1.wav"
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "lowtom2",
    url: "./Pearl Real Kit/pearlkit-lowtom1.wav"
  },
  {
    keyCode: 89,
    keyTrigger: "Y",
    id: "lowtom2",
    url: "./Pearl Real Kit/pearlkit-lowtom2.wav"
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "ride1",
    url: "./Pearl Real Kit/pearlkit-ride1.wav"
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "ridecrash",
    url: "./Pearl Real Kit/pearlkit-ridecrash.wav"
  },
];

function App() {
  const [volume, setVolume] = React.useState(1);
  const [recording, setRecording] = React.useState("");
  const [speed, setSpeed] = React.useState(0.5);

  const playRecording = () => {
    let index = 0;
    let recordArray = recording.split(" ");
    const interval = setInterval(() => {
      const audioTag = document.getElementById(recordArray[index]);
      audioTag.volume = volume;
      audioTag.currentTime = 0;
      audioTag.play();
      index++;
    }, speed * 600);
    setTimeout(() => clearInterval(interval), 600 * speed * recordArray.length - 1);
  };
  return (
    <div className="bg-info min-vh-100 text-white">
      <div className="text-center">
        <h2>Drum Machine</h2>
        {audioClips.map((clip) => (
          <Pad key={clip.id} clip={clip} volume={volume} setRecording={setRecording}/>
        ))}
        <br/>
        <h4>Volume</h4>
        <input type="range" step="0.01" onChange={(e) => setVolume(e.target.value)} value={volume} max="1" min="0" className="w-50"/>
        <h3>{recording}</h3>
        {recording && (
          <>
          <button onClick={playRecording} className="btn btn-success">play</button>
          <button onClick={() => setRecording("")} className="btn btn-danger">clear</button>
          <br/>
          <h4>Speed</h4>
          <input type="range" step="0.01" onChange={(e) => setSpeed(e.target.value)} value={speed} max="1.2" min="0.1" className="w-50" />
          </>
        )}
      </div>
    </div>
  );
}


function Pad({ clip, volume, setRecording }) {

  const [active, setActive] = React.useState(false);

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handleKeyPress = (e) => {
    if (e.keyCode === clip.keyCode) {
      playSound();
    }
  };

  const playSound = () => {
    const audioTag = document.getElementById(clip.keyTrigger);
    setActive(true);
    setTimeout(() => setActive(false), 200);
    audioTag.volume = volume;
    audioTag.currentTime = 0;
    audioTag.play();
    setRecording((prev) => prev + clip.keyTrigger + " ");
  };

  return (
    <div onClick={playSound} className={`btn btn-secondary p-4 m-3 ${active && "btn-warning"}`}>
      <audio className="clip" id={clip.keyTrigger} src={clip.url}/>
      {clip.keyTrigger}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));