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
    paddingLeft: 8,
    marginTop: 16,
    fontSize: 32,
    fontWeight: 'bold',
  },
  authError: {
    paddingLeft: 16,
    marginBottom: 16,
    color: '#ff0000',
    fontWeight: 'bold',
  },

  homeTopFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  homeServicesFlex: {
    flexDirection: 'row',
    marginLeft: 8,
    marginBottom: 8,
  },
  searchBox: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 12,
    marginTop: 16,
    marginBottom: 16,
    marginRight: 16,
    backgroundColor: '#f5c518',
    borderRadius: 10,
    flexDirection: 'row',
  },
  icon: {
    width: 30,
    height: 30,
    marginLeft: 5,
    borderRadius: 5,
  },
});

export default Style;
