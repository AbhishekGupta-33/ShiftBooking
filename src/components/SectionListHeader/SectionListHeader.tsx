import React from 'react';
import { View, Text, StyleProp, ViewStyle } from 'react-native';
import { styles } from './SectionListHeaderStyles';
import { Section} from '../../services/api';
import { IN_SCREEN_LABELS } from '../../utils/strings';

interface SectionListHeaderProps {
  data: Section;
  headerStyle?: StyleProp<ViewStyle>;
}
const SectionListHeader: React.FC<SectionListHeaderProps> = ({ data, headerStyle })=> {
  return (
    <View style={[styles.headerContainer, headerStyle]}>
      <Text style={styles.headerText}>{data?.title}</Text>
      <Text style={styles.subDetailText}>{data?.data?.length} {IN_SCREEN_LABELS.MY_SHIFTS.SHIFT}</Text>
    </View>
  );
};

export default SectionListHeader;
