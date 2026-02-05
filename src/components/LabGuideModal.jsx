import { useEffect, useRef, useCallback } from 'react';
import { IconBook, IconX } from './icons';

const FOCUSABLE_SELECTOR = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export const LabGuideModal = ({ title, children, onClose, triggerRef }) => {
    const dialogRef = useRef(null);
    const closeButtonRef = useRef(null);

    const focusTrap = useCallback(
        (e) => {
            if (e.key !== 'Tab' || !dialogRef.current) return;
            const focusable = dialogRef.current.querySelectorAll(FOCUSABLE_SELECTOR);
            const list = Array.from(focusable).filter((el) => el.tabIndex !== -1 && !el.disabled);
            if (list.length === 0) return;
            const first = list[0];
            const last = list[list.length - 1];
            if (e.shiftKey) {
                if (document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
            } else {
                if (document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        },
        []
    );

    useEffect(() => {
        const previouslyFocused = document.activeElement;
        closeButtonRef.current?.focus();

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
                return;
            }
            focusTrap(e);
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            if (triggerRef?.current && typeof triggerRef.current.focus === 'function') {
                triggerRef.current.focus();
            } else if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
                previouslyFocused.focus();
            }
        };
    }, [onClose, focusTrap, triggerRef]);

    return (
        <div
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={onClose}
        >
            <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="lab-guide-modal-title"
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto flex flex-col"
            >
                <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
                    <h2 id="lab-guide-modal-title" className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <IconBook className="text-blue-700" /> {title}
                    </h2>
                    <button
                        ref={closeButtonRef}
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-red-500"
                    >
                        <IconX />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};
