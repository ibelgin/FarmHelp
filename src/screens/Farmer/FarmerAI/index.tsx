import Container from 'components/Container';
import TitleTextButton from 'components/TitleTextButton';
import React, {memo} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';

const FarmerAI = memo(() => {
  const ordersData = generateRandomData();

  const ordersPerMonth = ordersData.map(order => order.orders);
  const months = ordersData.map(order => order.month);

  return (
    <Container style={styles.container}>
      <TitleTextButton
        title={'Prediction for Next 5  Months'}
        onPress={() => console.log('')}
      />
      <LineChart
        data={{
          labels: months,
          datasets: [
            {
              data: ordersPerMonth,
            },
          ],
        }}
        width={Dimensions.get('window').width - 20}
        height={220}
        yAxisSuffix=" order"
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: (opacity = 1) => `#59C08C`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },

          propsForDots: {
            r: '1',
            strokeWidth: '1',
          },
        }}
        bezier
        style={styles.chartgraph}
      />
    </Container>
  );
});
const generateRandomData = () => {
  const currentDate = new Date();
  const data = [];

  for (let i = 0; i < 5; i++) {
    const month = currentDate.getMonth() + i;
    const year = currentDate.getFullYear();

    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const monthAbbreviation = monthNames[month % 12];

    const numberOfOrders = Math.floor(Math.random() * 151) + 50;

    data.push({
      month: monthAbbreviation,
      orders: numberOfOrders,
    });
  }

  return data;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  chartgraph: {
    marginVertical: 8,
    borderRadius: 16,
    marginLeft: 20,
  },
});

export default FarmerAI;
