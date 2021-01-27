import {StyleSheet, Dimensions} from 'react-native';

const Style = StyleSheet.create({
  greenBackgroundScreen: {
    height: '100%',
    backgroundColor: '#15616d',
  },

  whiteBackgroundScreen: {
    height: '100%',
    backgroundColor: '#fff',
  },

  contentMainView: {
    flexDirection: 'row',
    padding: 8,
  },

  contentInfoView: {
    flexDirection: 'row',
    backgroundColor: '#555555',
    alignItems: 'center',
    padding: 6,
    borderRadius: 4,
    marginRight: 'auto',
    marginBottom: 4,
  },

  contentInfoText: {
    color: '#fff',
    fontSize: 10,
    borderRadius: 4,
    marginRight: 4,
    overflow: 'hidden',
    fontWeight: 'bold',
    marginEnd: 'auto',
  },

  contentImage: {
    height: 150,
    width: (2 / 3) * 150,
  },

  contentImageWatched: {
    opacity: 0.75,
  },

  contentMainDetailsView: {
    paddingLeft: 16,
  },

  contentRatingView: {
    marginRight: 'auto',
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },

  contentRatingText: {
    paddingLeft: 4,
    paddingRight: 1,
  },

  contentDetailsView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: Dimensions.get('window').width - (2 / 3) * 150 - 48,
    alignItems: 'baseline',
  },

  contentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 4,
    marginBottom: 4,
  },

  contentReleaseYear: {
    fontSize: 12,
    color: '#555555',
    fontWeight: 'bold',
    marginBottom: 4,
  },

  contentServiceView: {
    flexDirection: 'row',
    marginBottom: 8,
  },

  contentServiceIcon: {
    width: 40,
    height: 40,
    borderRadius: 4,
    marginRight: 4,
  },

  searchMainView: {
    flexDirection: 'column',
    padding: 8,
    backgroundColor: 'white',
    height: '100%',
  },

  searchMainButton: {
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'center',
    margin: 8,
    width: Dimensions.get('window').width - 32,
    alignItems: 'center',
    alignContent: 'center',
    borderColor: '#15616d',
    overflow: 'hidden',
    borderRadius: 4,
    textAlignVertical: 'center',
    borderWidth: 2,
  },

  searchMainText: {
    fontWeight: 'bold',
    fontSize: 18,
  },

  manageServiceIcon: {
    width: 60,
    height: 60,
    borderRadius: 4,
    borderColor: '#000',
    marginRight: 24,
  },

  manageServiceView: {
    position: 'relative',
    left: 48,
    bottom: 12,
    backgroundColor: '#fff',
    width: 26,
    height: 26,
    borderRadius: 13,
  },

  manageServiceFlexView: {
    flexDirection: 'row',
    marginLeft: 8,
    marginBottom: 8,
    flexWrap: 'wrap',
  },

  manageServiceTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingLeft: 8,
    marginBottom: 8,
  },

  manageServiceWrapper: {
    marginVertical: 16,
  },

  viewTitle: {
    marginTop: 16,
    fontSize: 32,
    fontWeight: 'bold',
    marginRight: 'auto',
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
    flexDirection: 'row',
  },
});

export default Style;
