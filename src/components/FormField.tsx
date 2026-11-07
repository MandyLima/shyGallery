import { StyleSheet, Text, TextInput, type KeyboardTypeOptions } from 'react-native';

type FormFieldProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  multiline?: boolean;
  keyboardType?: KeyboardTypeOptions;
};

// Campo reutilizável: recebe o estado e a função de atualização da tela de cadastro.
export function FormField({
  label,
  value,
  onChangeText,
  placeholder,
  multiline = false,
  keyboardType = 'default',
}: FormFieldProps) {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9B9188"
        multiline={multiline}
        keyboardType={keyboardType}
        textAlignVertical={multiline ? 'top' : 'center'}
        style={[styles.input, multiline && styles.multiline]}
      />
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    color: '#4B4038',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    minHeight: 50,
    borderWidth: 1,
    borderColor: '#E4DCD3',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    color: '#342D28',
    paddingHorizontal: 14,
    fontSize: 15,
  },
  multiline: {
    minHeight: 110,
    paddingTop: 13,
    paddingBottom: 13,
  },
});
