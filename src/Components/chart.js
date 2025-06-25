import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";




function Chart(props){
	const {data} = props

	return (
		<ResponsiveContainer width="100%" height={300}>
			<LineChart
				data={data}
				margin={{ top: 5, right: 1, left: 20, bottom: 5 }}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name"
					tickFormatter={(str) => {
						const date = new Date(str);
						return date.toLocaleDateString("en-US", { month: "short", day: "numeric", hour: 'numeric' });
					} }
					interval="preserveStartEnd" />
				<YAxis domain={[975, 1025]} />
				<Tooltip />
				<Line type="monotone" dataKey="pressure" stroke="#ff6347" strokeWidth={2} dot={false} />
			</LineChart>
		</ResponsiveContainer>
	)

	
}

export default Chart

