import React, { createContext, FC, PropsWithChildren, useCallback, useContext, useRef, useState } from "react";

import bottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import BottomSheet from "@gorhom/bottom-sheet";
import { TouchableWithoutFeedback, View } from "react-native";
import { colors } from "@/shared/colors";
interface BottomSheetContextType {
    open: (content: React.ReactNode, index: number) => void;
    close: () => void;
}


export const BottomSheetContext = createContext<BottomSheetContextType>({} as BottomSheetContextType);

export const BottomSheetProvider: FC<PropsWithChildren> = ({
    children
}) => {
    const [content, setContent] = useState<React.ReactNode | null>(null);
    const [index, setIndex] = useState(-1);
    const [isOpned, setIsOpened] = useState(false);
    const bottomSheetRef = useRef<bottomSheet>(null);
    const snpPoints = ["70%", "90%"]

    const open = useCallback((content: React.ReactNode, index: number) => {
        setIndex(index);
        setIsOpened(true);
        setContent(content);
        requestAnimationFrame(() => bottomSheetRef.current?.snapToIndex(index));
    }, []);

    const close = useCallback(() => {
        setIndex(-1);
        setIsOpened(false);
        setContent(null);
        bottomSheetRef.current?.close();
    }, [])
    const handleSheetChanges = useCallback((index: number) => {
        if(index === -1) setIsOpened(false);
    },[])
    return (
        <BottomSheetContext.Provider value={{ open, close }}>
            {children}
            {
                isOpned && (
                    <TouchableWithoutFeedback onPress={close}>
                        <View className="absolute inset-0 bg-black/70 z-1" >

                        </View>
                    </TouchableWithoutFeedback>
                )
            }
            <BottomSheet
                ref={bottomSheetRef}
                snapPoints={snpPoints}
                style={{ zIndex: 2 }}
                index={index}
                enablePanDownToClose
                onChange={handleSheetChanges}
                backgroundStyle={{
                    backgroundColor: colors["background-secondary"],
                    borderTopLeftRadius: 32,
                    borderTopRightRadius: 32,
                    elevation: 9
                }}
            >
                <BottomSheetScrollView>
                    {content}
                </BottomSheetScrollView>
            </BottomSheet>
        </BottomSheetContext.Provider>
    )
}


export const useBottomSheetContext = () => {
    return useContext(BottomSheetContext);
}