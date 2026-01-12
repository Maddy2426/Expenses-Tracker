import React, { useRef, useState, useEffect } from "react";
import {
  Animated,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  Keyboard,
  Easing,
} from "react-native";
import { Close, SearchIcon } from "@/src/assets";

type Props = {
  placeholder?: string;
  onChangeText?: (text: string) => void;
  onCancel?: () => void;
  value?: string;
};

const SearchBar: React.FC<Props> = ({
  placeholder = "Search",
  onChangeText,
  onCancel,
  value = "",
}) => {
  const [text, setText] = useState(value);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const animatedMargin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setText(value);
  }, [value]);

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(animatedMargin, {
      toValue: 0,
      duration: 550,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  const handleCancel = () => {
    Keyboard.dismiss();
    setIsFocused(false);
    setText("");
    onChangeText?.("");
    Animated.timing(animatedMargin, {
      toValue: 0,
      duration: 350,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
    onCancel?.();
  };

  const handleClear = () => {
    setText("");
    onChangeText?.("");
  };

  return (
    <View className="flex-row items-center">
      <Animated.View
        style={{
          marginRight: animatedMargin,
          height: 40, // explicit height for iOS consistency
          minHeight: 40,
        }}
        className="flex-1 flex-row items-center  rounded-md px-3 gap-4 border  bg-white border-[#90909080]"
      >
        <SearchIcon width={16} height={16} />
        <TextInput
          ref={inputRef}
          style={{
            flex: 1,
            fontSize: 16,
            paddingHorizontal: 8,
            paddingVertical: 8, // add vertical padding
            color: "#000",
            height: 40, // explicit height for TextInput
            includeFontPadding: false, // for Android text vertical alignment
          }}
          placeholder={placeholder}
          placeholderTextColor="#888"
          value={text}
          onFocus={handleFocus}
          onChangeText={(val) => {
            setText(val);
            onChangeText?.(val);
          }}
          returnKeyType="search"
          underlineColorAndroid="transparent"
        />
        {text.length > 0 && (
          <TouchableOpacity
            onPress={handleClear}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Close width={16} height={16} />
          </TouchableOpacity>
        )}
      </Animated.View>

      {isFocused && (
        <TouchableOpacity onPress={handleCancel} className="ml-2">
          <Text className="text-black text-base">Cancel</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;
