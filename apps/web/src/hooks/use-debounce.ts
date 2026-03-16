import { useCallback, useRef, useState } from 'react';

export function useDebounce<T>(initialValue: T, onChange: (value: T) => void, delay: number = 300): [T, (value: T) => void] {
    const [value, setValue] = useState<T>(initialValue);
    const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
    const onChangeRef = useRef(onChange);
    onChangeRef.current = onChange;

    const set = useCallback((newValue: T) => {
        setValue(newValue);
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            onChangeRef.current(newValue);
        }, delay);
    }, [delay]);

    return [value, set];
}
