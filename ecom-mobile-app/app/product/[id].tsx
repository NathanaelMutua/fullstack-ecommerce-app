import { Text } from "@/components/ui/text";
import { useLocalSearchParams } from "expo-router";
import { Card } from "@/components/ui/card";
import { Image } from "@/components/ui/image";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { ActivityIndicator, ScrollView } from "react-native";
import { Stack } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/api/products";

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams();

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", id],
    queryFn: () => getProductById(Number(id)),
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Product Not Found</Text>;
  }

  return (
    <Box className="flex-1 items-center p-3">
      <Stack.Screen options={{ title: product?.name ?? "Product" }} />
      <ScrollView
        className="flex-1 w-full"
        contentContainerClassName="max-w-[960px] w-full mx-auto"
      >
        <Card className="p-5 rounded-lg w-full">
          <Image
            source={{
              uri: (product as any)?.image,
            }}
            className="mb-6 h-[240px] w-full rounded-md aspect-[4/3]"
            alt={`${(product as any)?.name} image`}
            resizeMode="contain"
          />
          <Text className="text-sm font-normal mb-2 text-typography-700">
            {product?.name}
          </Text>
          <VStack className="mb-6">
            <Heading size="md" className="mb-4">
              Ksh. {(product as any)?.price}
            </Heading>
            <Text size="sm">{(product as any)?.description}</Text>
          </VStack>
          <Box className="flex-col sm:flex-row">
            <Button className="px-4 py-2 mr-0 mb-3 sm:mr-3 sm:mb-0 sm:flex-1">
              <ButtonText size="sm">Add to cart</ButtonText>
            </Button>
            <Button
              variant="outline"
              className="px-4 py-2 border-outline-300 sm:flex-1"
            >
              <ButtonText size="sm" className="text-typography-600">
                Wishlist
              </ButtonText>
            </Button>
          </Box>
        </Card>
      </ScrollView>
    </Box>
  );
}
