import { View, Text, FlatList } from "react-native";
import products from "../assets/products.json";
import ProductItem from "../components/ProductItem";

export default function HomeScreen() {
  return (
    <View>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductItem product={item} />}
      />
    </View>
  );
}
