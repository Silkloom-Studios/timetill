import { Colors, Fonts } from "@/constants/theme";
import { addOpacity } from "@/utils/colors";
import { StyleSheet, View } from "react-native";

export default function ModalBase({ children }: { children: React.ReactNode }) {
  return (
    <View style={modalStyles.centeredView}>
      <View style={modalStyles.modalContainer}>
        <View style={modalStyles.modalView}>{children}</View>
      </View>
    </View>
  );
}

export const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
  },
  modalContainer: {
    backgroundColor: Colors.background,
    borderRadius: 4,
    overflow: "hidden",
    width: "100%",
    maxWidth: 256,
  },
  modalView: {
    width: "100%",
    backgroundColor: addOpacity(Colors.foreground, 20),
    paddingHorizontal: 32,
    paddingBottom: 32,
    paddingTop: 40,
    alignItems: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontFamily: Fonts.custom.headings,
    color: Colors.text,
  },
  modalBtnContainer: {
    width: "100%",
    paddingTop: 24,
  },
  modalBtnTop: {
    marginBottom: 12,
  },
});
