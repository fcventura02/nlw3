import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import mapMarker from '../images/map-marker.png';

import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import api from '../services/api';

interface OrphanegeItem{
  id: number,
  name: string,
  latitude: number,
  longetude: number,
}

export default function OrphanagesMap() {
  const navigation = useNavigation();
  const [orphanages, setOrphanages] = useState<OrphanegeItem[]>([])

  useEffect(() => {
    api.get('orphanages').then(res => {
      setOrphanages(res.data)
    })
  }, []);
  function handleNavigateToOrphanageDetails(id:number) {
    navigation.navigate('OrphanagesDetails', {id});
  }

  function handleNavigateToCreateOrphanage() {
    navigation.navigate('SelectMapPosition');
  }
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -19.9211158,
          longitude: -43.945339,
          latitudeDelta: 0.073,
          longitudeDelta: 0.073,
        }} >
        {
          orphanages.map(orphanage => (
            <Marker
            key={orphanage.id}
              icon={mapMarker}
              coordinate={{
                latitude: orphanage.latitude,
                longitude: orphanage.longetude
              }}
              calloutAnchor={{
                x: 2.7,
                y: 0.8,
              }}
            >
              <Callout tooltip onPress={()=> handleNavigateToOrphanageDetails(orphanage.id)}>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutText}>{orphanage.name}</Text>
                </View>
              </Callout>
            </Marker>

          ))
        }
      </MapView>
      <View style={styles.footer}>
        <Text style={styles.footerText}>{orphanages.length} orfanatos encontrados</Text>
        <RectButton style={styles.createOrphanageButton} onPress={handleNavigateToCreateOrphanage}>
          <Feather name="plus" size={20} color="#fff" />
        </RectButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },

  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 16,
    justifyContent: 'center',
  },

  calloutText: {
    color: '#0089a5',
    fontSize: 14,
    fontFamily: 'Nunito_700'
  },

  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: '#fff',
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
  },

  footerText: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_700'
  },

  createOrphanageButton: {
    width: 56,
    height: 56,
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
