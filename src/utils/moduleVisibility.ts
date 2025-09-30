// Utility functions for handling module visibility

export interface ParsedModuleVisibility {
  students: boolean;
  teachers: boolean;
  classes: boolean;
  subjects: boolean;
  exams: boolean;
  timetable: boolean;
  attendance: boolean;
  fees: boolean;
  library: boolean;
  transport: boolean;
  messaging: boolean;
  groups: boolean;
  announcements: boolean;
  parent_portal: boolean;
  student_portal: boolean;
  reports: boolean;
  cbt: boolean;
  recruitment: boolean;
}

/**
 * Parse the module visibility JSON string from the API response
 * @param moduleVisibilityString - The JSON string containing module visibility settings
 * @returns Parsed module visibility object with boolean values
 */
export function parseModuleVisibility(moduleVisibilityString: string): ParsedModuleVisibility {
  try {
    const parsed = JSON.parse(moduleVisibilityString);
    
    // Ensure all expected modules are present with default false values
    const defaultVisibility: ParsedModuleVisibility = {
      students: false,
      teachers: false,
      classes: false,
      subjects: false,
      exams: false,
      timetable: false,
      attendance: false,
      fees: false,
      library: false,
      transport: false,
      messaging: false,
      groups: false,
      announcements: false,
      parent_portal: false,
      student_portal: false,
      reports: false,
      cbt: false,
      recruitment: false,
    };

    // Merge parsed data with defaults to ensure all properties exist
    return {
      ...defaultVisibility,
      ...parsed,
    };
  } catch (error) {
    console.error('Error parsing module visibility:', error);
    
    // Return default visibility with all modules disabled if parsing fails
    return {
      students: false,
      teachers: false,
      classes: false,
      subjects: false,
      exams: false,
      timetable: false,
      attendance: false,
      fees: false,
      library: false,
      transport: false,
      messaging: false,
      groups: false,
      announcements: false,
      parent_portal: false,
      student_portal: false,
      reports: false,
      cbt: false,
      recruitment: false,
    };
  }
}

/**
 * Check if a specific module is visible for the current user
 * @param moduleVisibilityString - The JSON string containing module visibility settings
 * @param moduleName - The name of the module to check
 * @returns Boolean indicating if the module is visible
 */
export function isModuleVisible(moduleVisibilityString: string, moduleName: keyof ParsedModuleVisibility): boolean {
  const parsedVisibility = parseModuleVisibility(moduleVisibilityString);
  return parsedVisibility[moduleName];
}

/**
 * Get all visible modules for the current user
 * @param moduleVisibilityString - The JSON string containing module visibility settings
 * @returns Array of module names that are visible
 */
export function getVisibleModules(moduleVisibilityString: string): (keyof ParsedModuleVisibility)[] {
  const parsedVisibility = parseModuleVisibility(moduleVisibilityString);
  return Object.entries(parsedVisibility)
    .filter(([_, isVisible]) => isVisible)
    .map(([moduleName, _]) => moduleName as keyof ParsedModuleVisibility);
}