import React from 'react';
import Routes from './src/routes';

import {useFonts} from 'expo-font';
import {Nunito_600SemiBold as Nunito, Nunito_700Bold as Nunito_700, Nunito_800ExtraBold as Nunito_800} from '@expo-google-fonts/nunito';

export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito,
    Nunito_700,
    Nunito_800,
  })

  if(!fontsLoaded){
    return null;
  }

  return (
   <Routes/>
  );
}

