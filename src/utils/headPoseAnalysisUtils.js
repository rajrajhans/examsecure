// Helper Functions for interpreting subject's eye gaze

export function headPoseToEyeGaze(hp_roll, hp_pitch, hp_yaw) {
  let gaze_pitch = 0.21 * hp_pitch - 7.83;
  let gaze_yaw = 0.38 * hp_yaw + 1.11;

  return [hp_roll, gaze_pitch, gaze_yaw];
}

export function getHeadPoseInterpretation(roll, pitch, yaw) {
  let yawDeviation = "";
  let pitchDeviation = "";
  let res = "";

  if (yaw < -7) yawDeviation += "Right";
  else if (yaw > 7) yawDeviation += "Left";

  if (pitch < -10) pitchDeviation += " Down";
  else if (pitch > 10) pitchDeviation += " Up";

  if (yawDeviation && pitchDeviation) {
    res = `Person is facing ${yawDeviation} & ${pitchDeviation}`;
  } else if (yawDeviation) {
    res = `Person is facing ${yawDeviation}.`;
  } else if (pitchDeviation) {
    res = `Person is facing ${pitchDeviation}`;
  }

  if (!res) return "Normal";

  return res;
}
