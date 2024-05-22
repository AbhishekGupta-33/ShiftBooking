// App.tsx

import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  SectionList,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {
  globalConvertApiDataToSections,
  isTimeInFuture,
} from '../../utils/globalFunction';
import { Section, useShifts } from '../../services/api';
import { styles } from './AvailableShiftsScreenStyle';
import { ButtonType } from '../../utils/globalConstant';
import SectionListHeader from '../../components/SectionListHeader/SectionListHeader';
import MyShiftListItem from '../../components/ShiftListItem/ShiftListItem';
import { ERROR_MESSAGES, IN_SCREEN_LABELS } from '../../utils/strings';

// Define a type for the shift data
type Shift = {
  area: string;
  booked: boolean;
  endTime: number;
  id: string;
  startTime: number;
};

interface GroupedShift {
  area: string;
  shift: Shift[];
}


// Check if a shift is overlapping with any booked shifts
const isOverlapping = (shift: Shift, bookedShifts: Shift[]) => {
  return bookedShifts.some(
    bookedShift =>
    shift.id !== bookedShift.id && shift.startTime < bookedShift.endTime &&
      shift.endTime > bookedShift.startTime && bookedShift.booked,
  );
};

// Tab bar component for switching areas
const TabBar = () => {
  const { allShifts, selectedArea, setSelectedArea } = useShifts();

  // create groups
  const groupedByArea = allShifts.reduce<GroupedShift[]>((acc, cur) => {
    // Check if the area already exists in the accumulator
    const area = acc.find(a => a?.area === cur.area);
    if (area) {
      area.shift.push(cur);
    } else {
      acc.push({
        area: cur.area,
        shift: [cur]
      });
    }
    return acc;
  }, []);


  return (
    groupedByArea.length === 0 ? null :
      <View style={styles.tabContainer}>
        {
          groupedByArea.map((item) => (
            <TouchableOpacity
              key={item?.area}
              onPress={() => setSelectedArea(item?.area)}
              style={[
                styles.tab,
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedArea === item?.area ? styles.selectedTabText : null,
                ]}
              >
                {item?.area}{` (${item?.shift?.length})`}
              </Text>
            </TouchableOpacity>
          ))}
      </View>
  );
};

// List of shifts
const ShiftList = () => {
  // Initialize states and functions from the context
  const { selectedArea, allShifts, bookShiftById, cancelShiftById } = useShifts();
  const [section, setSection] = useState<Section[]>([]);
  const [isLoadingShiftID, setIsLoadingShiftID] = useState<string | null>(null);
  let filteredShifts = useRef<Shift[]>([]);

  //=======================================================================================================
  // Business Logic -------------------------------------------------------
  //=======================================================================================================


  // filtering the data from All Shift
  const shiftInit = async () => {
    filteredShifts.current = allShifts.filter(item => item.area === selectedArea);
    const sections: Section[] = await globalConvertApiDataToSections(filteredShifts.current);
    setSection(sections);
  };

  useEffect(() => {
    if (selectedArea) {
      shiftInit();
    }
  }, [selectedArea]);

  //=======================================================================================================
  // API Calls ------------------------------------------------------------
  //=======================================================================================================

  // Book a shift by ID
  const onBookButtonPress = async (id: string) => {
    try {
      setIsLoadingShiftID(id);
      await bookShiftById(id);
      await shiftInit();
      setIsLoadingShiftID(null);
    } catch (error) {
      Alert.alert(ERROR_MESSAGES.FAILED_BOOK);
    }
  };

  // Cancel a shift by ID
  const onCancelButtonPress = async (id: string) => {
    try {
      setIsLoadingShiftID(id); // Set loading state
      await cancelShiftById(id);
      await shiftInit(); // Refetch shifts
      setIsLoadingShiftID(null); // Reset loading state
    } catch (error) {
      Alert.alert(ERROR_MESSAGES.FAILED_CANCEL);
    }
  };

  //=======================================================================================================
  // UI Components ---------------------------------------------------------
  //=======================================================================================================

  const renderSectionHeader = ({ section }: { section: Section }) => <SectionListHeader data={section} />;

  return (
    section.length === 0 ?
      <Text style={styles.noShiftsText}>{IN_SCREEN_LABELS.MY_SHIFTS.NO_SHIFTS}</Text>
      :
      <SectionList
        sections={section}
        keyExtractor={item => item.id}
        renderItem={({ item, section }) => {
          // Check if a shift is overlapping with any booked shifts
          const bookedShifts = section?.data?.filter(shift => shift.booked);
          const overlapping = isOverlapping(item, bookedShifts);
          return (
            <MyShiftListItem
              key={item.id}
              startTime={item.startTime}
              endTime={item.endTime}
              buttonTitle={
                item.booked &&  isTimeInFuture(item.startTime)
                  ? IN_SCREEN_LABELS.AVAILABLE_SHIFTS.CANCEL
                  : IN_SCREEN_LABELS.AVAILABLE_SHIFTS.BOOK
              }
              buttonLoading={item.id === isLoadingShiftID}
              isStatusShow={true}
              booked={item.booked}
              status={
                overlapping
                  ? IN_SCREEN_LABELS.AVAILABLE_SHIFTS.OVERLAPPING
                  : IN_SCREEN_LABELS.AVAILABLE_SHIFTS.BOOKED
              }
              buttonType={
                item.booked && isTimeInFuture(item.startTime)
                  ? ButtonType.FAIL
                  : overlapping || !isTimeInFuture(item.startTime)
                    ? ButtonType.DISABLED
                    : ButtonType.SUCCESS
              }
              onPress={() => {
                if (
                  isLoadingShiftID === null &&
                  isTimeInFuture(item.startTime) &&
                  !overlapping
                ) {
                  if (item.booked) {
                    onCancelButtonPress(item.id);
                  } else {
                    onBookButtonPress(item.id);
                  }
                }
              }}
            />
          );
        }}
        renderSectionHeader={renderSectionHeader}
      />
  );
};

const AvailableShiftsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TabBar />
      <ShiftList />
    </SafeAreaView>
  );
};

export default AvailableShiftsScreen;
