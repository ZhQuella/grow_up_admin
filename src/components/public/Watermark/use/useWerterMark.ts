import { ref, onMounted, computed, watch } from "vue";
import { useThemeStore } from "store/modules/theme";

export const useWerterMark = () => {
  const werterMarkRef = ref();
  const themeStore = useThemeStore();
  const mackValue = computed(() => {
    return "人力资源二部 李二狗";
  });

  const themeType = computed(() => {
    return themeStore.getTheme;
  });

  const initWerterImage = (): string => {
    const oCanvasDom = document.createElement("canvas");
    oCanvasDom.width = 150;
    oCanvasDom.height = 150;
    const context = oCanvasDom.getContext("2d");
    context.rotate((-15 * Math.PI) / 180);
    const colorRgba =
      themeType.value === "dark" ? "0, 0, 0, 0.3" : "200, 200, 200, 0.2";
    context.fillStyle = `rgba(${colorRgba})`;
    context.textAlign = "left";
    context.font = "14px Verdana";
    context.fillText(mackValue.value, 75, 75);
    context.fillText(mackValue.value, -70, 36);

    context.fillText(mackValue.value, -55, 120);
    context.fillText(mackValue.value, 89, 160);
    const base64 = oCanvasDom.toDataURL("image/png");
    return base64;
  };

  const drawWerter = () => {
    const imageUrl = initWerterImage();
    werterMarkRef.value.style = `background-image: url(${imageUrl});`;
  };

  watch(() => mackValue.value, drawWerter);
  watch(() => themeType.value, drawWerter);

  onMounted(() => {
    drawWerter();
  });

  return {
    werterMarkRef,
  };
};
