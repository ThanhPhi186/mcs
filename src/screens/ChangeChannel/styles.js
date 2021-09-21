import {Colors, Mixin} from '../../styles';
import {FONT_SIZE_16, FONT_SIZE_20, LINE_HEIGHT} from '../../styles/Typography';

const styles = {
  container: {
    flex: 1,
  },
  btn: {
    height: Mixin.moderateSize(50),
    backgroundColor: Colors.WHITE,
    justifyContent: 'center',
    paddingHorizontal: Mixin.moderateSize(12),
    marginTop: Mixin.moderateSize(8),
  },
  storeName: {
    fontWeight: 'bold',
    lineHeight: LINE_HEIGHT,
  },
  storeCode: {
    fontStyle: 'italic',
    lineHeight: LINE_HEIGHT,
  },
  btnActive: {
    height: Mixin.moderateSize(50),
    backgroundColor: Colors.PRIMARY,
    justifyContent: 'center',
    paddingHorizontal: Mixin.moderateSize(12),
    marginTop: Mixin.moderateSize(8),
  },
  txtEmpty: {
    color: Colors.GRAY,
    fontSize: FONT_SIZE_16,
    textAlign: 'center',
    marginTop: Mixin.moderateSize(80),
  },
};

export default styles;
