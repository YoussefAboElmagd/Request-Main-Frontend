import { useEffect } from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import "./RecordAudio.scss";

const RecordAudio = ({ setIsRecording, onAddAudioMessage }) => {
  const { startRecording, stopRecording, isRecording, recordingBlob } =
    useAudioRecorder();

  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    // Here we call the onAddAudioMessage to add the audio to the messages
    onAddAudioMessage(url, blob);
  };

  useEffect(() => {
    setIsRecording(isRecording);
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
        downloadFileExtension="webm"
        classes={{ icon: "mic-icon" }}
        buttonProps={{ icon: <MdOutlineKeyboardVoice /> }}
        showVisualizer
      />
    </div>
  );
};

export default RecordAudio;
