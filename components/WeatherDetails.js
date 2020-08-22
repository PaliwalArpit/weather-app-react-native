import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { colors } from "../utils/index"
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'
const { PRIMARY_COLOR, SECONDARY_COLOR, BORDER_COLOR } = colors
export default function WeatherDetails({ currentWeather, unitsSystem }) {
    const {
        main: { feels_like, humidity, pressure },
        wind: {speed}
    } = currentWeather

    const windSpeed = unitsSystem === 'metric' ? `${Math.round(speed)} m/s` : `${Math.round(speed)} miles/hour`
    return (
        <View style={styles.weatheDetails}>
            <View style={styles.weatherDetailsRow}>
                <View style={{ ...styles.weatheDetailsBox, borderRightWidth: 1, borderRightColor: BORDER_COLOR }}>
                    <View style={styles.weatherDetailsRow}>
                        <FontAwesome5 name="temperature-low" size={24} color={PRIMARY_COLOR} />
                        <View style={styles.weatheDetailsItems}>
                            <Text>Feels like :</Text>
                            <Text style={styles.textSecondary}>{feels_like}°</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.weatheDetailsBox}>
                    <View style={styles.weatherDetailsRow}>
                        <MaterialCommunityIcons name="water" size={30} color={PRIMARY_COLOR} />
                        <View style={styles.weatheDetailsItems}>
                            <Text>Humidity :</Text>
                            <Text style={styles.textSecondary}>{humidity} %</Text>
                        </View>
                    </View>
                </View>
            </View>
                <View style={{... styles.weatherDetailsRow, borderTopWidth:1, borderTopColor:BORDER_COLOR}}>
                <View style={{ ...styles.weatheDetailsBox, borderRightWidth: 1, borderRightColor: BORDER_COLOR }}>
                    <View style={styles.weatherDetailsRow}>
                        <MaterialCommunityIcons name="weather-windy" size={30} color={PRIMARY_COLOR} />
                        <View style={styles.weatheDetailsItems}>
                            <Text>Wind speed :</Text>
                            <Text style={styles.textSecondary}>{windSpeed}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.weatheDetailsBox}>
                    <View style={styles.weatherDetailsRow}>
                        <MaterialCommunityIcons name="speedometer" size={30} color={PRIMARY_COLOR} />
                        <View style={styles.weatheDetailsItems}>
                            <Text>Pressure :</Text>
                            <Text style={styles.textSecondary}>{pressure} hPa</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    weatheDetails: {
        //marginTop:'auto',
        margin: 15,
        borderWidth: 1,
        borderColor: BORDER_COLOR,
        borderRadius: 10,
    },
    weatherDetailsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    weatheDetailsBox: {
        flex: 1,
        padding: 20,
    },
    weatheDetailsItems: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    textSecondary: {
        fontSize: 15,
        color: SECONDARY_COLOR,
        fontWeight: '700',
        margin: 7
    }
})