import {StyleSheet} from 'react-native';

const Style = StyleSheet.create({
  screen: {
    height: '100%',
    backgroundColor: '#fff',
    padding: 32,
  },
  authInput: {
    marginBottom: 16,
    padding: 16,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 16,
  },
  authTitle: {
    paddingLeft: 16,
    marginTop: 16,
    marginBottom: 16,
    fontSize: 32,
    fontWeight: 'bold',
  },
  authError: {
    paddingLeft: 16,
    marginBottom: 16,
    color: '#ff0000',
    fontWeight: 'bold',
  },
  searchBox: {
    paddingRight: 30,
    marginBottom: 16,
    marginTop: 16,
  },
  flexContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row'
  }
});

export default Style;
