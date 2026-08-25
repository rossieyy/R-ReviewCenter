// Form validation utilities

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => boolean;
}

export interface ValidationRules {
  [key: string]: ValidationRule;
}

export const validateField = (value: string, rules: ValidationRule): string | null => {
  if (rules.required && !value.trim()) {
    return 'This field is required';
  }

  if (value && rules.minLength && value.length < rules.minLength) {
    return `Must be at least ${rules.minLength} characters`;
  }

  if (value && rules.maxLength && value.length > rules.maxLength) {
    return `Must be no more than ${rules.maxLength} characters`;
  }

  if (value && rules.pattern && !rules.pattern.test(value)) {
    return 'Invalid format';
  }

  if (value && rules.custom && !rules.custom(value)) {
    return 'Invalid value';
  }

  return null;
};

export const validateForm = (data: { [key: string]: string }, rules: ValidationRules): { [key: string]: string } => {
  const errors: { [key: string]: string } = {};

  Object.keys(rules).forEach(field => {
    const error = validateField(data[field] || '', rules[field]);
    if (error) {
      errors[field] = error;
    }
  });

  return errors;
};

// Specific validation rules for the application
export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phonePattern = /^(09|\+639)\d{9}$/;
export const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

export const registrationRules: ValidationRules = {
  firstName: {
    required: true,
    minLength: 2,
    maxLength: 50
  },
  lastName: {
    required: true,
    minLength: 2,
    maxLength: 50
  },
  email: {
    required: true,
    pattern: emailPattern
  },
  phoneNumber: {
    required: true,
    pattern: phonePattern
  },
  password: {
    required: true,
    minLength: 8,
    pattern: passwordPattern
  }
};

export const loginRules: ValidationRules = {
  email: {
    required: true,
    pattern: emailPattern
  },
  password: {
    required: true,
    minLength: 6
  }
};

export const newsletterRules: ValidationRules = {
  email: {
    required: true,
    pattern: emailPattern
  }
};

export const contactRules: ValidationRules = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 100
  },
  email: {
    required: true,
    pattern: emailPattern
  },
  message: {
    required: true,
    minLength: 10,
    maxLength: 1000
  }
};

// Real-time validation helper
export const createValidator = (rules: ValidationRules) => {
  return (field: string, value: string) => {
    if (rules[field]) {
      return validateField(value, rules[field]);
    }
    return null;
  };
};

// Password strength checker
export const checkPasswordStrength = (password: string): { score: number; feedback: string[] } => {
  const feedback: string[] = [];
  let score = 0;

  if (password.length >= 8) {
    score += 1;
  } else {
    feedback.push('Use at least 8 characters');
  }

  if (/[a-z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Include lowercase letters');
  }

  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Include uppercase letters');
  }

  if (/\d/.test(password)) {
    score += 1;
  } else {
    feedback.push('Include numbers');
  }

  if (/[^a-zA-Z0-9]/.test(password)) {
    score += 1;
    feedback.unshift('Excellent! Strong password');
  } else if (score >= 4) {
    feedback.unshift('Good password strength');
  }

  return { score, feedback };
};

// Form sanitization
export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
};

export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format as 09XX-XXX-XXXX
  if (cleaned.length === 11 && cleaned.startsWith('09')) {
    return `${cleaned.slice(0, 4)}-${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }
  
  return phone;
};