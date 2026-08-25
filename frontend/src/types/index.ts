// User types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  registrationDate: Date;
  isActive: boolean;
}

// Registration form types
export interface RegistrationForm {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

// Login form types
export interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

// Article types
export interface Article {
  id: string;
  title: string;
  content: string;
  summary: string;
  author: string;
  publishDate: Date;
  category: string;
  tags: string[];
  imageUrl?: string;
}

// Topic/Subject types
export interface Topic {
  id: string;
  title: string;
  description: string;
  duration: string;
  materials: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

// FAQ types
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

// Contact information types
export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  facebookPage: string;
}

// Review program details
export interface ReviewProgram {
  regularFee: number;
  promoFee: number;
  downPayment: number;
  examDate: string;
  features: string[];
  schedule: string;
}