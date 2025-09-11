import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useCallback, useContext, useState, useMemo, useEffect, } from 'react';
import { uiTelemetryService, sessionId } from '@google/gemini-cli-core';
// --- Context Definition ---
const SessionStatsContext = createContext(undefined);
// --- Provider Component ---
export const SessionStatsProvider = ({ children, }) => {
    const [stats, setStats] = useState({
        sessionId,
        sessionStartTime: new Date(),
        metrics: uiTelemetryService.getMetrics(),
        lastPromptTokenCount: 0,
        promptCount: 0,
    });
    useEffect(() => {
        const handleUpdate = ({ metrics, lastPromptTokenCount, }) => {
            setStats((prevState) => ({
                ...prevState,
                metrics,
                lastPromptTokenCount,
            }));
        };
        uiTelemetryService.on('update', handleUpdate);
        // Set initial state
        handleUpdate({
            metrics: uiTelemetryService.getMetrics(),
            lastPromptTokenCount: uiTelemetryService.getLastPromptTokenCount(),
        });
        return () => {
            uiTelemetryService.off('update', handleUpdate);
        };
    }, []);
    const startNewPrompt = useCallback(() => {
        setStats((prevState) => ({
            ...prevState,
            promptCount: prevState.promptCount + 1,
        }));
    }, []);
    const getPromptCount = useCallback(() => stats.promptCount, [stats.promptCount]);
    const value = useMemo(() => ({
        stats,
        startNewPrompt,
        getPromptCount,
    }), [stats, startNewPrompt, getPromptCount]);
    return (_jsx(SessionStatsContext.Provider, { value: value, children: children }));
};
// --- Consumer Hook ---
export const useSessionStats = () => {
    const context = useContext(SessionStatsContext);
    if (context === undefined) {
        throw new Error('useSessionStats must be used within a SessionStatsProvider');
    }
    return context;
};
//# sourceMappingURL=SessionContext.js.map