// Custom React hooks for the application

import { useState, useEffect, useCallback, useRef } from 'react';
import { ValidationRules, validateForm } from './validation';
import { debounce } from './helpers';

// Custom hook for form handling with validation
export const useForm = <T extends Record<string, any>>(
  initialValues: T,
  validationRules?: ValidationRules,
  onSubmit?: (values: T) => Promise<void> | void
) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const handleChange = useCallback((name: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
    setIsDirty(true);

    // Clear error when user starts typing
    if (errors[name as string]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [errors]);

  const validate = useCallback(() => {
    if (!validationRules) return {};
    
    const formErrors = validateForm(
      values as Record<string, string>,
      validationRules
    );
    setErrors(formErrors);
    return formErrors;
  }, [values, validationRules]);

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    const formErrors = validate();
    
    if (Object.keys(formErrors).length === 0 && onSubmit) {
      setIsSubmitting(true);
      try {
        await onSubmit(values);
        setIsDirty(false);
      } catch (error) {
        console.error('Form submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  }, [values, validate, onSubmit]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setIsDirty(false);
    setIsSubmitting(false);
  }, [initialValues]);

  return {
    values,
    errors,
    isSubmitting,
    isDirty,
    handleChange,
    handleSubmit,
    validate,
    reset,
    setFieldError: (field: string, error: string) => {
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };
};

// Custom hook for handling scroll position
export const useScroll = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollPosition = () => {
      const scrollY = window.pageYOffset;
      setScrollDirection(scrollY > lastScrollY ? 'down' : 'up');
      setScrollPosition(scrollY);
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    const throttledUpdateScrollPosition = debounce(updateScrollPosition, 10);

    window.addEventListener('scroll', throttledUpdateScrollPosition);

    return () => {
      window.removeEventListener('scroll', throttledUpdateScrollPosition);
    };
  }, []);

  return { scrollPosition, scrollDirection };
};

// Custom hook for intersection observer
export const useIntersectionObserver = (
  threshold: number = 0.1,
  rootMargin: string = '0px'
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting) {
          setHasIntersected(true);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin]);

  return { ref, isIntersecting, hasIntersected };
};

// Custom hook for local storage
export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  return [storedValue, setValue];
};

// Custom hook for debounced value
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Custom hook for window size
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    const debouncedHandleResize = debounce(handleResize, 100);

    window.addEventListener('resize', debouncedHandleResize);

    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
    };
  }, []);

  return windowSize;
};

// Custom hook for click outside
export const useClickOutside = (callback: () => void) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [callback]);

  return ref;
};

// Custom hook for async data fetching
export const useAsync = <T, E = Error>(
  asyncFunction: () => Promise<T>,
  dependencies: React.DependencyList = []
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<E | null>(null);

  useEffect(() => {
    let isCanceled = false;

    setLoading(true);
    setError(null);

    asyncFunction()
      .then((result) => {
        if (!isCanceled) {
          setData(result);
          setLoading(false);
        }
      })
      .catch((error) => {
        if (!isCanceled) {
          setError(error);
          setLoading(false);
        }
      });

    return () => {
      isCanceled = true;
    };
  }, dependencies);

  return { data, loading, error, refetch: asyncFunction };
};

// Custom hook for toggle state
export const useToggle = (initialValue: boolean = false): [boolean, () => void, (value: boolean) => void] => {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue(prev => !prev);
  }, []);

  const setToggle = useCallback((newValue: boolean) => {
    setValue(newValue);
  }, []);

  return [value, toggle, setToggle];
};

// Custom hook for search functionality
export const useSearch = <T>(
  items: T[],
  searchFields: (keyof T)[],
  delay: number = 300
) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<T[]>(items);
  const debouncedQuery = useDebounce(query, delay);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults(items);
      return;
    }

    const filtered = items.filter(item =>
      searchFields.some(field => {
        const value = item[field];
        return typeof value === 'string' && 
               value.toLowerCase().includes(debouncedQuery.toLowerCase());
      })
    );

    setResults(filtered);
  }, [debouncedQuery, items, searchFields]);

  return { query, setQuery, results };
};