import { useEffect } from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import "./RecordAudio.scss";

const RecordAudio = ({ setIsRecording, onAddAudioMessage }) => {
  const { startRecording, stopRecording, isRecording, recordingBlob } =
    useAudioRecorder();
  console.log("isRecording from component: ", isRecording);

  const addAudioElement = (blob) => {
    console.log("blob :" ,  blob);
    
    const url = URL.createObjectURL(blob);
    // Here we call the onAddAudioMessage to add the audio to the messages
    onAddAudioMessage(url, blob);
  };
//  test audio 
  useEffect(() => {
    setIsRecording(isRecording);
    if (isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  }, [isRecording]);

  return (
    <div className="RecordAudio">
      <AudioRecorder
        onRecordingComplete={addAudioElement}
        audioTrackConstraints={{
          noiseSuppression: true,
          echoCancellation: true,
        }}
        downloadOnSavePress={true}
        classes={{ icon: "mic-icon" }}
        buttonProps={{ icon: <MdOutlineKeyboardVoice /> }}
        // recorderControls={{
        //   showStopButton: isRecording,
        //   showRecordButton: !isRecording,
        //   showSaveButton: false,
        //   showCancelButton: false,
        // }}
        mediaRecorderOptions={{
          audioBitsPerSecond: 128000,
        }}
        showVisualizer
      />
    </div>
  );
};

export default RecordAudio;
