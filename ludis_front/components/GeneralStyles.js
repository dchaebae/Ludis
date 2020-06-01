import React from 'react';
import { StyleSheet, Platform, Appearance } from 'react-native';

const selectedScheme = Appearance.getColorScheme();

const colorSchemes = {
    'light': {
        primary: '#3fceb0',
    },

    'dark': {

    }
}

const color = colorSchemes[selectedScheme] || colorSchemes['light'];

export default StyleSheet.create({
    parentView: {
        flex: 1,
    },

    testView: {
        backgroundColor: color.primary,
    }
});

/*const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
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
*/