import { View, Text, FlatList } from "react-native";
import products from "../assets/products.json";
import ProductItem from "../components/ProductItem";
import { Button, ButtonText } from "@/components/ui/button";

export default function HomeScreen() {
  return (
    <Button>
      <ButtonText>Click me</ButtonText>
    </Button>
  );
  // return (
  //   <View>
  //     <FlatList
  //       data={products}
  //       renderItem={({ item }) => <ProductItem product={item} />}
  //     />
  //   </View>
  // );
}
