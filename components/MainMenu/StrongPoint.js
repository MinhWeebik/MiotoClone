import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
} from "react-native";

const DATA = [
  {
    id: 1,
    image: require("../Images/StrongPoint/1.png"),
    title: "An tâm đặt xe",
    description:
      "Không tính phí hủy chuyến trong vòng 1h sau đặt cọc. Hoàn cọc và bồi thường 100% nếu chủ xe hủy chuyến trong vòng 7 ngày trước chuyến đi",
  },
  {
    id: 2,
    image: require("../Images/StrongPoint/2.png"),
    title: "Thủ tục đơn giản",
    description:
      "Chỉ cần có CCCD gắn chip (hoặc Passport) & Giấy phép lái xe là bạn đã đủ điều kiện thuê xe trên Mioto",
  },
  {
    id: 3,
    image: require("../Images/StrongPoint/3.png"),
    title: "Lái xe an toàn",
    description:
      "Vững tay lái với gói bảo hiểm thuê xe tư nhà bảo hiểm MIC & VNI ...",
  },
  {
    id: 4,
    image: require("../Images/StrongPoint/6.png"),
    title: "Giao xe tận nơi",
    description:
      "Bạn có thể lựa chọn giao xe tận nhà/ sân bay ... phí tiết kiệm chỉ từ 15k/km",
  },
  {
    id: 5,
    image: require("../Images/StrongPoint/5.png"),
    title: "Thanh toán dễ dàng",
    description:
      "Đa dạng hình thức thanh toán ATM, thẻ Visa & Ví điện tử (MoMo, VNPay, ZaloPay)",
  },
  {
    id: 6,
    image: require("../Images/StrongPoint/4.png"),
    title: "Đa dạng dòng xe",
    description:
      "Hơn 100 dòng xe cho bạn tùy ý lựa chọn: Mini, Sedan, CUV, SUV, MPV, Bán tải ...",
  },
];

const isFirstItem = (index) => {
  if (index === 0) {
    return 20;
  }
  return 0;
};

const isLastItem = (index) => {
  if (index === DATA.length - 1) {
    return 20;
  }
  return 10;
};

const Item = ({ image, title, description, index }) => {
  return (
    <View
      style={[
        styles.itemContainer,
        { marginLeft: isFirstItem(index), marginRight: isLastItem(index) },
      ]}
    >
      <Image source={image} style={styles.itemImage} />
      <View style={styles.textContainer}>
        <Text style={styles.itemTitle}>{title}</Text>
        <Text style={styles.itemDesc}>{description}</Text>
      </View>
    </View>
  );
};

const StrongPoint = () => {
  return (
    <View style={styles.strongPointContainer}>
      <Text style={styles.title}>Ưu điểm của Mioto</Text>
      <FlatList
        data={DATA}
        renderItem={({ item, index }) => (
          <Item
            image={item.image}
            title={item.title}
            description={item.description}
            index={index}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        snapToAlignment="center"
        pagingEnabled
        decelerationRate={40}
      />
    </View>
  );
};

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  strongPointContainer: {
    marginTop: 25,
  },

  title: {
    fontSize: 19,
    fontWeight: "500",
    marginBottom: 10,
    marginLeft: 20,
  },

  itemContainer: {
    backgroundColor: "rgba(223,245,232,255)",
    flexDirection: "row",
    width: (screenWidth * 3) / 4,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 13,
    paddingBottom: 13,
    borderRadius: 10,
  },

  itemImage: {
    width: 65,
    height: 55,
  },

  textContainer: {
    width: (screenWidth * 3) / 4 - 100,
    marginLeft: 16,
  },

  itemTitle: {
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 7,
  },

  itemDesc: {
    fontSize: 10,
  },
});

export default StrongPoint;
