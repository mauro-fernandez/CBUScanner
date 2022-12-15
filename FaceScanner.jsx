import * as React from 'react';
import { runOnJS } from 'react-native-reanimated';

import { StyleSheet } from 'react-native';
import {
  useCameraDevices,
  useFrameProcessor,
} from 'react-native-vision-camera';

import { Camera } from 'react-native-vision-camera';
import { scanFaces } from 'vision-camera-face-detector';

export default function FaceScanner() {
  const [hasPermission, setHasPermission] = React.useState(false);
  const [faces, setFaces] = React.useState();

  const devices = useCameraDevices();
  const device = devices.front;

  React.useEffect(() => {
    console.log(faces);
  }, [faces]);

  React.useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    const scannedFaces = scanFaces(frame);
    runOnJS(setFaces)(scannedFaces);
  }, []);

  return device != null && hasPermission ? (
    <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={true}
      frameProcessor={frameProcessor}
      frameProcessorFps={5}
    />
  ) : null;
}