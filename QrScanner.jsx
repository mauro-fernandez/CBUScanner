import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useCameraDevices } from 'react-native-vision-camera';
import { Camera } from 'react-native-vision-camera';
import { useScanBarcodes, BarcodeFormat } from 'vision-camera-code-scanner';

export default function QrScanner() {
  const [hasPermission, setHasPermission] = React.useState(false);
  const devices = useCameraDevices();
  const device = devices.back;
  
  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
      checkInverted: true,
  });

  React.useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  return (
    <>
      { device != null && hasPermission ? (
        <>
          <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            frameProcessor={frameProcessor}
            frameProcessorFps={5}
          />
          {barcodes.map((barcode, idx) => (
            <Text key={idx} style={styles.barcodeTextURL}>
              {barcode.displayValue}
            </Text>
          ))}
        </>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 20, textAlign: 'center'}}>
            Debes aceptar los permisos para utilizar el scanner de QR
          </Text>
        </View>
      )
    }
    </>
  );
}

const styles = StyleSheet.create({
  barcodeTextURL: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});