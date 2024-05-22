import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import Svg, { G, Circle, Path } from 'react-native-svg';
import Colors from '../../utils/colors';

interface LoaderProps {
  size?: number;
  stroke?: string;
}

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const Loader: React.FC<LoaderProps> = ({ size = 20, stroke = Colors.FOREST_GREEN }) => {
  const rotateValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const rotateAnimation = Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    rotateAnimation.start();
  }, [rotateValue]);

  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={{ transform: [{ rotate }] }}>
      <Svg width={size} height={size} viewBox="0 0 38 38" stroke={stroke}>
        <G fill="none" fillRule="evenodd">
          <G transform="translate(1 1)" strokeWidth="2">
            <Circle strokeOpacity=".5" cx="18" cy="18" r="18" />
            <Path d="M36 18c0-9.94-8.06-18-18-18" />
          </G>
        </G>
      </Svg>
    </Animated.View>
  );
};

export default Loader;
