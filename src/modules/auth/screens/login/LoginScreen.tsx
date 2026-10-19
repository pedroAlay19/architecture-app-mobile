import { useState } from 'react';
import { ActivityIndicator, Button, Text, TextInput, View } from 'react-native';
import { useLogin } from '../../hooks/useLogin';

export function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { mutate, isPending, error } = useLogin();

  const handleLogin = () => mutate({ email, password });

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 24, gap: 12 }}>
      <Text style={{ fontSize: 24, fontWeight: '600' }}>Iniciar sesión</Text>

      <TextInput
        placeholder="Correo"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12 }}
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12 }}
      />

      {error && <Text style={{ color: 'red' }}>{error.message}</Text>}

      {isPending ? (
        <ActivityIndicator />
      ) : (
        <Button title="Entrar" onPress={handleLogin} />
      )}
    </View>
  );
}