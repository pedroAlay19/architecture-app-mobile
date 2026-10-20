import { Pressable, Text, View } from 'react-native';
import { ProjectStatus } from '../interfaces/project.interface';

const TABS: { label: string; value: ProjectStatus }[] = [
  { label: 'En progreso', value: 'in_progress' },
  { label: 'Finalizados', value: 'completed' },
];

interface Props {
  value: ProjectStatus;
  onChange: (status: ProjectStatus) => void;
}

export function StatusTabs({ value, onChange }: Props) {
  return (
    <View style={{ flexDirection: 'row', gap: 8, marginVertical: 12 }}>
      {TABS.map((tab) => {
        const active = tab.value === value;
        return (
          <Pressable
            key={tab.value}
            onPress={() => onChange(tab.value)}
            style={{
              paddingVertical: 8,
              paddingHorizontal: 14,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: active ? '#1e3a5f' : '#ddd',
              backgroundColor: active ? '#1e3a5f' : '#fff',
            }}
          >
            <Text style={{ color: active ? '#fff' : '#333' }}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}