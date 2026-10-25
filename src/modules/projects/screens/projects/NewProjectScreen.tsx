import { notifyLocal } from '@/lib/notifications';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, Button, ScrollView, Text, TextInput, View } from 'react-native';
import { useCreateProject } from '../../hooks/useCreateProject';
import { CreateProjectForm, createProjectSchema } from '../../schemas/create-project.schema';

const fields: {
  name: keyof CreateProjectForm;
  label: string;
  placeholder?: string;
  keyboardType?: 'default' | 'number-pad' | 'decimal-pad';
}[] = [
  { name: 'name', label: 'Nombre de obra' },
  { name: 'location', label: 'Ubicación' },
  { name: 'client', label: 'Contratante' },
  { name: 'startDate', label: 'Fecha de inicio', placeholder: 'AAAA-MM-DD (ej. 2027-01-15)' },
  { name: 'durationDays', label: 'Plazo en días', keyboardType: 'number-pad' },
  { name: 'totalBudget', label: 'Presupuesto total (USD)', keyboardType: 'decimal-pad' },
];

export function NewProjectScreen() {
  const router = useRouter();
  const { mutate, isPending, error } = useCreateProject();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProjectForm>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: '',
      location: '',
      client: '',
      startDate: '',
      durationDays: '',
      totalBudget: '',
    },
  });

  const onSubmit = (values: CreateProjectForm) => {
  mutate(values, {
    onSuccess: () => {
      notifyLocal('Proyecto creado', `"${values.name}" se registró correctamente.`);
      router.back();
    },
  });
};

  return (
    <ScrollView
      contentContainerStyle={{ padding: 16, paddingTop: 60, gap: 12 }}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={{ fontSize: 22, fontWeight: '600' }}>Nuevo proyecto</Text>

      {fields.map(({ name, label, placeholder, keyboardType }) => (
        <Controller
          key={name}
          control={control}
          name={name}
          render={({ field: { value, onChange, onBlur } }) => (
            <View style={{ gap: 4 }}>
              <Text>{label}</Text>
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                keyboardType={keyboardType}
                autoCapitalize={name === 'startDate' ? 'none' : 'sentences'}
                style={{
                  borderWidth: 1,
                  borderColor: errors[name] ? '#dc2626' : '#ccc',
                  borderRadius: 8,
                  padding: 12,
                }}
              />
              {errors[name] && (
                <Text style={{ color: '#dc2626', fontSize: 12 }}>{errors[name]?.message}</Text>
              )}
            </View>
          )}
        />
      ))}

      {error && <Text style={{ color: '#dc2626' }}>{error.message}</Text>}

      {isPending ? (
        <ActivityIndicator />
      ) : (
        <>
          <Button title="Crear proyecto" onPress={() => handleSubmit(onSubmit)} />
          <Button title="Cancelar" color="#64748b" onPress={() => router.back()} />
        </>
      )}
    </ScrollView>
  );
}