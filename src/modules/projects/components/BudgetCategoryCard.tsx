import { formatMoney } from '@/lib/format';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

interface CardItem {
  code: string | null;
  description: string;
  unit: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface CardCategory {
  name: string;
  subtotal: number;
  items: CardItem[];
}

export function BudgetCategoryCard({ category }: { category: CardCategory }) {
  const [open, setOpen] = useState(false);

  return (
    <View style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 8, overflow: 'hidden' }}>
      <Pressable
        onPress={() => setOpen((v) => !v)}
        style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 12, backgroundColor: '#f8fafc' }}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: '600' }}>{category.name}</Text>
          <Text style={{ color: '#64748b', fontSize: 12 }}>{category.items.length} rubros</Text>
        </View>
        <Text style={{ fontWeight: '600' }}>
          {formatMoney(category.subtotal)} {open ? '▲' : '▼'}
        </Text>
      </Pressable>

      {open &&
        category.items.map((item, index) => (
          <View key={index} style={{ padding: 12, borderTopWidth: 1, borderTopColor: '#eee', gap: 2 }}>
            <Text>
              {item.code ? `${item.code} · ` : ''}
              {item.description}
            </Text>
            <Text style={{ color: '#64748b', fontSize: 12 }}>
              {item.quantity} {item.unit} × {formatMoney(item.unitPrice)}
            </Text>
            <Text style={{ fontWeight: '600', alignSelf: 'flex-end' }}>{formatMoney(item.total)}</Text>
          </View>
        ))}
    </View>
  );
}