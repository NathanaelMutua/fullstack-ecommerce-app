import { FlatList, useWindowDimensions } from "react-native";
import products from "../assets/products.json";
import ProductItem from "../components/ProductItem";
import { useBreakpointValue } from "@gluestack-ui/utils/hooks";

export default function HomeScreen() {
  const numColumns = useBreakpointValue({
    default: 2,
    sm: 3,
    xl: 4,
  });

  return (
    <FlatList
      key={String(numColumns)}
      data={products}
      numColumns={numColumns as number}
      contentContainerClassName="gap-2 max-w-[960px] w-full mx-auto" // added spacing between rows and limited spread
      columnWrapperClassName="gap-2" // added spacing between columns
      renderItem={({ item }) => <ProductItem product={item} />}
    />
  );
}
