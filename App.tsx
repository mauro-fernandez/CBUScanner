import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  AppState
} from 'react-native';
// import { isValidCXU } from "./utils";
import Clipboard from '@react-native-community/clipboard';
import TextScanner from './TextScanner';

const App = () => {
  const [cxu, setCxu] = useState('');
  const [copiedText, setCopiedText] = useState('');
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  const checkSimpleValidation = (itemToValidate: any) => {
    if (itemToValidate.length !== 22) {
      return false;
    }
    if (isNaN(Number(itemToValidate))) {
      return false;
    }
    return true;
  };

  const copyToClipboard = () => {
    Clipboard.setString(cxu);
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    setCopiedText(text);
  };

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });
    return () => {
      subscription.remove();
    };
  }, [appStateVisible]);

  useEffect(() => {
    if (appStateVisible === 'active') {
      fetchCopiedText();
      if (checkSimpleValidation(copiedText)) {
        setCxu(copiedText);
      }
    }
  }, [appStateVisible, copiedText]);

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>Validación de CBU/CVU</Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={cxu}
          onChangeText={text => setCxu(text)}
          maxLength={22}
          style={styles.input}
          placeholder="Ingrese un CBU/CVU"
          keyboardType="number-pad"
        />
        <Text style={checkSimpleValidation(cxu) ? {} : {color: 'red'}}>
          {checkSimpleValidation(cxu)
            ? 'El CBU/CVU es válido.'
            : 'El CBU/CVU no es válido.'}
        </Text>
      </View>

      <View style={styles.cameraContainer}>
        <TextScanner setCxu={setCxu} />
      </View>

      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={copyToClipboard}>
          <Text>Hace click aquí para copiar al portapapeles</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={fetchCopiedText}>
          <Text>Mostrar texto del portapapeles</Text>
        </TouchableOpacity>

        <Text style={{marginTop: 15}}>
          Esto es lo que hay en el porta papeles:
        </Text>
        <Text style={styles.copiedText}>{copiedText}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    paddingVertical: 10,
    textAlign: 'center',
  },
  inputContainer: {
    alignSelf: 'center',
  },
  input: {
    height: 55,
    width: 360,
    fontSize: 22,
    textAlign: 'center',
    borderRadius: 5,
    borderWidth: 2,
  },
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  copiedText: {
    marginTop: 10,
    color: 'red',
  },
  button: {
    borderWidth: 1,
    padding: 4,
    margin: 5,
  },
  cameraContainer: {
    width: '80%',
    height: '40%',
    alignSelf: 'center',
    marginTop: '10%',
    marginBottom: '10%',
    borderWidth: 12
  },
});

export default App;
