import { StyleSheet } from "react-native";
export const WelcomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0275d8",
  },
  containerLogo: {
    flex: 2,
    backgroundColor: "#0275d8",
    justifyContent: "center",
    alignItems: "center",
  },
  containerForm: {
    flex: 1,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: "5%",
    paddingEnd: "5%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 28,
    marginBottom: 12,
  },
  text: {
    color: "#a1a1a1",
  },
  button: {
    position: "absolute",
    backgroundColor: "#0275d8",
    borderRadius: 10,
    paddingVertical: 13,
    width: "60%",
    alignSelf: "center",
    bottom: "18%",
    alignItems: "center",
    justifyContent: "center",
  },
  button2: {
    position: "absolute",
    backgroundColor: "#0275d8",
    borderRadius: 10,
    paddingVertical: 13,
    width: "60%",
    alignSelf: "center",
    bottom: "42%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
  },
});
