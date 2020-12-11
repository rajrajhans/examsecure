// Helper Functions for interpreting subject's eye gaze

function headPoseToEyeGaze(hp_roll, hp_pitch, hp_yaw) {
  let gaze_pitch = 0.21 * hp_pitch - 7.83;
  let gaze_yaw = 0.38 * hp_yaw + 1.11;

  return [hp_roll, gaze_pitch, gaze_yaw];
}
