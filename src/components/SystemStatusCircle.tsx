import { View, Text, Animated, Easing } from 'react-native';
import { useEffect, useRef } from 'react';
import { cn } from '@/utils/cn';

interface SystemStatusCircleProps {
  isSystemSafe: boolean;
}

export default function SystemStatusCircle({ isSystemSafe }: SystemStatusCircleProps) {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 10000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View className="relative w-[250px] h-[250px] self-center my-6">
      <Animated.View
        className={cn(
          "absolute w-full h-full rounded-full opacity-20",
          isSystemSafe ? "bg-green-500" : "bg-red-500"
        )}
        style={{
          transform: [{ rotate: spin }],
          borderWidth: 4,
          borderColor: isSystemSafe ? '#10B981' : '#EF4444',
        }}
      />
      <View className="absolute w-[230px] h-[230px] rounded-full bg-[#1E293B] top-[10px] left-[10px] items-center justify-center">
        <Text className={cn(
          "text-2xl font-bold",
          isSystemSafe ? "text-green-400" : "text-red-400"
        )}>
          {isSystemSafe ? 'SAFE' : 'ALERT'}
        </Text>
      </View>
    </View>
  );
}
