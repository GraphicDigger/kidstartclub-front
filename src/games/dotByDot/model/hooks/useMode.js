import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GAME_MODES, SPECIFICATION_MODES } from '../../const';
import { 
    setSpecificationMode, 
    setGameMode, 
    selectSpecificationMode, 
    selectGameMode,
    isSpecificationMode,
    toggleSpecificationMode,
} from '../store';


export const useGameMode = () => {
    const dispatch = useDispatch();

    const gameMode = useSelector(selectGameMode);

    const setSingleMode = useCallback(() => {
        dispatch(setGameMode(GAME_MODES.SINGLE));
    }, [dispatch]);

    const setMultiMode = useCallback(() => {
        dispatch(setGameMode(GAME_MODES.MULTI));
    }, [dispatch]);

    return {
        gameMode,
        setSingleMode,
        setMultiMode,
    };
}; 

export const useSpecificationMode = () => {
    const dispatch = useDispatch();

    const specificationMode = useSelector(selectSpecificationMode)
    const isActiveSpecificationMode = useSelector(isSpecificationMode)

    const handleSetInstructionMode = useCallback(() => {
        dispatch(setSpecificationMode(SPECIFICATION_MODES.INSTRUCTION));
    }, [dispatch]);

    const handleSetSettingsMode = useCallback(() => {
        dispatch(setSpecificationMode(SPECIFICATION_MODES.SETTINGS));
    }, [dispatch]);

    const handleSetAboutMode = useCallback(() => {
        dispatch(setSpecificationMode(SPECIFICATION_MODES.ABOUT));
    }, [dispatch]);

    const handleResetSpecificationMode = useCallback(() => {
        dispatch(setSpecificationMode(null));
    }, [dispatch])
    
    const handleToggleSpecificationMode = useCallback(() => {
        dispatch(toggleSpecificationMode());
    }, [dispatch]);

    return {
        isSpecificationMode: isActiveSpecificationMode,
        specificationMode,
        setInstructionMode: handleSetInstructionMode,
        setSettingsMode: handleSetSettingsMode,
        setAboutMode: handleSetAboutMode,
        resetSpecificationMode: handleResetSpecificationMode,
        toggleSpecificationMode: handleToggleSpecificationMode,
    };
};