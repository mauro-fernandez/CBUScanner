/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';

import { runOnJS } from 'react-native-reanimated';
import {
  StyleSheet,
  View,
  Text,
  LayoutChangeEvent,
  PixelRatio,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { OCRFrame, scanOCR } from 'vision-camera-ocr';
import {
  useCameraDevices,
  useFrameProcessor,
  Camera,
} from 'react-native-vision-camera';
import Clipboard from '@react-native-community/clipboard';

export default function TextScanner(params) {
  const [hasPermission, setHasPermission] = React.useState(false);
  const [ocr, setOcr] = React.useState();
  const [pixelRatio, setPixelRatio] = React.useState(1);
  const devices = useCameraDevices();
  const device = devices.back;
  const {setCxu} = params;

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    const data = scanOCR(frame);
    const regex = /^[0-9]*$/;
    const searchText = data?.result?.blocks?.filter(el => el.text?.length === 22 && regex.test(el.text))
 
    if (searchText[0]?.text){
      runOnJS(setOcr)({"result": {"blocks": searchText}});
    } else {
      runOnJS(setOcr)({"result": {"blocks": [], "text": ""}})
    }
  }, []);
  
  React.useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  const renderOverlay = () => {
    return (
      <>
        {ocr?.result.blocks.map((block, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                // Clipboard.setString(block.text);
                //Alert.alert(`"${block.text}" copied to the clipboard`);
                setCxu(block.text)
              }}
              style={{
                position: 'absolute',
                // left: block.frame.x * pixelRatio,
                top: block.frame.y * pixelRatio,
                backgroundColor: 'white',
                padding: 8,
                borderRadius: 6,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  justifyContent: 'center',
                  textAlign: 'center',
                }}
              >
                {block.text}
              </Text>
            </TouchableOpacity>
          );
        })}
      </>
    );
  };

  return device !== undefined && hasPermission ? (
    <>
      <Camera
        style={[StyleSheet.absoluteFill]}
        frameProcessor={frameProcessor}
        device={device}
        isActive={true}
        frameProcessorFps={0.4}
        onLayout={(event) => {
          setPixelRatio(
            event.nativeEvent.layout.width /
              PixelRatio.getPixelSizeForLayoutSize(
                event.nativeEvent.layout.width
              )
          );
        }}
      />
      {renderOverlay()}
    </>
  ) : (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 20, textAlign: 'center'}}>
          Debes aceptar los permisos para utilizar el scanner de texto
        </Text>
    </View>
  );
}