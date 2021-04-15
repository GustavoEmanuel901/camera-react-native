/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect, useState, useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Modal,
  TouchableOpacity,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { RNCamera } from 'react-native-camera'

declare const global: {HermesInternal: null | {}};

const App = () => {

  const camRef = useRef<RNCamera>()
  const [type, setType] = useState(RNCamera.Constants.Type.back)
  const [capturedPhoto, setCapturedPhoto] = useState<any>(null)
  const [open, setOpen] = useState(false)

  async function takePicture() {
    if(camRef) {
      const data = await camRef.current?.takePictureAsync()
      setCapturedPhoto(data?.uri)
      setOpen(true)
    }
  }

  const storeData = async (value: string) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@storage_Key', jsonValue)
    } catch (e) {
      // saving error
    }
  }

  storeData('Gustavo')

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key')
      console.log(jsonValue)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
 
        <RNCamera
          style={{ flex: 1 }}
          type={type}
          ref={camRef}
        >
          <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection:'row' }}>
           <TouchableOpacity
            style={{
              position: 'absolute',
              bottom: 20,
              left: 20
            }}
            onPress={() => {
              setType(
                type === RNCamera.Constants.Type.back 
                ? RNCamera.Constants.Type.front
                : RNCamera.Constants.Type.back
              )
            }}
           >
             <Text style={{ fontSize: 20, marginBottom: 13, color: '#fff'}}>Trocar</Text>
           </TouchableOpacity>
          </View>
        </RNCamera>

        <TouchableOpacity style={styles.button} onPress={ takePicture }>
          <Text style={{ fontSize: 20, marginBottom: 13, color: '#fff'}}>Foto</Text>
        </TouchableOpacity>

        { capturedPhoto && (
          <Modal
            animationType='slide'
            transparent={false}
            visible={open}
          >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity style={{ margin: 10 }} onPress={() => setOpen(false)}>
                <Text>Fechar</Text>
              </TouchableOpacity>

              <Image
                style={{ width: '100%', height: 300, borderRadius: 20 }}
                source={{ uri: capturedPhoto }}
              />
            </View>
          </Modal>
        )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
    margin: 20, 
    borderRadius: 10,
    height: 50
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
