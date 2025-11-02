import { Text } from "react-native";

function ProductItem({ product }) {
  return (
    <Text style={{ fontSize: 30, fontWeight: "bold" }}>{product.name}</Text>
  );
}

export default ProductItem;
``;
