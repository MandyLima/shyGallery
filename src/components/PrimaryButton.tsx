import { Pressable, StyleSheet, Text } from 'react-native';

type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
  outline?: boolean;
  disabled?: boolean;
};

// Botão reutilizável para manter o mesmo padrão visual nas diferentes telas.
export function PrimaryButton({ title, onPress, outline = false, disabled = false }: PrimaryButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        outline ? styles.outline : styles.filled,
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      <Text style={[styles.label, outline && styles.outlineLabel]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 50,
    paddingHorizontal: 20,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filled: { backgroundColor: '#6D5748' },
  outline: { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#6D5748' },
  label: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
  outlineLabel: { color: '#6D5748' },
  pressed: { opacity: 0.78, transform: [{ scale: 0.99 }] },
  disabled: { opacity: 0.45 },
});
