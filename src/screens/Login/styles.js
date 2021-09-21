import {Colors, Mixin} from '../../styles';
import {FONT_SIZE_40} from '../../styles/Typography';

const styles = {
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  txtTile: {
    color: Colors.BUTTON_HIGTH,
    fontSize: FONT_SIZE_40,
    fontWeight: 'bold',
    marginBottom: Mixin.moderateSize(20),
    // position: 'absolute',
  },
  txtInput: {
    width: '100%',
    height: Mixin.moderateSize(40),
    marginBottom: Mixin.moderateSize(8),
    borderWidth: 0.5,
    borderColor: 'gray',
    paddingHorizontal: 8,
    borderRadius: 8,
    justifyContent: 'center',
  },
  btn: {
    width: '100%',
    height: Mixin.moderateSize(40),
    backgroundColor: Colors.BUTTON_HIGTH,
    justifyContent: 'center',
    borderRadius: 8,
    marginBottom: Mixin.moderateSize(20),
  },
  txtCompanyChange: {
    color: Colors.BUTTON_HIGTH,
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  },
  txtLogin: {
    color: Colors.WHITE,
    fontWeight: 'bold',
    textAlign: 'center',
  },
};

export default styles;
