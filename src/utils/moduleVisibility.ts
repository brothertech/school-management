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
 * Parse the module visibility from the API response
 * @param moduleVisibilityData - The module visibility data (can be object or JSON string)
 * @returns Parsed module visibility object with boolean values
 */
export function parseModuleVisibility(moduleVisibilityData: { [key: string]: boolean } | string): ParsedModuleVisibility {
  try {
    let parsed: any;
    
    // Handle both object and string formats
    if (typeof moduleVisibilityData === 'string') {
      parsed = JSON.parse(moduleVisibilityData);
    } else {
      parsed = moduleVisibilityData;
    }
    
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
 * @param moduleVisibilityData - The module visibility data (can be object or JSON string)
 * @param moduleName - The name of the module to check
 * @returns Boolean indicating if the module is visible
 */
export function isModuleVisible(moduleVisibilityData: { [key: string]: boolean } | string, moduleName: keyof ParsedModuleVisibility): boolean {
  const parsedVisibility = parseModuleVisibility(moduleVisibilityData);
  return parsedVisibility[moduleName];
}

/**
 * Get all visible modules for the current user
 * @param moduleVisibilityData - The module visibility data (can be object or JSON string)
 * @returns Array of module names that are visible
 */
export function getVisibleModules(moduleVisibilityData: { [key: string]: boolean } | string): (keyof ParsedModuleVisibility)[] {
  const parsedVisibility = parseModuleVisibility(moduleVisibilityData);
  return Object.entries(parsedVisibility)
    .filter(([_, isVisible]) => isVisible)
    .map(([moduleName, _]) => moduleName as keyof ParsedModuleVisibility);
}