import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import WheatherInfo from './components/WheatherInfo';
import UnitsPicker from "./components/UnitsPicker";
import {colors} from "./utils/index"
import ReloadIcon from "./components/ReloadIcon"
import WeatherDetails from "./components/WeatherDetails"

const weather_api_key = '41421e014825176f918a94194365854b';
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?';
export default function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [unitSystem, setUnitSystem] = useState('metric');
  useEffect(() => {
    load()
  }, [unitSystem])

  async function load() {
    setCurrentWeather(null);
    setErrorMessage(null);
    try {
      let { status } = await Location.requestPermissionsAsync();
      if (status != 'granted') {
        setErrorMessage("Access to location need to run app");
        return
      }
      const location = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = location.coords
      const weatherurl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitSystem}&appid=${weather_api_key}`
      const response = await fetch(weatherurl);
      const result = await response.json();
      if (response.ok) {
        setCurrentWeather(result);
      }
      else {
        setErrorMessage(result.message);
      }

    } catch (err) {
      setErrorMessage(err.messsage)
    }
  }
  if (currentWeather) {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.main}></View>
        <UnitsPicker unitSystem={unitSystem} setUnitSystem={setUnitSystem}/>
          <ReloadIcon load={load}/>
          <WheatherInfo currentWeather={currentWeather}/>
          <WeatherDetails currentWeather={currentWeather} unitSystem={unitSystem}/>
        </View>
    );
  } else if(errorMessage) {
    return (
      <View style={styles.container}>
        <Text>{errorMessage}</Text>
        <StatusBar style="auto"/>
      </View>
    )
  }
  else{
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.PRIMARY_COLOR}/>
        <StatusBar style="auto"/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  main: {
    justifyContent: 'center',
  }
});
