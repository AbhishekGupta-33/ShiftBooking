import React from 'react';
import { Text, TouchableOpacity, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { styles } from './ButtonStyles';
import { ButtonType } from '../../utils/globalConstant';
import { SvgWithCss } from 'react-native-svg/css';
import successLoading from '../../../assets/svg/spinner_green.svg'
import failLoading from '../../../assets/svg/spinner_red.svg'
import Loader from '../Loader/Loader';
import Colors from '../../utils/colors';
// import { svgPath } from '../../../assets/svg/SvgPath';
// import { SvgWithCss } from 'react-native-svg/css';

interface ButtonProps {
  text: string;
  buttonType?: string;
  onPress: () => void;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, buttonType = ButtonType.FAIL, isLoading = false, onPress }) => {
  // Define styles based on buttonType
  let viewStyle: StyleProp<ViewStyle> = {};
  let textStyle: StyleProp<TextStyle> = {};

  switch (buttonType) {
    case ButtonType.SUCCESS:
      viewStyle = styles.successViewStyle;
      textStyle = styles.successTextStyle;
      break;
    case ButtonType.FAIL:
      viewStyle = styles.failViewStyle;
      textStyle = styles.failTextStyle;
      break;
    case ButtonType.DISABLED:
      viewStyle = styles.disableViewStyle;
      textStyle = styles.disableTextStyle;
      break;
    default:
      break;
  }


  // ...

  return (
    <TouchableOpacity activeOpacity={buttonType !== ButtonType.DISABLED ? 0.4 : 1 } style={[styles.buttonViewStyle, viewStyle]} onPress={() => { if (onPress() && buttonType !== ButtonType.DISABLED) onPress() }}>
      {
        isLoading ?
          <Loader
            size={20}
            stroke={buttonType === ButtonType.FAIL ? Colors.HOT_PINK : Colors.FOREST_GREEN}
          />
          :
          <Text style={[styles.buttonTextStyle, textStyle]}>{text}</Text>

      }
    </TouchableOpacity>
  );
};

export default Button;
