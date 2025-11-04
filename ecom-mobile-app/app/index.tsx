import { View, FlatList, useWindowDimensions } from "react-native";
import products from "../assets/products.json";
import ProductItem from "../components/ProductItem";

export default function HomeScreen() {
  const { width } = useWindowDimensions();

  return (
    <View className="flex-1">
      <FlatList
        data={products}
        numColumns={width > 700 ? 3 : 2}
        className=""
        contentContainerClassName="gap-2 max-w-[960px] w-full mx-auto" // added spacing between rows and limited spread
        columnWrapperClassName="gap-2" // added spacing between columns
        renderItem={({ item }) => <ProductItem product={item} />}
      />
    </View>
  );
}
