import { Section, Shift } from "../services/api";

export const getLocalDateLabel = (dateString: number): string => {
  const today: Date = new Date();
  today.setHours(0, 0, 0, 0); // Set time to 00:00:00:00

  const parsedDate: Date = new Date(dateString);
  parsedDate.setHours(0, 0, 0, 0); // Set time to 00:00:00:00

  const dayDiff: number = Math.floor((parsedDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  if (dayDiff === 0) {
    return 'Today';
  } else if (dayDiff === 1) {
    return 'Tomorrow';
  } else {
    // Include year for dates beyond the current year
    let finalData = parsedDate.getFullYear() === today.getFullYear()
      ? parsedDate.toLocaleDateString('default', { day: 'numeric', month: 'short' })
      : parsedDate.toLocaleDateString();
    return finalData;
  }
};

// Function to convert API data to sections
export const globalConvertApiDataToSections = async (data: Shift[]) => {
  if (data?.length > 0) {
    const sections: Section[] = []; // Array to store sections
    const dates = new Set<string>(); // Set to store unique dates

    // Extract unique dates from timestamps
    for (const shift of data) {
      const dateString = getLocalDateLabel(shift.startTime); // Get local date label
      dates.add(dateString); // Add date to set
    }

    // Create sections for each unique date
    for (const dateString of dates) {
      const section: Section = {
        title: dateString, // Set section title as date string
        data: [], // Array to store shifts for this date
      };

      // Add shifts to section
      for (const shift of data) {
        if (getLocalDateLabel(shift.startTime) === dateString) {
          section.data.push(shift);
        }
      }

      sections.push(section); // Add section to sections array
    }

    // Sort shifts within each section by start time
    const timeSortedArray: Section[] = sections.map(section => ({
      title: section.title,
      data: section.data.sort((a: { startTime: number; }, b: { startTime: number; }) => a.startTime - b.startTime)
    })).filter(section => section.data.length > 0);

    return timeSortedArray; // Return the sorted sections
  } else {
    return []; // Return an empty array if data is empty
  }
};

export const formatTime = (timestamp: number) => {
  const date = timestamp ?  new Date(timestamp) :  new Date();
  return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
};


export const isTimeInFuture = (timestamp: number) => {
  const now = Date.now(); // Current time in milliseconds
  return timestamp > now;
};

export default{
  getLocalDateLabel,
  formatTime,
  isTimeInFuture,
  globalConvertApiDataToSections
}