import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";
import {
  FlatList,
  LayoutChangeEvent,
  NativeSyntheticEvent,
  View,
  ViewToken,
  ImageStyle,
  TextStyle,
  ViewStyle,
  Pressable,
} from "react-native";
import { Animated, StyleSheet } from "react-native";
import { Text } from "react-native";

export type CarouselData = {
  key: string;
  title?: string;
  backgroundColor?: string;
  image?: any;
  description?: string;
  titleStyle?: TextStyle;
  descriptionStyle?: TextStyle;
  contentStyle?: ViewStyle;
  imageStyle?: ImageStyle;
  imagePosition?: "top" | "bottom" | "center";
  data?: any;
};

export type ButtonType = {
  label?: string;
  textStyle?: TextStyle;
  buttonStyle?: ViewStyle;
  disabled?: boolean;
  renderButton?: (
    currentIndex: number,
    goToSlide: (index: number) => void
  ) => JSX.Element;
};

export type PaginationType = {
  dotSize?: number;
  bottomOffset?: number;
  animated?: boolean;
  disabled?: boolean;
  dotIncreaseSize?: number;
  color?: string;
  dotSpacing?: number;
  activeColor?: string;
  activeDotStyle?: ViewStyle;
};

export type ButtonsConfigType = {
  next?: ButtonType;
  prev?: ButtonType;
  skip?: ButtonType;
  done?: ButtonType;
  disabled?: boolean;
  useBottomButtons?: boolean;
};

export type CarouselProps = {
  data: CarouselData[];
  paginationConfig?: PaginationType;
  renderItem?: (
    {
      item,
      index,
    }: {
      item: CarouselData;
      index: number;
    },
    goToSlide: (slide: number) => void
  ) => ReactNode;
  buttonsConfig?: ButtonsConfigType;
  onFinish?: () => void;
  onPressSkip?: () => void;
  setChanged?: (index: number) => void;
};

const viewabilityConfig = { viewAreaCoveragePercentThreshold: 40 };

const defaultDotSize = 15;
const defaultSpacing = 12;

const Slider = ({
  data,
  paginationConfig,
  renderItem,
  buttonsConfig,
  onFinish,
  onPressSkip,
  setChanged,
}: CarouselProps) => {
  const {
    dotSize = defaultDotSize,
    bottomOffset = 50,
    animated = true,
    disabled = false,
    dotIncreaseSize = 1.4,
    color = "#ffffff80",
    activeColor = "#fff",
    dotSpacing = defaultSpacing,
    activeDotStyle,
  } = paginationConfig || {};

  const [currentIndex, setCurrentItem] = useState(0);
  const [layoutSize, setLayoutSizes] = useState<{
    width?: number;
    height?: number;
  }>({});
  const flatlistRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scaleAnimation = useRef(new Animated.Value(0)).current;
  const [isNextToDot, setIsNextToDot] = useState(true);

  const disabledButtons = buttonsConfig?.disabled ?? false;
  const useBottomButtons = buttonsConfig?.useBottomButtons ?? false;

  const itemWidth = layoutSize?.width || 0;
  const maxPaginationSize = data.length * dotSize + data.length * dotSpacing;
  const maxSlidersSize = itemWidth * data.length;

  useEffect(() => {
    Animated.timing(scaleAnimation, {
      toValue: isNextToDot ? 1 : 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [isNextToDot]);

  const onViewableItemsChanged = useCallback(
    ({
      viewableItems,
    }: {
      viewableItems: Array<ViewToken>;
      changed: Array<ViewToken>;
    }) => {
      if (
        viewableItems?.[0]?.index &&
        viewableItems.length > 0 &&
        viewableItems?.[0]?.index >= 0
      ) {
        setCurrentItem(viewableItems[0].index);
      }
    },
    []
  );

  const viewabilityConfigCallbackPairs = useRef([
    { onViewableItemsChanged, viewabilityConfig },
  ]);

  const onChangeSlider = (page: number) => {
    if (!flatlistRef?.current || page < 0 || page >= data.length) {
      return;
    }
    flatlistRef.current.scrollToIndex({
      index: page,
    });
  };

  const handleOnLayout = ({ nativeEvent: { layout } }: LayoutChangeEvent) => {
    setLayoutSizes(layout);
  };

  const renderPagination = () => {
    return (
      <View
        style={[
          styles.bottomContent,
          {
            bottom: bottomOffset,
          },
        ]}
      >
        <View style={[styles.paginationContainer]}>
          {!disabledButtons && !useBottomButtons && (
            <ButtonsScreen
              buttonsConfig={buttonsConfig}
              currentIndex={currentIndex}
              maxPaginationSize={maxPaginationSize}
              dataLength={data.length}
              onChangeSlider={(s) => onChangeSlider(s)}
              onFinish={onFinish}
            />
          )}
          <View style={styles.pagination}>
            {animated && (
              <Animated.View
                style={{
                  ...styles.item,
                  backgroundColor: activeColor,
                  position: "absolute",
                  left: 0,
                  zIndex: 1,
                  width: dotSize,
                  height: dotSize,
                  ...activeDotStyle,
                  transform: [
                    {
                      translateX: scrollX.interpolate({
                        inputRange: [0, maxSlidersSize],
                        outputRange: [0, maxPaginationSize],
                        extrapolate: "clamp",
                      }),
                    },
                    {
                      scale: scaleAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, dotIncreaseSize],
                        extrapolate: "clamp",
                      }),
                    },
                  ],
                }}
              />
            )}
            {data.map((_, index) => {
              const isActive = !animated && index === currentIndex;
              return (
                <View
                  style={{
                    ...styles.item,
                    width: dotSize,
                    height: dotSize,
                    ...(isActive && activeDotStyle),
                    marginLeft: index === 0 ? 0 : dotSpacing,
                    backgroundColor: isActive ? activeColor : color,
                  }}
                  key={index}
                />
              );
            })}
          </View>
        </View>
        {useBottomButtons && (
          <BottomButtons
            onPressNext={() => onChangeSlider(currentIndex + 1)}
            onPressSkip={onPressSkip}
            buttonsConfig={buttonsConfig}
            onFinish={onFinish}
            currentIndex={currentIndex}
            dataLength={data.length}
          />
        )}
      </View>
    );
  };

  const handleEvent = ({ nativeEvent }: NativeSyntheticEvent<any>) => {
    const { x } = nativeEvent?.contentOffset || {};
    if (flatlistRef.current && x < 0) {
      flatlistRef.current.scrollToOffset({ offset: 0, animated: true });
    }

    const positionItem = x % itemWidth;
    const nextToDot = positionItem < 40 || positionItem > itemWidth - 40;
    if (nextToDot !== isNextToDot) {
      setChanged && setChanged(1);
      setIsNextToDot(nextToDot);
    }
  };

  return (
    <View
      style={[styles.container, { position: "relative" }]}
      onLayout={handleOnLayout}
    >
      <Animated.FlatList
        ref={flatlistRef}
        initialScrollIndex={0}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          {
            useNativeDriver: true,
            listener: handleEvent,
          }
        )}
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        initialNumToRender={data.length}
        decelerationRate="fast"
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        snapToAlignment="center"
        pagingEnabled
        renderItem={({ item, index }) =>
          renderItem ? (
            <View
              style={{
                ...styles.container,
                width: itemWidth,
              }}
            >
              {renderItem({ item, index }, onChangeSlider)}
            </View>
          ) : null
        }
        keyExtractor={(item) => item.key}
      />
      {!disabled && renderPagination()}
      {onPressSkip && !useBottomButtons && !buttonsConfig?.skip?.disabled && (
        <View style={styles.skipButton}>
          {!buttonsConfig?.skip?.renderButton ? (
            <Button
              title={buttonsConfig?.skip?.label || "Skip"}
              onPress={onPressSkip}
              textStyle={buttonsConfig?.skip?.textStyle}
              buttonStyle={buttonsConfig?.skip?.buttonStyle}
            />
          ) : (
            buttonsConfig?.skip?.renderButton(currentIndex, onChangeSlider)
          )}
        </View>
      )}
    </View>
  );
};

const Button = ({
  onPress,
  title,
  buttonStyle,
  textStyle,
  disabled,
}: {
  onPress: () => void;
  title: string;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}) => {
  if (disabled) {
    return null;
  }
  return (
    <Pressable onPress={() => onPress()} style={[styles.button, buttonStyle]}>
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </Pressable>
  );
};

const BottomButtons = ({
  onPressNext,
  onPressSkip,
  onFinish,
  buttonsConfig,
  currentIndex,
  dataLength,
}: {
  onPressNext: () => void;
  onPressSkip?: () => void;
  onFinish?: () => void;
  buttonsConfig?: ButtonsConfigType;
  currentIndex: number;
  dataLength: number;
}) => {
  if (buttonsConfig?.disabled) {
    return null;
  }
  const { next, skip, done } = buttonsConfig || {};

  const isLastData = dataLength === currentIndex + 1;
  const endButton = isLastData ? done : next;
  const endButtonLabel = isLastData ? "Done" : "Next";

  return (
    <View style={styles.buttonContainer}>
      <Pressable
        onPress={() => {
          if (isLastData) {
            if (onFinish) {
              onFinish();
            }
          } else {
            onPressNext();
          }
        }}
        style={[
          styles.button,
          {
            marginTop: 10,
            backgroundColor: "#00000050",
            marginBottom: !skip?.disabled ? 10 : 0,
          },
          next?.buttonStyle,
        ]}
      >
        <Text style={[styles.buttonText, next?.textStyle]}>
          {endButton?.label || endButtonLabel}
        </Text>
      </Pressable>
      {!skip?.disabled && onPressSkip && (
        <Pressable
          onPress={() => onPressSkip()}
          style={[styles.button, skip?.buttonStyle]}
        >
          <Text style={[styles.buttonText, skip?.textStyle]}>
            {skip?.label || "Skip"}
          </Text>
        </Pressable>
      )}
    </View>
  );
};

const ButtonsScreen = ({
  buttonsConfig,
  currentIndex,
  maxPaginationSize,
  dataLength,
  onChangeSlider,
  onFinish,
}: {
  buttonsConfig?: ButtonsConfigType;
  currentIndex: number;
  maxPaginationSize: number;
  dataLength: number;
  onChangeSlider: (page: number) => void;
  onFinish?: () => void;
}) => {
  const { next, prev, done } = buttonsConfig || {};

  const isLastData = dataLength === currentIndex + 1;
  const endButton = isLastData ? done : next;
  const endButtonLabel = isLastData ? "Done" : "Next";

  return (
    <>
      <View style={[styles.buttonContainerS]}>
        <View style={styles.buttonContentS}>
          {currentIndex !== 0 && (
            <>
              {!buttonsConfig?.prev?.renderButton ? (
                <Button
                  title={prev?.label || "Prev"}
                  onPress={() => onChangeSlider(currentIndex - 1)}
                  textStyle={prev?.textStyle}
                  buttonStyle={prev?.buttonStyle}
                  disabled={prev?.disabled}
                />
              ) : (
                buttonsConfig?.prev?.renderButton(currentIndex, onChangeSlider)
              )}
            </>
          )}
        </View>
        <View style={{ width: maxPaginationSize }} />
        <View style={styles.buttonContentS}>
          {!endButton?.renderButton ? (
            <Button
              title={endButton?.label || endButtonLabel}
              textStyle={endButton?.textStyle}
              buttonStyle={endButton?.buttonStyle}
              onPress={() => {
                if (isLastData) {
                  if (onFinish) {
                    onFinish();
                  }
                } else {
                  onChangeSlider(currentIndex + 1);
                }
              }}
            />
          ) : (
            endButton?.renderButton(currentIndex, onChangeSlider)
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    borderRadius: 50,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "auto",
  },
  paginationContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    minHeight: 40,
  },
  bottomContent: {
    position: "absolute",
    width: "100%",
  },
  skipButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 3,
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  buttonContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  buttonContainerS: {
    width: "100%",
    position: "absolute",
    zIndex: 2,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    top: 0,
    bottom: 0,
    right: 0,
  },
  buttonS: {
    padding: 10,
  },
  buttonContentS: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTextS: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Slider;
