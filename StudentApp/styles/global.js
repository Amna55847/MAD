import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1, // Appreciable use of Flexbox
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center', // Added Flexbox alignment
  },
  titleText: {
    fontFamily: 'Inter_900Black', // Custom font applied here
    fontSize: 32, // Increased size for visibility
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#601d42',
    paddingVertical: 15, // Better padding
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center', // Flexbox cross-axis alignment
    width: '100%', // full width buttons
  },
  buttonText: {
    fontFamily: 'Inter_400Regular', // Custom font for buttons
    color: '#fff',
    fontSize: 18,
  },
  input: {
    fontFamily: 'Inter_400Regular', // Custom font for inputs
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    fontSize: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 15,
    width: '100%',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  darkText: {
    color: '#ffffff',
  },
  // Profile specific display area
  liveDataContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '100%',
    // Adding flex properties for structural layout
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  }
});
