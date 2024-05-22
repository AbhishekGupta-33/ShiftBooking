// api.ts

import axios from 'axios';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';
import {globalConvertApiDataToSections} from '../utils/globalFunction';
import { Alert } from 'react-native';
import { ERROR_MESSAGES } from '../utils/strings';

const BASE_URL = 'http://127.0.0.1:8083';

// ========================================================================
// TYPES -------------------------------------------------------------------
// ========================================================================

// Define the types for the shifts
export interface Shift {
  id: string;
  area: string;
  booked: boolean;
  startTime: number;
  endTime: number;
}

// Define the context type
export interface ShiftsContextType {
  fetchShifts: () => Promise<void>;
  fetchShiftById: (id: string) => Promise<Shift>;
  bookShiftById: (id: string) => Promise<Shift | undefined>;
  cancelShiftById: (id: string) => Promise<Shift | undefined>;
  shifts: Section[];
  setShifts: Dispatch<SetStateAction<Section[]>>;
  allShifts: Shift[];
  setAllShifts: Dispatch<SetStateAction<Shift[]>>;
  selectedArea: string;
  setSelectedArea: Dispatch<SetStateAction<string>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

// Define the type for the sections
export interface Section {
  title: string;
  data: Shift[];
}

// Define the props for the provider
export interface ShiftsProviderProps {
  children: React.ReactNode;
}

// Create the context
const ShiftsContext = createContext<ShiftsContextType | undefined>(undefined);

export const useShifts = () => {
  const context = useContext(ShiftsContext);
  if (!context) {
    throw new Error('useShifts must be used within a ShiftsProvider');
  }
  return context;
};


// ========================================================================
// PROVIDER ----------------------------------------------------------------
// ========================================================================

// Provider component to wrap the app
const ShiftsProvider = ({children}: ShiftsProviderProps) => {

  // State to store shifts
  const [shifts, setShifts] = useState<Section[]>([]);
  const [allShifts, setAllShifts] = useState<Shift[]>([]);
  const [selectedArea, setSelectedArea] = useState(allShifts[0]?.area);
  const [loading, setLoading] = useState<boolean>(false);

  // ========================================================================
  // API Calls ------------------------------------------------------------
  // ========================================================================

  // API: Fetch shifts from the API
  const fetchShifts = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/shifts`);
      setAllShifts(response.data);
      if (response.data.length > 0) setSelectedArea(response.data[0].area); // Set the selected area to the first area for available shifts
      let manupulatedResponse = await globalConvertApiDataToSections(response.data); // Convert API data to sections
      setShifts(manupulatedResponse)
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert('', ERROR_MESSAGES.FAILED_FETCH_SHIFTS);
    }
  };

  // API: fetch shift by ID
  const fetchShiftById = async (id: string): Promise<Shift> => {
    try {
      const response = await axios.get(`${BASE_URL}/shifts/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch shift by ID');
    }
  };

  // API: Book a shift by ID
  const bookShiftById = async (id: string): Promise<Shift | undefined> => {
    try {
      const response = await axios.post(`${BASE_URL}/shifts/${id}/book`);
      return response.data;
    } catch (error) {
      Alert.alert('',ERROR_MESSAGES.BOOKING_FAILED);
    }
  };

  // API: Cancel a shift by ID
  const cancelShiftById = async (id: string): Promise<Shift | undefined> => {
    try {
      const response = await axios.post(`${BASE_URL}/shifts/${id}/cancel`);
      return response.data;
    } catch (error) {
      Alert.alert('', ERROR_MESSAGES.CANCELLATION_FAILED);}
  };

  return (
    <ShiftsContext.Provider
      value={{
      fetchShifts,
      fetchShiftById,
      bookShiftById,
      cancelShiftById,
      shifts,
      setShifts,
      allShifts,
      setAllShifts,
      selectedArea,
      setSelectedArea,
      loading,
      setLoading,
      }}>
      {children}
    </ShiftsContext.Provider>
  );
};

export default ShiftsProvider;
