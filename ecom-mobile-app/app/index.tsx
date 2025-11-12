import { ActivityIndicator, FlatList } from "react-native";
import ProductItem from "../components/ProductItem";
import { useBreakpointValue } from "@gluestack-ui/utils/hooks";
import { listProducts } from "@/api/products";
import { useQuery } from "@tanstack/react-query";
import { Text } from "@/components/ui/text";

export default function HomeScreen() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: listProducts,
  });

  const numColumns = useBreakpointValue({
    default: 2,
    sm: 3,
    xl: 4,
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error occured in fetching products</Text>;
  }

  return (
    <FlatList
      key={String(numColumns)}
      data={Array.isArray(data) ? data : []}
      numColumns={numColumns as number}
      contentContainerStyle={{
        gap: 8,
        maxWidth: 960,
        width: "100%",
        marginHorizontal: "auto",
      }} // JS styles, gap: 8px
      columnWrapperStyle={{ gap: 8 }} // JS styles, gap: 8px
      renderItem={({ item }) => <ProductItem product={item} />}
    />
  );
}
