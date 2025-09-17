import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const COLORS = ["#4A8CFF", "#0A66C2", "#00A4EF", "#5055B0"];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle = 0,
  innerRadius,
  outerRadius,
  percent = 0,
}: {
  cx: number;
  cy: number;
  midAngle?: number;
  innerRadius: number;
  outerRadius: number;
  percent?: number;
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      className="font-bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

interface IData {
  free: number;
  corporate: number;
  premium: number;
  enterprise: number;
}

interface ChartData {
  name: string;
  value: number;
}

export default function UserSubscriptionChart({
  data,
}: {
  data: IData | undefined;
}) {
  // Transform IData object into array format for recharts
  const chartData: ChartData[] = data
    ? [
        { name: "Free", value: data.free },
        { name: "Corporate", value: data.corporate },
        { name: "Premium", value: data.premium },
        { name: "Enterprise", value: data.enterprise },
      ].filter((item) => item.value > 0) // Filter out zero values to avoid empty segments
    : [];

  // Check if data is undefined or all values are zero
  const isAllZeroOrUndefined =
    !data ||
    (data.free === 0 &&
      data.corporate === 0 &&
      data.premium === 0 &&
      data.enterprise === 0);

  return (
    <ResponsiveContainer width="100%" height="100%">
      {isAllZeroOrUndefined ? (
        <div className="flex items-center justify-center h-full text-gray-500">
          <p>No subscription data available</p>
        </div>
      ) : (
        <PieChart width={400} height={400}>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${entry.name}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      )}
    </ResponsiveContainer>
  );
}
