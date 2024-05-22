// strings.ts

// Define constants for screen titles
export const SCREEN_TITLES = {
  MY_SHIFTS: 'My Shifts',
  AVAILABLE_SHIFTS: 'Available Shifts',
};

// Define constants for button labels
export const BUTTON_LABELS = {
  BOOK_SHIFT: 'Book Shift',
  CANCEL_SHIFT: 'Cancel Shift',
};

// Define constants for in-screen labels
export const IN_SCREEN_LABELS = {
  AVAILABLE_SHIFTS: {
    OVERLAPPING: 'Overlapping', 
    BOOKED: 'Booked', 
    BOOK: 'Book', 
    CANCEL: 'Cancel',
  },
  MY_SHIFTS: {
    NO_SHIFTS: 'You have no shifts',
    CANCEL: 'Cancel',
    SHIFT: 'Shift',
  },
};

// Define constants for error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error occurred. Please try again later.',
  BOOKING_FAILED: 'Failed to book the shift. Please try again.',
  CANCELLATION_FAILED: 'Failed to cancel the shift. Please try again.',
  FAILED_CANCEL: 'Failed to cancel the shift', 
  FAILED_BOOK: 'Failed to book the shift',
  FAILED_FETCH_SHIFTS: 'Failed to fetch shifts',
};

// Export all constants as a single object
export default {
  SCREEN_TITLES,
  BUTTON_LABELS,
  ERROR_MESSAGES,
  IN_SCREEN_LABELS,
};