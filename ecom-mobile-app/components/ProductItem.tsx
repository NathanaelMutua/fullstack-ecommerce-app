import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { Heading } from "@/components/ui/heading";
import { Link, useRouter } from "expo-router";
import { Pressable } from "react-native";

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
}

function ProductItem({ product }: { product: Product }) {
  const router = useRouter();

  return (
    <Link href={`/product/${product.id}`} asChild>
      <Pressable className="flex-1">
        <Card className="p-5 rounded-lg mx-auto flex-1">
          <Image
            source={{
              uri: product.image,
            }}
            className="mb-6 h-[240px] w-full rounded-md aspect-[4/3]"
            alt={`${product.name} image`}
            resizeMode="contain"
          />
          <Text className="text-sm font-normal mb-2 text-typography-700">
            {product.name}
          </Text>
          <Heading size="md" className="mb-4">
            Ksh. {product.price}
          </Heading>
        </Card>
      </Pressable>
    </Link>
  );
}

export default ProductItem;
