// MyShiftsScreen.tsx

import React, { useEffect, useState } from 'react';
import { Text, SectionList, SafeAreaView, Alert, RefreshControl, ScrollView, View } from 'react-native';
import { Section, Shift, useShifts } from '../../services/api';
import MyShiftListItem from '../../components/ShiftListItem/ShiftListItem';
import { styles } from './MyShiftScreenStyle';
import SectionListHeader from '../../components/SectionListHeader/SectionListHeader';
import { ERROR_MESSAGES, IN_SCREEN_LABELS } from '../../utils/strings';

const MyShiftsScreen: React.FC = () => {
  // State and hooks
  const { fetchShifts, shifts, loading, cancelShiftById } = useShifts();
  const [userShifts, setUserShifts] = useState<Section[]>([]);
  const [isLoadingShiftID, setIsLoadingShiftID] = useState<string | null>(null);

  //=======================================================================
  // Business Logic -------------------------------------------------------
  //=======================================================================

  // Fetch shifts on component mount
  useEffect(() => {
    fetchShifts();
  }, []);

  // Filter out the shifts that are booked
  useEffect(() => {
    if (shifts.length > 0) {
      let userShifts = shifts
        .map(section => ({
          title: section.title,
          data: section.data.filter(shift => shift?.booked),
        }))
        .filter(section => section.data.length > 0); // Filter out the sections with no booked shifts
      setUserShifts(userShifts);
    }
  }, [shifts]);

  //=======================================================================
  // API Calls ------------------------------------------------------------
  //=======================================================================

  // Cancel a shift by ID
  const onCancelButtonPress = async (id: string) => {
    try {
      setIsLoadingShiftID(id); // Set loading state
      await cancelShiftById(id);
      await fetchShifts(); // Refetch shifts
      setIsLoadingShiftID(null); // Reset loading state
    } catch (error) {
      Alert.alert(ERROR_MESSAGES.FAILED_CANCEL);
    }
  };

  //======================================================================
  // UI Logic ------------------------------------------------------------
  //======================================================================

  // Render section header
  const renderSectionHeader = ({ section }: { section: Section }) => <SectionListHeader data={section} />;

  // Render item in the Booked Shifts section
  const renderItem = ({ item }: { item: Shift }) => (
    <MyShiftListItem
      key={item.id}
      area={item.area}
      startTime={item.startTime}
      endTime={item.endTime}
      booked={item.booked}
      buttonLoading={item.id === isLoadingShiftID}
      onPress={() => {
        if (item.booked && !isLoadingShiftID) {
          onCancelButtonPress(item.id);
        }
      }}
      buttonTitle={IN_SCREEN_LABELS.MY_SHIFTS.CANCEL}
    />
  );


  // Render the screen
  return (
    <SafeAreaView style={styles.container}>
      {
        userShifts.length === 0 ?
          // Show a message if there are no shifts
          <ScrollView
            contentContainerStyle={styles.footerStyle}
            refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchShifts} />}
          >
            <View style={styles.footerStyle}>
              <Text style={styles.noShiftsText}>{IN_SCREEN_LABELS.MY_SHIFTS.NO_SHIFTS}</Text>
            </View>
          </ScrollView>
          :
          // Show the shifts in a SectionList
          <SectionList
            sections={userShifts}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={fetchShifts} />
            }
            refreshing={loading}
            initialNumToRender={10}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
          />
      }
    </SafeAreaView>
  );
}

export default MyShiftsScreen;