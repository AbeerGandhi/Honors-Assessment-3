import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Linking } from 'react-native';

export default function App() {
  const [asteroidId, setAsteroidId] = useState('');
  const [asteroidInfo, setAsteroidInfo] = useState(null);

  const apiKey = 'E6nPecTshfZeAfYwX7WvlXX82wl4zOe05ktpNA6b'; 
  const fetchAsteroidById = async () => {
    try {
      const response = await fetch(`https://api.nasa.gov/neo/rest/v1/neo/${asteroidId}?api_key=${apiKey}`);
      const data = await response.json();
      setAsteroidInfo(data);
    } catch (error) {
      console.error('Error fetching asteroid data:', error);
    }
  };

  const fetchRandomAsteroid = async () => {
    try {
      const response = await fetch(`https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY`);
      const data = await response.json();
      const randomAsteroid = data.near_earth_objects[Math.floor(Math.random() * data.near_earth_objects.length)];
      setAsteroidId(randomAsteroid.id);
      fetchAsteroidById();
    } catch (error) {
      console.error('Error fetching random asteroid:', error);
    }
  };

  return (
    <View style={styles.app}>
      <Text style={styles.title}>Asteroid Information Finder</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Asteroid ID"
        value={asteroidId}
        onChangeText={setAsteroidId}
      />
      <Button
        title="Submit"
        onPress={fetchAsteroidById}
        disabled={!asteroidId}
      />
      <TouchableOpacity style={styles.randomButton} onPress={fetchRandomAsteroid}>
        <Text style={styles.randomButtonText}>Get Random Asteroid</Text>
      </TouchableOpacity>

      {asteroidInfo && (
        <View style={styles.result}>
          <Text style={styles.infoText}><Text style={styles.label}>Name:</Text> {asteroidInfo.name}</Text>
          <Text style={styles.infoText}>
            <Text style={styles.label}>NASA JPL URL:</Text> 
            <Text style={styles.link} onPress={() => Linking.openURL(asteroidInfo.nasa_jpl_url)}>
              {asteroidInfo.nasa_jpl_url}
            </Text>
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.label}>Potentially Hazardous:</Text> {asteroidInfo.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  app: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderColor: '#ccc', borderWidth: 1, padding: 10, width: '80%', marginBottom: 10 },
  randomButton: { marginTop: 10, padding: 10, backgroundColor: 'blue', borderRadius: 5 },
  randomButtonText: { color: 'white', fontWeight: 'bold' },
  result: { marginTop: 20, alignItems: 'center' },
  infoText: { fontSize: 16, marginVertical: 5 },
  label: { fontWeight: 'bold' },
  link: { color: 'blue', textDecorationLine: 'underline' }
});
