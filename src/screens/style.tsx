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

  homeTopFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  homeServicesFlex: {
    flexDirection: 'row',
  },
  searchBox: {
    fontSize: 20,
    fontWeight: '300',
    padding: 10,
    marginTop: 16,
    marginBottom: 16,
    marginRight: 16,
    backgroundColor: '#FFF',
    borderRadius: 10,
    width: '50%',
  },
  icon: {
    width: 30,
    height: 30,
    marginLeft: 5,
    borderRadius: 5,
  },
});

export default Style;
