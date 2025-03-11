import { Picker } from '@react-native-picker/picker';

const OrderPicker = ({ orderBy, setOrderBy, setOrderDirection }) => {
  const handleValueChange = (value) => {
    if (value === 'RATING_AVERAGE_DESC') {
      setOrderBy('RATING_AVERAGE');
      setOrderDirection('DESC');
    } else if (value === 'RATING_AVERAGE_ASC') {
      setOrderBy('RATING_AVERAGE');
      setOrderDirection('ASC');
    } else {
      setOrderBy('CREATED_AT');
      setOrderDirection('DESC');
    }
  };

  return (
    <Picker selectedValue={orderBy} onValueChange={handleValueChange}>
      <Picker.Item label="Últimos repositorios" value="CREATED_AT" />
      <Picker.Item label="Repositorios mejor calificados" value="RATING_AVERAGE_DESC" />
      <Picker.Item label="Repositorios de menor calificación" value="RATING_AVERAGE_ASC" />
    </Picker>
  );
};

export default OrderPicker;
