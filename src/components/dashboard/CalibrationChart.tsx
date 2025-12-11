import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { rating: '1 - Insatisfaisant', count: 3, target: 5, color: 'hsl(var(--destructive))' },
  { rating: '2 - À améliorer', count: 12, target: 15, color: 'hsl(var(--warning))' },
  { rating: '3 - Satisfaisant', count: 85, target: 70, color: 'hsl(var(--info))' },
  { rating: '4 - Très bien', count: 42, target: 45, color: 'hsl(var(--success))' },
  { rating: '5 - Exceptionnel', count: 14, target: 10, color: 'hsl(var(--primary))' },
];

export function CalibrationChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="hsl(var(--border))" />
          <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <YAxis 
            dataKey="rating" 
            type="category" 
            width={120} 
            stroke="hsl(var(--muted-foreground))" 
            fontSize={11}
            tickLine={false}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--card))', 
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              fontSize: '12px'
            }}
            formatter={(value: number, name: string) => [value, name === 'count' ? 'Actuel' : 'Cible']}
          />
          <Bar dataKey="count" radius={[0, 4, 4, 0]} name="Actuel">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
          <Bar dataKey="target" fill="hsl(var(--muted))" radius={[0, 4, 4, 0]} name="Cible" opacity={0.5} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
