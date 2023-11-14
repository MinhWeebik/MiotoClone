import React from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;

const DATA = [
  {
    id: "1",
    header: "🚗 Đưa đi đón về, thảnh thơi di chuyển",
    body: "🎊 Thuê xe có tài 2 chiều (gói 2h) vi vu nội thành giá chỉ từ 400K",
    date: 2,
  },
  {
    id: "2",
    header: "🚙 Thuê xe 7 chỗ rộng rãi, gia đình di chuyển thoải mái",
    body: "⚡ Giảm 300k cho lần đầu thuê xe 7 chỗ tại Mioto",
    date: 4,
  },
  {
    id: "3",
    header: "Mioto tặng bạn mới - Giảm 220k cho lần đầu thuê xe",
    body: "🎁 Trải nghiệm dòng xe mini - giảm ngay 220k khi lần đầu thuê xe tại Mioto",
    date: 5,
  },
  {
    id: "4",
    header: "💐 Mừng ngay phụ nữ Việt Nam 20/10",
    body: "🎊 Mioto chúc một nửa của thế giới hạnh phúc, tỏa sáng trên hành trình của mình!",
    date: 10,
  },
  {
    id: "5",
    header: "🚙 Thuê xe 7 chỗ rộng rãi, gia đình di chuyển thoải mái",
    body: "⚡ Giảm 300k cho lần đầu thuê xe 7 chỗ tại Mioto",
    date: 11,
  },
  {
    id: "6",
    header: "💐 Ngày của Nàng, đặt Mioto đón đưa",
    body: "🎁 Thuê xe có tài 2 chiều (gói 8h) liên tỉnh, chi phí từ 1100k",
    date: 12,
  },
  {
    id: "7",
    header: "Cuối tuần thảnh thơi, đặt Mioto rong chơi",
    body: "🚗 Đặt sớm hôm nay để giữ chỗ chiếc xe bạn yêu thích, cho hành trình của gia đình bạn thêm trọn vẹn!",
    date: 13,
  },
  {
    id: "8",
    header: "🚙 Di chuyển tiện lợi cùng Hyundai Accent",
    body: "🎁 Trải nghiệm Hyundai Accent cùng mã ACCENT - Ưu đãi 15% tại Mioto",
    date: 14,
  },
  {
    id: "9",
    header: "Cuối tuần thảnh thơi, đặt xe 4 chỗ đưa nàng rong chơi 🚙",
    body: "Thuê xe có tài 2 chiều (gói 6h) liên tỉnh, chi phí chỉ từ 750k 🎁",
    date: 15,
  },
];

const Notification = () => {
  const Item = ({ header, body, date }) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.logoContainer}>
          <AntDesign name="notification" size={16} color="white" />
        </View>
        <View style={styles.itemInfoContainer}>
          <Text style={styles.itemHeader}>{header}</Text>
          <Text style={styles.itemInfo}>{body}</Text>
          <Text style={styles.itemDate}>{`${date} ngày trước`}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Thông báo</Text>
        </View>
        <FlatList
          data={DATA}
          renderItem={({ item }) => (
            <Item header={item.header} body={item.body} date={item.date} />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "white",
    paddingBottom: 120,
  },
  headerContainer: {
    marginTop: 10,
    paddingBottom: 12,
    borderBottomWidth: 0.6,
    borderBottomColor: "lightgrey",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  header: {
    fontSize: 21,
    textAlign: "center",
  },

  itemContainer: {
    flexDirection: "row",
    marginLeft: 15,
    marginRight: 15,
    paddingBottom: 8,
    borderBottomWidth: 0.6,
    borderBottomColor: "lightgrey",
    marginTop: 15,
  },

  logoContainer: {
    backgroundColor: "rgba(92,179,255,255)",
    height: 33,
    width: 33,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },

  itemInfoContainer: {
    marginLeft: 10,
    flexGrow: 1,
    flex: 1,
  },

  itemHeader: {
    fontWeight: "500",
    fontSize: 14.5,
    width: windowWidth - 110,
  },

  itemInfo: {
    fontSize: 12.5,
    color: "grey",
    marginTop: 4,
  },

  itemDate: {
    marginTop: 7,
    fontSize: 10.5,
  },
});

export default Notification;
